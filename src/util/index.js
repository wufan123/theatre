export const isArray = Array.isArray;

export function merge(target) {
  var args = slice.call(arguments, 1);
  args.forEach((source) => {
      _merge(target, source, true);
  });
  return target;
}
function _merge(target, source, deep) {
for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
            target[key] = {};
        }
        if (isArray(source[key]) && !isArray(target[key])) {
            target[key] = [];
        }
        _merge(target[key], source[key], deep);
    } else if (source[key] !== undefined) {
        target[key] = source[key];
    }
}
}