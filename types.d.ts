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
