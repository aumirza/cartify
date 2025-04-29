export function getInitials(name: string) {
  if (!name || name === "") return;
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}
