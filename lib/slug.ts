export function slugify(title: string) {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const stamp = Date.now().toString(36);
  return `${base || "item"}-${stamp}`;
}
