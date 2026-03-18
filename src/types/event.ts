export type EventCategory =
  | "music"
  | "food"
  | "art"
  | "sport"
  | "culture"
  | "other";

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  image_position: string | null;
  external_link: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string | null;
  category: EventCategory;
  is_sponsored: boolean;
  rsvp_required: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type EventInsert = Omit<Event, "id" | "created_at" | "updated_at">;
export type EventUpdate = Partial<EventInsert>;
