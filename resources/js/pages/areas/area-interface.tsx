export interface Area {
  parent: Area | null;
  id: number;
  name: string;
  area_id: number | null;  // parent area (nullable)
  created_at: string;
  updated_at: string;
}
