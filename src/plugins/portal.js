import firebase from "firebase";
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

function randomString(length = 128) {
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
function createCodeChallenge(codeVerifier) {
  return Base64.stringify(sha256(codeVerifier))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export default {
  signin() {
    const state = randomString(40);
    const codeVerifier = randomString(128);
    const codeChallenge = createCodeChallenge(codeVerifier);
    console.log({ codeChallenge });

    const param = new URLSearchParams();
    param.append('client_id', process.env.VUE_APP_OAUTH_PORTAL_CLIENT_ID);
    param.append('redirect_uri', process.env.VUE_APP_OAUTH_REDIRECT_URL);
    param.append('response_type', 'code');
    param.append('scope', '*');
    param.append('state', state);
    param.append('code_challenge', codeChallenge);
    param.append('code_challenge_method', 'S256');
    const url = `${process.env.VUE_APP_OAUTH_PORTAL_URL}/authorize?${param.toString()}`;

    const win = window.open(url, "portal", [
      "width=400",
      "height=600",
      "status=no",
    ]);

    this.handlehWindow(win, state, codeVerifier);

  },
  handlehWindow(win, exptectedState, codeVerifier) {
    let timeout = 300; // 5min
    const timer = setInterval(() => {
      if (win.closed) {
        return clearInterval(timer);
      }
      if (timeout < 1) {
        clearInterval(timer);
        win.close();
        return alert('タイムアウトしました');
      }

      try {
        const current = win.location.origin + win.location.pathname;
        if (current === process.env.VUE_APP_OAUTH_REDIRECT_URL) {
          const param = new URLSearchParams(win.location.search);
          const code = param.get("code");
          const state = param.get("state");

          clearInterval(timer);
          win.close();
          if (exptectedState !== state) {
            return alert('認証に失敗しました');
          }
          this.getToken(code, codeVerifier);
        }
      } catch (e) {
      }
      timeout--;
    }, 1000);
  },

  async getToken(code, codeVerifier) {
    const url = `${process.env.VUE_APP_OAUTH_PORTAL_URL}/token`;
    const json = JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.VUE_APP_OAUTH_PORTAL_CLIENT_ID,
      redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URL,
      code_verifier: codeVerifier,
      code,
    });
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    });

    if (!res.ok) {
      return alert('トークン取得に失敗しました');
    }

    const token = await res.json();

    console.log({ token });

  },

  async fetchUser(token) {
    
  },

  async customLogin(token) {
    try {
      await firebase.auth().signInWithCustomToken(token);
    } catch (error) {
      console.error({ error });
      alert('連携に失敗しました');
    }
  },

  link() { }



}