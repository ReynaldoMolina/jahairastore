export const bgColors = {
  none: '',
  neutral: 'bg-neutral-200 dark:bg-neutral-700',
  green: 'bg-green-100 dark:bg-green-900/30',
  red: 'bg-red-100 dark:bg-red-900/30',
  blue: 'bg-blue-100 dark:bg-blue-900/30',
  amber: 'bg-amber-100 dark:bg-amber-900/30',
  destructive: 'bg-destructive dark:bg-destructive/60',
};

export type BgColors = keyof typeof bgColors;
