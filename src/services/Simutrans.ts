/**
 * datファイル全体
 */
class Dat {
  dat: string;
  objs: Obj[];

  constructor(dat: string) {
    this.dat = dat;
    let current = 0;
    this.objs = this.dat.replace(/---+/gi, "---").split("---")
      .map((o) => new Obj(o, [current + 1, current += o.split("\n").length]));
  }

  getObj(l: number): Obj | undefined {
    return this.objs.find(obj => obj.inRange(l))
  }
  getLine(l: number): Line | undefined {
    return this.getObj(l)?.getLine(l);
  }
}

class Obj {
  range: [number, number];
  obj: string;
  lines: Line[];

  constructor(obj: string, range: [number, number]) {
    this.range = range;
    this.obj = obj;
    this.lines = this.obj.split("\n")
      .map(l => new Line(l));
  }

  inRange(l: number): boolean {
    return this.range[0] <= l && l <= this.range[1];
  }
  getLine(l: number): Line | undefined {
    return this.lines[l - this.range[0]];
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Line {
  line: string;
  key: Key;
  operator: string;
  value: Value;

  constructor(line: string) {
    this.line = line;
    const tmp = this.line.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
    this.key = new Key((tmp[1] || "").toLowerCase());
    this.operator = tmp[2] || "";
    this.value = new Value(tmp[3] || "");
  }
  hasImage(): boolean {
    return IMAGEABLE_KEYS.includes(this.key.key);
  }
  isStaticImage(): boolean {
    return this.hasImage() && this.operator === '=> ';
  }
}

class Key {
  key: string;
  parameters: string[];

  constructor(key: string) {
    this.key = (key.split("[")[0] || "");
    this.parameters = [...key.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  value: string;
  parameters: string[];

  constructor(value: string) {
    this.value = value.split(".")[0] || "";
    this.parameters = [...value.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
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