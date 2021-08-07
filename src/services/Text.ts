const newTitle = [
  "新しい:item",
  "どちらかというと新しい:item",
  "やや新しい:item",
  "それなりに新しい:item",
  "新しい:item。古事記にもそう書かれている",
];

const copyTitle = [
  ":itemのコピー",
  ":itemのコピ〜",
  ":itemのコピ～",
  "2代目:item",
  ":itemの複製",
  "copy of :item",
];

/**
 * ランダムタイトル生成
 */
const randomText = (arr: string[], item: string): string =>
  arr[Math.floor(Math.random() * arr.length)].replace(':item', item);

export const randomNewTitle = (item: string): string => randomText(newTitle, item);
export const randomCopyTitle = (item: string): string => randomText(copyTitle, item);
