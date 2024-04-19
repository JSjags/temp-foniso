export type PostProps = {
  post: {
    avatar: string;
    displayName: string;
    favorite_sport: string;
    username: string;
    created_at: string;
    content: string;
    media: { type: string; url: string }[];
    likes_count: string;
    comment_count: string;
    views_count: string;
  };
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  // You can add other properties returned by your API if needed
}

export interface ApiErrorResponse {
  message: string;
}
