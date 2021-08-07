import { SORT_KEYS } from "@/constants";

const IMAGEABLE_KEYS: string[] = [
  "icon",
  "cursor",
  // vehicle
  "emptyimage",
  "freightimage",
  // way
  "image",
  "diagonal",
  "imageUp",
  "imageUp2",
  // way-obj
  "backimage",
  "fountimage",
  "backdiagonal",
  "fountdiagonal",
  "backimageUp",
  "frontimageUp",
  "backimageUp2",
  "frontimageUp2",
  // bridge
  "backstart",
  "frontstart",
  "backstart2",
  "frontstart2",
  "backramp",
  "frontramp",
  "backramp2",
  "frontramp2",
  "backpillar",
  "frontpillar",
  "backpillar2",
  "frontpillar2",
  // crossing
  "openimage",
  "front_openimage",
  "closedimage",
  "front_closedimage",
];

const OBJ_SEPARATOR = '---';
/**
 * datファイル全体
 */
export class Dat {
  _objs: Obj[];

  constructor(original: string) {
    this._objs = original
      .replaceAll("\r\n", "\n") // win CRLF -> LF
      .replaceAll("\r", "\n") // mac CR -> LF
      .replace(/---+/gi, OBJ_SEPARATOR).split(`${OBJ_SEPARATOR}\n`)
      .map(o => new Obj(o));
  }

  get objs(): Obj[] {
    return this._objs;
  }

  findObjs(key: string, value: string): Obj[] {
    return this._objs.filter(o => o.findParamByKey(key)?.value === value);
  }

  toString(): string {
    return this._objs.map(o => o.toString()).join(`\n${OBJ_SEPARATOR}\n`).replace(/\n+/mgi, '\n');
  }
}

export class Obj {
  _params: Param[];

  constructor(original: string) {
    this._params = original.split("\n")
      .map(l => new Param(l));
  }

  updateFromString(original: string) {
    this._params = original.split("\n")
      .map(l => new Param(l));
  }
  updateOrCreate(key: string, value: string, operator = '=') {
    const param = this.findParamByKey(key);
    if (param) {
      param.value = value;
    } else {
      this.updateFromString(`${this.toString()}\n${key}${operator}${value}`);
    }
  }
  deleteByKeyVal(keyVal: string, ...keyParams: [[string]]) {
    this._params = this._params
      .filter(p => p.keyVal !== keyVal || !keyParams.every((kp, i) => (kp.includes(p.keyParams[i]))));
  }

  get obj(): string | undefined {
    return this.findParamByKey('obj')?.valueVal;
  }
  get name(): string | undefined {
    return this.findParamByKey('name')?.valueVal;
  }

  findParamsByKeyVal(keyVal: string): Param[] {
    return this._params.filter(p => p.keyVal === keyVal);
  }
  findParamByKey(key: string): Param | undefined {
    return this._params.find(p => p.key === key);
  }
  findParamByKeyParams(keyVal: string, keyParams: string[]): Param | undefined {
    return this._params.find(p => p.keyVal === keyVal && keyParams.every((kp, i) => (kp == p.keyParams[i])));
  }

  toString(): string {
    this._params.sort(comp);
    return this._params
      .filter(p => !p.isEmpty)
      .map(p => p.toString())
      .join("\n");
  }
}
// datテキストソート基準
function comp(a: Param, b: Param): number {
  const [oa, ob] = [
    a.isComment ? SORT_KEYS.comment : SORT_KEYS[a.keyVal] || SORT_KEYS.unknown,
    b.isComment ? SORT_KEYS.comment : SORT_KEYS[b.keyVal] || SORT_KEYS.unknown
  ];
  return oa - ob;
}

/**
 * dat記述の1行
 * foo=bar
 */
class Param {
  _key: Key;
  _operator: string;
  _value: Value;

  constructor(original: string) {
    const tmp = original.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
    if (!tmp[2]) {
      this._key = new Key("");
      this._operator = "";
      this._value = new Value(tmp[1] || "");
    } else {
      this._key = new Key((tmp[1] || "").toLowerCase());
      this._operator = tmp[2] || "";
      this._value = new Value(tmp[3] || "");
    }
  }
  get hasImage(): boolean {
    return IMAGEABLE_KEYS.includes(this.keyVal);
  }
  get isStaticImage(): boolean {
    return this.hasImage && this._operator === '=> ';
  }

  get key(): string {
    return this._key._original;
  }
  set key(key: string) {
    this._key = new Key(key);
  }
  get value(): string {
    return this._value._original;
  }
  set value(value: string) {
    this._value = new Value(value);
  }

  get keyVal(): string {
    return this._key._val;
  }
  get keyParams(): string[] {
    return this._key._params;
  }
  get keyParam(): string {
    return this._key._params.join(',');
  }

  get valueVal(): string {
    return this._value._val;
  }
  get valueParams(): number[] {
    return this._value._params;
  }
  get valueParam(): string {
    return this._value._params.join(',');
  }

  get isEmpty(): boolean {
    return !this.value
  }

  get isComment(): boolean {
    return this.valueVal.startsWith('#');
  }
  get isSplit(): boolean {
    return this.valueVal.startsWith('---');
  }

  toString(): string {
    return `${this.key}${this._operator}${this.value}`;
  }
}

class Key {
  _original: string;
  _val: string;
  _params: string[];

  constructor(original: string) {
    this._original = original
    this._val = (original.split("[")[0] || "");
    this._params = [...original.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  _original: string;
  _val: string;
  _params: number[];

  constructor(original: string) {
    this._original = original
    this._val = original.split(".")[0] || "";
    this._params = [...original.matchAll(/[\.,]([-\d]*)/ig)].map(p => parseInt(p[1], 10) || 0);
  }
}

/**
 * 重量比実効出力を返す
 */
export function calcPgw(power: number, gear = 100, weight: number): number {
  const pg = (power * gear) / 100;
  const w = Math.max(1, weight);
  return pg / w;
}

/**
 * 最高速度を返す
 */
export function calculateMaxSpeed(power: number, gear = 100, weight: number): number {
  return Math.max(1, Math.ceil(51.44 * Math.sqrt(calcPgw(power, gear, weight)) - 15.637));
}

/**
 * 運転曲線計算関数を返す
 */
export function calculateSpeedFn(power: number, gear = 100, weight: number, limit: number): (t: number) => number {
  const vmax = calculateMaxSpeed(power, gear, weight);
  const c = 50;
  const pgw = calcPgw(power, gear, weight);

  return (t: number) => Math.min(limit, vmax * Math.tanh(c * pgw / vmax * t * Math.PI / 180));
}