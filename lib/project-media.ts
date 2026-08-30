export function projectCover(item: { image?: string; images?: string[] }) {
  return item.images?.find(Boolean) || item.image || "";
}
