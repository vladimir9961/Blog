export interface Likes {
  userId: string;
  post_id: string;
}

export interface Blog {
  post_id: string;
  title: string;
  content: string;
  imageUrl: string;
  userId: string;
  username: string;
  created_at: string;
  likes: Likes[];
  liked: boolean;
}
