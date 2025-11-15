export function sanitizeFilename(text: string): string {
  if (!text) return '';
  // 1. Normalize and strip common accents (á -> a)
  let sanitized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 2. Handle specific characters (like ñ -> n)
  sanitized = sanitized.replace(/ñ/g, 'n').replace(/Ñ/g, 'N');

  // 3. Replace any remaining non-alphanumeric characters (except hyphens and periods) with a hyphen
  sanitized = sanitized.replace(/[^a-zA-Z0-9.\-]/g, '-');

  // 4. Clean up multiple hyphens and leading/trailing hyphens
  sanitized = sanitized.replace(/-+/g, '-').replace(/^-|-$/g, '');

  // 5. Convert to lowercase
  return sanitized.toLowerCase();
}
