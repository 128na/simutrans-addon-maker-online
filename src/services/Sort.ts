import { SORT_KEYS } from "@/constants";
import { Param } from "./Simutrans";
import { DateTime } from 'luxon';

export const sortAsNumber = (a: string, b: string) => Number(a) - Number(b);

// datテキストソート基準
export const sortForParam = (a: Param, b: Param) => {
  const [oa, ob] = [
    a.isComment ? SORT_KEYS.comment : SORT_KEYS[a.keyVal] || SORT_KEYS.unknown,
    b.isComment ? SORT_KEYS.comment : SORT_KEYS[b.keyVal] || SORT_KEYS.unknown
  ];
  return oa - ob;
}

// sort by updatedAt desc.
export const sortForFile = (a: { updatedAt: string }, b: { updatedAt: string }) =>
  DateTime.fromHTTP(b.updatedAt).diff(DateTime.fromHTTP(a.updatedAt), 'seconds').seconds
