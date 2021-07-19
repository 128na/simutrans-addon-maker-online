/**
 * datファイル全体
 */
class Dat {
  dat = "";
  objs = [];
  constructor(dat) {
    this.dat = dat;
    let current = 0;
    this.objs = this.dat.replace(/---+/gi, "---").split("---")
      .map((o) => new Obj(o, [current + 1, current += o.split("\n").length]));
  }

  getLine(num) {
    // return this.objs.find(obj)
  }
}

class Obj {
  range = [0, 0];
  obj = "";
  lines = [];
  constructor(obj, range) {
    this.range = range;
    this.obj = obj;
    this.lines = this.obj.split("\n")
      .map(l => new Line(l));
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Line {
  line = "";
  key = null;
  operator = "";
  value = null;
  constructor(line) {
    this.line = line;
    const tmp = this.line.match(/^([^=]*)(=> |=)?(\S*)?$/i) || [];
    this.key = new Key((tmp[1] || "").toLowerCase());
    this.operator = tmp[2] || "";
    this.value = new Value(tmp[3] || "");
  }
  /**
   * 画像を取り得るキーか
   * @returns boolean
   */
  hasImage() {
    return IMAGEABLE_KEYS.includes(this.key.key);
  }
  /**
   * 固定画像サイズか
   * @returns boolean
   */
  isStaticImage() {
    return this.hasImage() && this.operator === '=> ';
  }
}

class Key {
  key = "";
  parameters = [];
  constructor(key) {
    this.key = (key.split("[")[0] || "");
    this.parameters = [...key.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  value = "";
  parameters = [];
  constructor(value) {
    this.value = value.split(".")[0] || "";
    this.parameters = [...value.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
  }
}

const IMAGEABLE_KEYS = [
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


export class SimutransDat {
  static Dat = Dat;
  static Obj = Obj;
  static Line = Line;
  static Key = Key;
  static Value = Value;
}