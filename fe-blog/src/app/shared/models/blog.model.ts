export interface Likes {
  userId: string;
  post_id: string;
}
export interface Comment {
  _id: string;
  text: string;
  userId: string;
  username: string;
}
export interface Blog {
  post_id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  username: string;
  created_at: string;
  comments: Comment[];
  likes: Likes[];
  liked: boolean;
  isOpened: boolean;
}
