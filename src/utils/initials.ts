export default function initials(value?: string): string {
  return (value ?? '')
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase())
    .join('')
    .slice(0, 2);
};
