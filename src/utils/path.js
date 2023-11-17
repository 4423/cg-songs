export function getDecodedPathItems(path) {
  return path.split("/")
    .filter(s => s != "")
    .map(s => decodeURI(s))
}