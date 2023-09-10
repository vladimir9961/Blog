export interface AddBlog {
  title: string;
  content: string;
  imageUrl: string;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  postId: string | null;
}

export const initialState: AddBlog = {
  title: '',
  content: '',
  imageUrl: '',
  loading: false,
  error: null,
  success: false,
  message: '',
  postId: '',
};
