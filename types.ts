
export interface User {
  username: string;
}

export enum View {
  Login,
  Register,
  Dashboard,
  StudyGuide,
}

export enum ExamType {
  UFPR = 'UFPR',
  ENEM = 'ENEM',
}

export interface ContentItem {
  title: string;
  description: string;
  url: string;
}

export interface StudyGuide {
  videos: ContentItem[];
  podcasts: ContentItem[];
  articles: ContentItem[];
}
