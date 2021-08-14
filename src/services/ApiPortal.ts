import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import firebase from "firebase";

export const signInWithPopup = async () => {
  try {
    const token = localStorage.getItem(process.env.VUE_APP_PORTAL_CREDENTIAL);
    if (token) {
      return await firebase.auth().signInWithCustomToken(await login(token));
    }
  } catch (e) { }

  const token = await getAccessToken();
  localStorage.setItem(process.env.VUE_APP_PORTAL_CREDENTIAL, token);
  return await firebase.auth().signInWithCustomToken(await login(token));
}

export const linkWithPopup = async (uid: string) => {
  try {
    const token = localStorage.getItem(process.env.VUE_APP_PORTAL_CREDENTIAL);
    if (token) {
      return await link(token, uid);
    }
  } catch (e) { }

  const token = await getAccessToken();
  localStorage.setItem(process.env.VUE_APP_PORTAL_CREDENTIAL, token);
  return await link(token, uid);
}

export const unlinkWithPopup = async () => {
  try {
    const token = localStorage.getItem(process.env.VUE_APP_PORTAL_CREDENTIAL);
    if (token) {
      await unlink(token);
      return localStorage.removeItem(process.env.VUE_APP_PORTAL_CREDENTIAL);
    }
  } catch (e) { }
  const token = await getAccessToken();

  localStorage.removeItem(process.env.VUE_APP_PORTAL_CREDENTIAL);
  return await unlink(token);
}

function randomString(length: number = 128) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      characters.length));
  }
  return result;
}

/**
 * @see https://www.authlete.com/ja/developers/pkce/
 */
function createCodeChallenge(codeVerifier: string) {
  return Base64.stringify(sha256(codeVerifier))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}


async function getAccessToken() {
  const codeVerifier = randomString(128);
  const code = await getOauthCode(codeVerifier);
  return await getOauthToken(code, codeVerifier);
}

function getOauthCode(codeVerifier: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const state = randomString(40);
    const codeChallenge = createCodeChallenge(codeVerifier);
    const param = new URLSearchParams();
    param.append('client_id', process.env.VUE_APP_PORTAL_OAUTH_CLIENT_ID);
    param.append('redirect_uri', process.env.VUE_APP_PORTAL_OAUTH_REDIRECT_URL);
    param.append('response_type', 'code');
    param.append('scope', 'user-read user-write');
    param.append('state', state);
    param.append('code_challenge', codeChallenge);
    param.append('code_challenge_method', 'S256');
    const url = `${process.env.VUE_APP_PORTAL_URL}/oauth/authorize?${param.toString()}`;
    const win = window.open(url, "portal", "width=400,height=600,status=no");

    if (!win) {
      return reject('ポップアップ表示に失敗しました');
    }

    let timeout = 300; // 5min
    const timer = setInterval(async () => {
      if (win.closed) {
        clearInterval(timer);
        return reject();
      }
      if (timeout < 1) {
        clearInterval(timer);
        win.close();
        return reject('タイムアウトしました');
      }

      try {
        const current = win.location.origin + win.location.pathname;
        if (current === process.env.VUE_APP_PORTAL_OAUTH_REDIRECT_URL) {
          const param = new URLSearchParams(win.location.search);
          const code = param.get("code");
          const actualState = param.get("state");

          clearInterval(timer);
          win.close();
          if (state !== actualState || !code) {
            return reject('認証コードの発行に失敗しました');
          }
          return resolve(code);
        }
      } catch (e) {
      }
      timeout--;
    }, 1000);
  });
}
async function getOauthToken(code: string, codeVerifier: string) {
  const url = `${process.env.VUE_APP_PORTAL_URL}/oauth/token`;
  const json = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.VUE_APP_PORTAL_OAUTH_CLIENT_ID,
    redirect_uri: process.env.VUE_APP_PORTAL_OAUTH_REDIRECT_URL,
    code_verifier: codeVerifier,
    code,
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: json,
  });

  if (!res.ok) {
    throw new Error('認証トークンの発行に失敗しました');
  }
  const body: { access_token: string } = await res.json();
  return body.access_token;
}

async function login(token: string) {
  const url = `${process.env.VUE_APP_PORTAL_URL}/api/oauth/firebase/${process.env.VUE_APP_PORTAL_PROJECT_ID}/login`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const res: Response = await fetch(url, { method: 'POST', headers });
  if (!res.ok) {
    throw new Error('ユーザ情報の取得に失敗しました');
  }
  const body: { custom_token: string } = await res.json();
  return body.custom_token;
}

async function link(token: string, uid: string) {
  const url = `${process.env.VUE_APP_PORTAL_URL}/api/oauth/firebase/${process.env.VUE_APP_PORTAL_PROJECT_ID}/link`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    uid
  });
  const res = await fetch(url, { method: 'POST', headers, body });
  if (!res.ok) {
    throw new Error('ユーザの連携に失敗しました');
  }
}
async function unlink(token: string) {
  const url = `${process.env.VUE_APP_PORTAL_URL}/api/oauth/firebase/${process.env.VUE_APP_PORTAL_PROJECT_ID}/unlink`;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  const res = await fetch(url, { method: 'POST', headers });
  if (!res.ok) {
    throw new Error('ユーザの連携解除に失敗しました');
  }
}
