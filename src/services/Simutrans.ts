/**
 * datファイル全体
 */
class Dat {
  original: string;
  objs: Obj[];

  constructor(original: string) {
    this.original = original;
    let current = 0;
    this.objs = original.replace(/---+/gi, "---").split("---\n")
      .map(o => {
        return new Obj(o, [current + 1, current += o.split("\n").length]);
      });
  }
  getObjByLine(l: number): Obj | undefined {
    return this.objs.find(obj => obj.inRange(l))
  }
  getLineByLine(l: number): Line | undefined {
    return this.getObjByLine(l)?.getLine(l);
  }
}

class Obj {
  original: string;
  range: [number, number];
  lines: Line[];

  constructor(original: string, range: [number, number]) {
    this.range = range;
    this.original = original;
    this.lines = original.split("\n")
      .map(l => new Line(l));
  }

  inRange(l: number): boolean {
    return this.range[0] <= l && l <= this.range[1];
  }
  getLine(l: number): Line | undefined {
    return this.lines[l - this.range[0]];
  }
  getLineByKey(key: string): Line | undefined {
    return this.lines.find(l => l.keyElement === key);
  }

  get obj(): string | undefined {
    return this.getLineByKey('obj')?.valueElement;
  }
  get name(): string | undefined {
    return this.getLineByKey('name')?.valueElement;
  }
  get startLineNo(): number {
    return this.range[0];
  }
}

/**
 * dat記述の1行
 * foo=bar
 */
class Line {
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
    return IMAGEABLE_KEYS.includes(this.keyElement);
  }
  get isStaticImage(): boolean {
    return this.hasImage && this.operator === '=> ';
  }

  get keyElement(): string {
    return this.key.element;
  }
  get keyParameters(): string[] {
    return this.key.parameters;
  }
  get keyParameter(): string {
    return this.key.parameters.join(',');
  }
  get keyWithParameter(): string {
    return this.key.original;
  }
  set keyElement(element: string) {
    this.key.element = element;
  }
  set keyParameters(parameters: string[]) {
    this.key.parameters = parameters;
  }


  get valueElement(): string {
    return this.value.element;
  }
  get valueParameters(): string[] {
    return this.value.parameters;
  }
  get valueParameter(): string {
    return this.value.parameters.join(',');
  }
  get valueWithParameter(): string {
    return this.value.original;
  }
  set valueElement(element: string) {
    this.value.element = element;
  }
  set valueParameters(parameters: string[]) {
    this.value.parameters = parameters;
  }

  get isComment(): boolean {
    return this.valueElement.startsWith('#');
  }
  get isSplit(): boolean {
    return this.valueElement.startsWith('---');
  }
}

class Key {
  original: string;
  element: string;
  parameters: string[];

  constructor(original: string) {
    this.original = original
    this.element = (original.split("[")[0] || "");
    this.parameters = [...original.matchAll(/\[([\w\d]*)\]/ig)].map(p => p[1] || "");
  }
}

class Value {
  original: string;
  element: string;
  parameters: string[];

  constructor(original: string) {
    this.original = original
    this.element = original.split(".")[0] || "";
    this.parameters = [...original.matchAll(/[\.,]([-\d]*)/ig)].map(p => p[1] || "");
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