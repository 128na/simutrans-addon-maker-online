export const required = (val: any) => !!val || "必ず指定してください";

export const max = (max: number) => (val: number) => isNaN(val) || val < max || `${max}より小さい値にして下さい`;
export const min = (min: number) => (val: number) => isNaN(val) || val > min || `${min}より大きな値にして下さい`;
export const maxEq = (max: number) => (val: number) => isNaN(val) || val <= max || `${max}以下の値にして下さい`;
export const minEq = (min: number) => (val: number) => isNaN(val) || val >= min || `${min}以上の値にして下さい`;

export const lt = (ref: number) => (val: number) => isNaN(val) || val < ref || `${ref}より小さい値にして下さい`;
export const gt = (ref: number) => (val: number) => isNaN(val) || val > ref || `${ref}より大きい値にして下さい`;
export const ltEq = (ref: number) => (val: number) => isNaN(val) || val <= ref || `${ref}以下の値にして下さい`;
export const gtEq = (ref: number) => (val: number) => isNaN(val) || val >= ref || `${ref}以上の値にして下さい`;

export const between = (min: number, max: number) => (val: number) => isNaN(val) || (min < val && val < max) || `${min}より大きく、${max}より小さい値にして下さい`;
export const betweenEq = (min: number, max: number) => (val: number) => isNaN(val) || (min <= val && val <= max) || `${min}以上、${max}以下の値にして下さい`;

/**
 * 正規表現指定
 */
export const regExp = (reg: RegExp, message = 'フォーマットが一致しません') => (val: string) => reg.test(val) || message;
/**
 * ファイル名用
 */
export const filename = (val: string) => regExp(/^[\d\w-_]*$/i, '英数ハイフン、ダッシュのみ推奨です')(val);

export const maxSpeed = (maxSpeed: number) => (val: number) => val > maxSpeed || '最高速度に到達できない可能性があります';

/**
 * 指定配列の値のみ許可
 */
export const includes = (arr: [string]) => (val: string) => arr.includes(val) || `${arr.join(', ')}のいずれかを選択してください`;

/**
 * 指定区切り文字で区切った文字列配列が全て指定ルールをパスするか
 */
export const every = (fn: (val: string) => string, separator = ',') => (val: string) =>
  val.split(separator).reduce((msg, v) => msg ? msg : fn(v), '');
