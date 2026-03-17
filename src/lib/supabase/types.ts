export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          external_link: string | null;
          starts_at: string;
          ends_at: string | null;
          location: string | null;
          category: string;
          is_sponsored: boolean;
          rsvp_required: boolean;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          external_link?: string | null;
          starts_at: string;
          ends_at?: string | null;
          location?: string | null;
          category?: string;
          is_sponsored?: boolean;
          rsvp_required?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          external_link?: string | null;
          starts_at?: string;
          ends_at?: string | null;
          location?: string | null;
          category?: string;
          is_sponsored?: boolean;
          rsvp_required?: boolean;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
