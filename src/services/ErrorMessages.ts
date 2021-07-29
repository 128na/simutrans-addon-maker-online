import firebase from "firebase";
import { LaraveValidatonErrorBody, PakErrorBody } from '../plugins/interface';

// https://firebase.google.com/docs/reference/js/firebase.auth.Error#code
export const getFirebaseAuthErrorMessage = (error: firebase.auth.Error): string => {
  switch (error.code) {
    case 'auth/app-deleted':
      // Thrown if the instance of FirebaseApp has been deleted.
      return 'アプリケーションが存在しません。';
    case 'auth/app-not-authorized':
      // Thrown if the app identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.
      return '認証されていないアプリケーションです。';
    case 'auth/argument-error':
      // Thrown if a method is called with incorrect arguments.
      return '認証パラメーターに問題があります。';
    case 'auth/invalid-api-key':
      // Thrown if the provided API key is invalid.Please check that you have copied it correctly from the Firebase Console.
      return 'APIキーに問題があります。';
    case 'auth/invalid-user-token':
      // Thrown if the user's credential is no longer valid. The user must sign in again.
      return 'ユーザートークンに問題があります。';
    case 'auth/invalid-tenant-id':
      // Thrown if the tenant ID provided is invalid.
      return 'テナントIDに問題があります。';
    case 'auth/network-request-failed':
      // Thrown if a network error(such as timeout, interrupted connection or unreachable host) has occurred.
      return 'リクエストに失敗しました。しばらくしてから再度実行してください。';
    case 'auth/operation-not-allowed':
      // Thrown if you have not enabled the provider in the Firebase Console.Go to the Firebase Console for your project, in the Auth section and the Sign in Method tab and configure the provider.
      return '許可されていない操作です。';
    case 'auth/requires-recent-login':
      // Thrown if the user's last sign-in time does not meet the security threshold. Use firebase.User.reauthenticateWithCredential to resolve. This does not apply if the user is anonymous.
      return '最終ログインから時間が経っています。再度ログインしてから操作して下さい。';
    case 'auth/too-many-requests':
      // Thrown if requests are blocked from a device due to unusual activity.Trying again after some delay would unblock.
      return 'リクエスト頻度が高すぎます。しばらくしてから再度実行してください。';
    case 'auth/unauthorized-domain':
      // Thrown if the app domain is not authorized for OAuth operations for your Firebase project.Edit the list of authorized domains from the Firebase console.
      return '許可されていないドメインです。';
    case 'auth/user-disabled':
      // Thrown if the user account has been disabled by an administrator.Accounts can be enabled or disabled in the Firebase Console, the Auth section and Users subsection.
      return '指定されたユーザーは使用できません。';
    case 'auth/user-token-expired':
      // Thrown if the user's credential has expired. This could also be thrown if a user has been deleted. Prompting the user to sign in again should resolve this for either case.
      return 'ユーザーのトークンが期限切れです。';
    case 'auth/web-storage-unsupported':
      return 'ストレージが使用できません';
    case 'auth/provider-already-linked':
      return '既に連携済みのアカウントです。';
    case 'auth/no-such-provider':
      return '未連携のアカウントです。';
    case 'auth/popup-closed-by-user':
      return 'サインインできませんでした。';
  }
  return 'エラーが発生しました';
};

// https://firebase.google.com/docs/reference/js/firebase.firestore#firestoreerrorcode
export const getFirestoreErrorMessage = (error: firebase.firestore.FirestoreError): string => {
  switch (error.code) {
    case 'cancelled':
      //  The operation was cancelled (typically by the caller).
      return '処理がキャンセルされました。';
    case 'unknown':
      //  Unknown error or an error from a different error domain.
      return 'エラーが発生しました。';
    case 'invalid-argument':
      //  Client specified an invalid argument. Note that this differs from 'failed-precondition'. 'invalid-argument' indicates arguments that are problematic regardless of the state of the system (e.g. an invalid field name).
      return 'パラメーターに問題があります。';
    case 'deadline-exceeded':
      //  Deadline expired before operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long enough for the deadline to expire.
      return '処理制限時間を超過しました。';
    case 'not-found':
      //  Some requested document was not found.
      return 'データがありません。';
    case 'already-exists':
      //  Some document that we attempted to create already exists.
      return '既にデータが存在します。';
    case 'permission-denied':
      //  The caller does not have permission to execute the specified operation.
      return '権限がありません。';
    case 'resource-exhausted':
      //  Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.
      return '処理に必要なリソースが足りません。';
    case 'failed-precondition':
      //  Operation was rejected because the system is not in a state required for the operation's execution.
      return '処理を実行できませんでした。';
    case 'aborted':
      //  The operation was aborted, typically due to a concurrency issue like transaction aborts, etc.
      return '処理が中断されました。';
    case 'out-of-range':
      //  Operation was attempted past the valid range.
      return '範囲外です。';
    case 'unimplemented':
      //  Operation is not implemented or not supported/enabled.
      return '使用できない操作です。';
    case 'internal':
      //  Internal errors. Means some invariants expected by underlying system has been broken. If you see one of these errors, something is very broken.
      return 'システムエラーが発生しました。';
    case 'unavailable':
      //  The service is currently unavailable. This is most likely a transient condition and may be corrected by retrying with a backoff.
      return '現在サービスが利用できません。しばらくしてから再度実行してください。';
    case 'data-loss':
      //  Unrecoverable data loss or corruption.
      return 'データが欠損しました。';
    case 'unauthenticated':
      //  The request does not have valid authentication credentials for the operation.
      return '認証に失敗しました。';
  }
  return 'エラーが発生しました。';
};

// https://firebase.google.com/docs/reference/js/firebase.storage.FirebaseStorageError
export const getFirebaseStorageErrorMessage = (error: firebase.storage.FirebaseStorageError): string => {
  return 'エラーが発生しました。';
};

export class LaravelError extends Error {
  status: number;
  data: any;
  constructor(status: number, data: any) {
    super('');
    this.status = status;
    this.data = data;
  }
}

export const getLaravelErrorMessage = (error: LaravelError): string => {
  switch (error.status) {
    case 400:
      return 'エラーが発生しました';
    case 401:
      return '認証に失敗しました。';
    case 403:
      return '権限がありません。';
    case 404:
      return 'データがありません。';
    case 405:
      return '利用できない操作です。';
    case 419:
      return 'CSRFトークンエラー';
    case 422:
      return handleValidationErrorMessage(error);
    case 429:
      return "リクエスト頻度が高すぎます。\n数分経ってから再度実行してください。";
    case 500:
      return 'サーバーエラーが発生しました';
    default:
      return `[${error.status || 0}]エラーが発生しました`;
  }
}
function handleValidationErrorMessage(error: LaravelError): string {
  const body: LaraveValidatonErrorBody = error.data;
  const msg = ['入力内容を確認してください。'];
  for (const [name, errors] of Object.entries(body.errors)) {
    msg.push(errors.join("\n"));
  }

  return msg.join("\n");
}
export const getPakErrorMessage = (error: LaravelError): string => {
  if (error.status === 400) {
    return handlePakErrorMessage(error);
  }
  return getLaravelErrorMessage(error);
};

function handlePakErrorMessage(error: LaravelError) {
  const body: PakErrorBody = error.data;
  return `エラーが発生しました\nコード：${body.code}\n出力：${body.output}\nエラー：${body.error}`;
}
