export const regNewLine = /\n+/mgi;
export const regSpecial = /\s+/gi;

export const regObjSplitter = /---+/gi;

export const regParam = /^([^=]*)(=> |=)?(.*)?$/i;

export const regKeyParam = /\[([\w\d]*)\]/ig;
export const regValueParam = /[\.,]([-\d]*)/ig;

export const regFilename = /^[\d\w-_]*$/i;
