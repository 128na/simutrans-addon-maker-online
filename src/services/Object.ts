export const clone = (object: any) => JSON.parse(JSON.stringify(object));

export const equals = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);