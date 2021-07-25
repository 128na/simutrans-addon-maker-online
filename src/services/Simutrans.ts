/**
 * datファイル全体
 */
class Dat {
  original: string;
  objs: Obj[];

  constructor(original: string) {
    this.original = original;
    this.objs = original
      .replaceAll("\r\n", "\n") // win CRLF -> LF
      .replaceAll("\r", "\n") // mac CR -> LF
      .replace(/---+/gi, "---").split("---\n")
      .map(o => new Obj(o));
  }

  toString(): string {
    return this.objs.map(o => o.toString()).join("\n");
  }
}

class Obj {
  original: string;
  params: Param[];

  constructor(original: string) {
    this.original = original;
    this.params = original.split("\n")
      .map(l => new Param(l));
  }

  findParamsByKey(key: string): Param[] {
    return this.params.filter(p => p.keyVal === key);
  }
  findParamByKey(key: string): Param | undefined {
    return this.params.find(p => p.keyVal === key);
  }

  toString(): string {
    return this.params.map(p => p.toString()).join("\n");
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Param {
  original: string;
  key: Key;
  operator: string;
  value: Value;

  constructor(original: string) {
    this.original = original;
    const tmp = original.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
    if (!tmp[2]) {
      this.key = new Key("");
      this.operator = "";
      this.value = new Value(tmp[1] || "");
    } else {
      this.key = new Key((tmp[1] || "").toLowerCase());
      this.operator = tmp[2] || "";
      this.value = new Value(tmp[3] || "");
    }
  }
  get hasImage(): boolean {
    return IMAGEABLE_KEYS.includes(this.keyVal);
  }
  get isStaticImage(): boolean {
    return this.hasImage && this.operator === '=> ';
  }

  get keyVal(): string {
    return this.key.val;
  }
  get keyParams(): string[] {
    return this.key.params;
  }
  get keyParam(): string {
    return this.key.params.join(',');
  }
  get keyWithParam(): string {
    return this.key.original;
  }

  get valueVal(): string {
    return this.value.val;
  }
  get valueParams(): string[] {
    return this.value.params;
  }
  get valueParam(): string {
    return this.value.params.join(',');
  }
  get valueWithParam(): string {
    return this.value.original;
  }

  get isComment(): boolean {
    return this.valueVal.startsWith('#');
  }
  get isSplit(): boolean {
    return this.valueVal.startsWith('---');
  }

  toString(): string {
    return `${this.keyWithParam}${this.operator}${this.valueWithParam}`;
  }
}

class Key {
  original: string;
  val: string;
  params: string[];

  constructor(original: string) {
    this.original = original
    this.val = (original.split("[")[0] || "");
    this.params = [...original.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  original: string;
  val: string;
  params: string[];

  constructor(original: string) {
    this.original = original
    this.val = original.split(".")[0] || "";
    this.params = [...original.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
  }
}

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

export class Simutrans {
  static Dat = Dat;
  static Obj = Obj;
  static Param = Param;
  static Key = Key;
  static Value = Value;
}