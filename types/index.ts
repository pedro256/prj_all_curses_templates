export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  locked: boolean;
  pdfUrl?: string;
  duration: string;
  lessons: number;
  instructor: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}