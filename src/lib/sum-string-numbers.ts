export function sumString(expression: string): number {
  const numbers = expression
    .split('+')
    .map((v) => v.trim())
    .map(Number);

  if (numbers.some((n) => Number.isNaN(n))) {
    throw new Error('Invalid numeric expression');
  }

  return numbers.reduce((sum, n) => sum + n, 0);
}
