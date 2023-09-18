import { Likes, Comment } from 'src/app/shared/models/blog.model';

export interface Blog {
  post_id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  username: string;
  likes: Likes[];
  comments: Comment[];
  created_at: string;
  liked: boolean;
  isOpened: boolean;
}
