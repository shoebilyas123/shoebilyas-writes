export interface IBlog {
  title: string;
  createdAt: Date;
  content: string;
}

export interface IBlogItem {
  title: string;
  summary: string;
  slug: string;
  createdAt: Date;
}
