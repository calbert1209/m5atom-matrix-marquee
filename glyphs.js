
const PUNCT_KEYS = Object.freeze({
  space: "space",
  period: "period",
  excla: "excla", 
  question: "question",
  comma: "comma",
  dQuote: "dQuote",
  quote: "quote",
  hyphen: "hyphen",
  colon: "colon",
  semiColon: "semiColon"
});

function freezeArrayMap (arrayMap) {
  const entries = Object.entries(arrayMap);
  const frozenEntries = entries.map(([key, value]) => [key, Object.freeze(value)]);
  return Object.freeze(Object.fromEntries(frozenEntries));
}

const GLYPHS_DICT = (() => freezeArrayMap({
  a: [4, 10, 12],
  b: [15, 10, 4],
  c: [4, 10, 10],
  d: [4, 10, 15],
  e: [28, 10, 12],
  f: [4, 30, 5],
  g: [22, 22, 14],
  h: [15, 2, 12],
  i: [13],
  j: [16, 13],
  k: [15, 4, 10],
  l: [15],
  m: [14, 2, 12, 2, 12],
  n: [14, 2,12],
  o: [4, 10, 4],
  p: [30, 10, 4],
  q: [4, 10, 28],
  r: [14, 2, 4],
  s: [2, 21, 8],
  t: [2, 15, 2],
  u: [6, 8, 14],
  v: [6, 8, 6],
  w: [6, 8, 4, 8 ,6],
  x: [10, 4, 10],
  y: [6, 20, 30],
  z: [10, 14, 10],
  1: [2, 31],
  2: [18, 25, 22],
  3: [17, 21, 10],
  4: [6, 4, 31],
  5: [23, 21, 9],
  6: [14, 21, 8],
  7: [1, 29, 3],
  8: [10, 21, 10],
  9: [2, 21, 14],
  0: [14, 17, 14],
  [PUNCT_KEYS.space]: [0],
  [PUNCT_KEYS.period]: [8],
  [PUNCT_KEYS.excla]: [11], 
  [PUNCT_KEYS.question]: [1, 21, 2],
  [PUNCT_KEYS.comma]: [16, 12],
  [PUNCT_KEYS.dQuote]: [3, 3],
  [PUNCT_KEYS.quote]: [3],
  [PUNCT_KEYS.hyphen]: [4, 4, 4],
  [PUNCT_KEYS.colon]: [10],
  [PUNCT_KEYS.semiColon]: [16, 10]
}))();

const PUNCT_TO_KEY_DICT = Object.freeze({
  " ": PUNCT_KEYS.space,
  ".": PUNCT_KEYS.period,
  "!": PUNCT_KEYS.excla,
  "?": PUNCT_KEYS.question,
  ",": PUNCT_KEYS.comma,
  '"': PUNCT_KEYS.dQuote,
  "'": PUNCT_KEYS.quote,
  "-": PUNCT_KEYS.hyphen,
  ":": PUNCT_KEYS.colon,
  ";": PUNCT_KEYS.semiColon,
});

function getSafeGlyph(char) {
  let key = PUNCT_KEYS.space;
  if (char in PUNCT_TO_KEY_DICT) {
    key = PUNCT_TO_KEY_DICT[char];
  } else if (char in GLYPHS_DICT) {
    key = char;
  }

  return GLYPHS_DICT[key];
}

function toDigestValues(str) {
  return str.toLowerCase().split("")
    .map(getSafeGlyph)
    .reduce((prev, next) => {
      return [...prev, 0, ...next]
    }, [0]).concat(0);
}

export {toDigestValues}