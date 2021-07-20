/**
 * datファイル全体
 */
class Dat {
  raw: string;
  objs: Obj[];

  constructor(raw: string) {
    this.raw = raw;
    const rawLines = raw.split("\n");
    let current = 0;
    this.objs = raw.replace(/---+/gi, "---").split("---")
      .map((o) => {
        const raw = `${o}\n${rawLines[o.split("\n").length - 1]}`;
        const range: [number, number] = [current + 1, current += o.split("\n").length];
        return new Obj(raw, range);
      });
  }

  getObj(l: number): Obj | undefined {
    return this.objs.find(obj => obj.inRange(l))
  }
  getLine(l: number): Line | undefined {
    return this.getObj(l)?.getLine(l);
  }
}

class Obj {
  raw: string;
  range: [number, number];
  lines: Line[];

  constructor(raw: string, range: [number, number]) {
    this.range = range;
    this.raw = raw;
    this.lines = this.raw.split("\n")
      .map(l => new Line(l));
  }

  inRange(l: number): boolean {
    return this.range[0] <= l && l <= this.range[1];
  }
  getLine(l: number): Line | undefined {
    return this.lines[l - this.range[0]];
  }
  getLineByKey(key: string): Line | undefined {
    return this.lines.find(l => l.lineKey === key);
  }

  get obj(): string | undefined {
    return this.getLineByKey('obj')?.lineValue;
  }
  get name(): string | undefined {
    return this.getLineByKey('name')?.lineValue;
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Line {
  raw: string;
  key: Key;
  operator: string;
  value: Value;

  constructor(raw: string) {
    this.raw = raw;
    const tmp = this.raw.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
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
  hasImage(): boolean {
    return IMAGEABLE_KEYS.includes(this.lineKey);
  }
  isStaticImage(): boolean {
    return this.hasImage() && this.operator === '=> ';
  }

  get lineKey(): string {
    return this.key.key;
  }
  get lineKeyParameters(): string[] {
    return this.key.parameters;
  }
  get lineValue(): string {
    return this.value.value;
  }
  get lineValueParameters(): string[] {
    return this.value.parameters;
  }

  get isComment(): boolean {
    return this.lineKey.startsWith('#');
  }
  get isSplit(): boolean {
    return this.lineKey.startsWith('---');
  }
}

class Key {
  raw: string;
  key: string;
  parameters: string[];

  constructor(raw: string) {
    this.raw = raw
    this.key = (raw.split("[")[0] || "");
    this.parameters = [...raw.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  raw: string;
  value: string;
  parameters: string[];

  constructor(raw: string) {
    this.raw = raw
    this.value = raw.split(".")[0] || "";
    this.parameters = [...raw.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
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
  static Line = Line;
  static Key = Key;
  static Value = Value;
}