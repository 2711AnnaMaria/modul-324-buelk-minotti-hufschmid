export interface TierItem {
  id: string;
  name: string;
  color: string;
  imageUrl: string | null;
}

export interface Tier {
  id: string;
  label: string;
  color: string;
  items: TierItem[];
}
