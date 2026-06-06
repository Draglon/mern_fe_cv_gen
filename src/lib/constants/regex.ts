export const REGEX = {
  digits: /^\d*$/,
  string: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+(?:['-][a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]+)*$/,
  userName: /^[a-zA-Z0-9_]{3,20}$/,
  hasDigits: /\d/,
  hasLetters: /[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ]/,
  telegram: /^@?[a-zA-Z0-9_]{5,32}$/,
  phoneNumber: /^\+?[0-9\s\-()]{7,20}$/,
} as const;

export type RegexKey = keyof typeof REGEX;
