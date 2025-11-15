import * as fs from 'fs/promises';
import * as path from 'path';

export async function loadFonts() {
  const regularFontPath = path.join(
    process.cwd(),
    'public',
    'fonts',
    'times.ttf'
  );
  const boldFontPath = path.join(
    process.cwd(),
    'public',
    'fonts',
    'times-bold.ttf'
  );

  const regularFontData = await fs.readFile(regularFontPath);
  const boldFontData = await fs.readFile(boldFontPath);

  return { regularFontData, boldFontData };
}
