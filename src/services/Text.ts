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

const convertTitle = [
  ":fromの:to",
];

/**
 * ランダムタイトル生成
 */
interface replaceableText {
  [index: string]: string
}
const randomText = (arr: string[], items: replaceableText): string =>
  Object.entries(items)
    .reduce(
      (text, [k, v]) => text.replace(`:${k}`, v),
      arr[Math.floor(Math.random() * arr.length)]
    );

export const randomNewTitle = (item: string): string => randomText(newTitle, { item });
export const randomCopyTitle = (item: string): string => randomText(copyTitle, { item });
export const randomConvertTitle = (from: string, to: string): string => randomText(convertTitle, { from, to });

/**
 * ランダムなIDを返す
 */
export const uid = (): string => crypto.getRandomValues(new Uint32Array(1)).join("");
