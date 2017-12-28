var debug = false,
{ slice } = [];

export const isArray = Array.isArray;

export function isString(val) {
    return typeof val === 'string';
}

export function isDefined(x) {
    return x === undefined;
}

export function isBoolean(val) {
    return val === true || val === false;
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

export function isEmptyObject(e) {
    var t;
    for (t in e)
        return !1;
    return !0
}

export function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

export const assign = Object.assign || _assign;

export function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {
        _merge(target, source, true);
    });

    return target;
}

export function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach((source) => {
        _merge(target, source);
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