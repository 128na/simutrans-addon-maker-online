import { sortForParam } from './Sort';

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

export const OBJ_SEPARATOR = '---';
/**
 * datファイル全体
 */
export class Dat {
  _objs: Obj[];

  constructor(original: string) {
    this._objs = original
      .replaceAll("\r\n", "\n") // win CRLF -> LF
      .replaceAll("\r", "\n") // mac CR -> LF
      .replace(/---+/gi, OBJ_SEPARATOR).split(`${OBJ_SEPARATOR}\n`) // 区切り文字の統一
      .map(o => new Obj(o));
  }

  get objs(): Obj[] {
    return this._objs;
  }

  findObjs(key: string, value: string): Obj[] {
    return this._objs
      .filter(o => o.findParamByKey(key)?.value === value);
  }

  toString(): string {
    return this._objs
      .map(o => o.toString())
      .join(`\n${OBJ_SEPARATOR}\n`)
      .replace(/\n+/mgi, '\n');
  }
}

export class Obj {
  _params: Param[];

  constructor(original: string) {
    this._params = original
      .split("\n")
      .map(l => new Param(l));
  }

  updateFromString(original: string) {
    this._params = original
      .split("\n")
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
    return this._params
      .find(p => p.keyVal === keyVal && keyParams.every((kp, i) => (kp == p.keyParams[i])));
  }

  toString(): string {
    this._params.sort(sortForParam);
    return this._params
      .filter(p => !p.isEmpty)
      .map(p => p.toString())
      .join("\n");
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
export class Param {
  _key: Key;
  _operator: string;
  _value: Value;

  constructor(original: string) {
    const tmp = original
      .split('#')[0]    // 末尾コメントを削除
      .match(/^([^=]*)(=> |=)?(.*)?$/i) || [];

    // フォーマット不一致なら値として処理する（コメント行）
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
    this._original = original.replace(/\s+/gi, '')
    this._val = this._original.split("[")[0] || "";
    this._params = [...this._original.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  _original: string;
  _val: string;
  _params: number[];

  constructor(original: string) {
    this._original = original.replace(/\s+/gi, '')
    this._val = this._original.split(".")[0] || "";
    this._params = [...this._original.matchAll(/[\.,]([-\d]*)/ig)].map(p => parseInt(p[1], 10) || 0);
  }
}

export class VehicleSpeed {
  power: number;
  gear: number;
  weight: number;
  speed: number;

  constructor(power: number, gear = 100, weight: number, speed: number) {
    this.power = Number(power);
    this.gear = Number(gear);
    this.weight = Number(weight);
    this.speed = Number(speed);
  }

  /**
   * 重量比実効出力
   */
  get powerRatio(): number {
    const pg = (this.power * this.gear) / 100;
    const w = Math.max(1, this.weight);
    return pg / w;
  }

  /**
   * 最高速度
   */
  get maxSpeed(): number {
    const calcSpeed = Math.ceil(51.44 * Math.sqrt(this.powerRatio) - 15.637);
    return Math.max(1, calcSpeed);
  }

  /**
   * 速度曲線関数
   */
  get velocityCurve(): (t: number) => number {
    const v0 = 8;
    const v = this.maxSpeed - v0;
    const c = 45;
    const rad = Math.PI / 180;
    const fn = (t: number) => v0 + v * Math.tanh(c * this.powerRatio * t * rad / v);

    return (t: number) => Math.min(this.speed, fn(t));
  }
}
