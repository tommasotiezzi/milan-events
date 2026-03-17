export function formatDate(dateString: string, includeTime = true): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
  };
  return new Intl.DateTimeFormat("it-IT", options).format(date);
}

export function formatDateRange(
  startsAt: string,
  endsAt: string | null
): string {
  const start = formatDate(startsAt);
  if (!endsAt) return start;
  const end = formatDate(endsAt);
  return `${start} – ${end}`;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function generateUniqueSlug(title: string): string {
  const base = generateSlug(title);
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${base}-${suffix}`;
}

export function isPastEvent(event: {
  starts_at: string;
  ends_at: string | null;
}): boolean {
  const now = new Date();
  const end = event.ends_at ? new Date(event.ends_at) : new Date(event.starts_at);
  return end < now;
}
