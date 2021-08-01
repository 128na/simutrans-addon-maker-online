export const required = (val: any) => !!val || "必須項目です";

export const max = (max: number) => (val: number) => isNaN(val) || val < max || `${max}より小さい値にして下さい`;
export const min = (min: number) => (val: number) => isNaN(val) || val > min || `${min}より大きな値にして下さい`;

export const maxEq = (max: number) => (val: number) => isNaN(val) || val <= max || `${max}以下の値にして下さい`;
export const minEq = (min: number) => (val: number) => isNaN(val) || val >= min || `${min}以上の値にして下さい`;

export const regExp = (reg: RegExp, message = 'フォーマットが一致しません') => (val: string) => reg.test(val) || message;