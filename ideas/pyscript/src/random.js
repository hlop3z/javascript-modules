const StringText = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  hexdigits: '0123456789abcdefABCDEF',
  others: '-._~',
};

function randomBase(size, choices) {
  let text = '';
  const possible = choices;
  for (let i = 0; i < size; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export default {
  $keys: [
    'lowercase',
    'uppercase',
    'letters',
    'alphanum',
    'digits',
    'hexdigits',
    'all',
  ],
  lowercase: (text) => randomBase(text, StringText.lowercase),
  uppercase: (text) => randomBase(text, StringText.uppercase),
  letters: (text) => randomBase(text, StringText.lowercase + StringText.uppercase),
  alphanum: (text) => randomBase(
    text,
    StringText.lowercase
    + StringText.uppercase
    + StringText.digits,
  ),
  digits: (text) => randomBase(text, StringText.digits),
  hexdigits: (text) => randomBase(text, StringText.hexdigits),
  all: (text) => randomBase(text, StringText.lowercase
          + StringText.uppercase
          + StringText.digits
          + StringText.hexdigits
          + StringText.others),
};
