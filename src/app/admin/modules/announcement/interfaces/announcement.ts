export interface IAnnouncement {
  id: number;
  title: string;
  resource_path: string;
  resource_type: string;
  is_for_consumer: number;
  starts_at: string;
  ends_at: string;
  type: string;
  status: number;
  thumbnail: string;
}
