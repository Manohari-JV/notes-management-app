export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  createdAt: string;
  pinned?: boolean;
}