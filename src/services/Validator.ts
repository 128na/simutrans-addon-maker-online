export const required = (val: any) => !!val || "必須項目です";

export const max = (max: number) => (val: number) => isNaN(val) || val < max || `${max}より小さい値にして下さい`;
export const min = (min: number) => (val: number) => isNaN(val) || val > min || `${min}より大きな値にして下さい`;

export const maxEq = (max: number) => (val: number) => isNaN(val) || val <= max || `${max}以下の値にして下さい`;
export const minEq = (min: number) => (val: number) => isNaN(val) || val >= min || `${min}以上の値にして下さい`;

export const between = (min: number, max: number) => (val: number) => isNaN(val) || (min < val && val < max) || `${min}より大きく、${max}より小さい値にして下さい`;
export const betweenEq = (min: number, max: number) => (val: number) => isNaN(val) || (min <= val && val <= max) || `${min}以上、${max}以下の値にして下さい`;

export const regExp = (reg: RegExp, message = 'フォーマットが一致しません') => (val: string) => reg.test(val) || message;

export const maxSpeed = (maxSpeed: number) => (val: number) => val > maxSpeed || '最高速度に到達できない可能性があります';

export const includes = (arr: [string]) => (val: string) => arr.includes(val) || `${arr.join(', ')}のいずれかを選択してください`;

export const filename = (val: string) => regExp(/^[\d\w-_]*$/i, '英数ハイフン、ダッシュのみ推奨です')(val);
