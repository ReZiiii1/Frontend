export const CATEGORY_NAMES = [
  'Zupy',
  'Danie główne',
  'Burgery',
  'Dodatki',
  'Dla dzieci',
  'Napoje zimne',
  'Napoje ciepłe',
  'Alkohole',
  'Piwo kuflowe',
];

export const categories = CATEGORY_NAMES.map((name) => ({
  id: name,
  name,
}));