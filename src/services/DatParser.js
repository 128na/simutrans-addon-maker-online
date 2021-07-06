export function parseLine(line) {
  return line.match(
    /^([^=]+)(=> |=)?((\\d+)|([A-Za-z,_]+)|(.+))?$/i
  ) || [];
}
