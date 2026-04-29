/** Uppercase the first non-whitespace character; rest unchanged. */
export function capitalizeFirstLetter(value: string): string {
  if (!value) return value;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch && /\S/.test(ch)) {
      return value.slice(0, i) + ch.toUpperCase() + value.slice(i + 1);
    }
  }
  return value;
}
