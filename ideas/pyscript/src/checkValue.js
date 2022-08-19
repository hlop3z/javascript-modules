const Methods = {
  $keys: [
    'function',
    'dict',
    'str',
    'number',
    'list',
    'null',
    'undefined',
    'none',
    'bool',
    'date',
    'regex',
  ],
  function(val) {
    return typeof val === 'function';
  },
  dict(val) {
    return val && typeof val === 'object' && val.constructor === Object;
  },
  str(val) {
    return typeof val === 'string' || val instanceof String;
  },
  number(val) {
    return typeof val === 'number' && Number.isFinite(val);
  },
  list(val) {
    return val && typeof val === 'object' && val.constructor === Array;
  },
  null(val) {
    return val === null;
  },
  undefined(val) {
    return val === undefined;
  },
  none(val) {
    return val === undefined || val === null;
  },
  bool(val) {
    return typeof val === 'boolean';
  },
  date(val) {
    return val instanceof Date;
  },
  regex(val) {
    return val && typeof val === 'object' && val.constructor === RegExp;
  },
};

export default Methods;
