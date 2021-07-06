export function dat2Objs(dat) {
  const separator = "%%_SEPARATOR_%%";
  return dat
    .replace(/---+/i, separator)
    .split(separator);
}

export function getType(obj) {
  const found = obj.match(/obj=(\w+)/i);
  const item = (found && found[1]) || "";

  return item.toLowerCase();
}

export function getName(obj) {
  const found = obj.match(/name=(.+)/i);
  const item = (found && found[1]) || "";

  return item;
}
export function replaceName(obj, value) {
  return getName(obj)
    ? obj.replace(/name=(.+)/i, `name=${value}`)
    : `name=${value}`;
}

export function getCopyright(obj) {
  const found = obj.match(/copyright=(.+)/i);
  const item = (found && found[1]) || "";

  return item;
}
export function replaceCopyright(obj, value) {
  return obj.replace(/copyright=(.+)/i, `copyright=${value}`);
}

export function parseLine(line) {
  return line.match(
    /^([^=]+)(=> |=)?((\\d+)|([A-Za-z,_]+)|(.+))?$/i
  ) || [];
}
export function parseObj(obj) {
  const result = {};
  const data = obj.split("\n").filter(l => l).map(parseLine);
  console.log({ data });
  return data;
}