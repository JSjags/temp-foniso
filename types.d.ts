export type PostProps = {
  post: PostMeta;
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

export interface User {
  id: number;
  username: string;
  socialId: string | null;
  email: string;
  usertype: string;
  mobile: string;
  suspend: boolean;
  verified: boolean;
  status: string;
  isPasswordSet: boolean;
  email_verification_code: string | null;
  country: string;
  country_code: string;
  notification_token: string | null;
  last_seen: string; // Date string
  created_at: string; // Date string
  updated_at: string; // Date string
  deleted_at: string | null; // Date string or null
  usermeta: {
    id: number;
    userId: number;
    firstname: string;
    lastname: string;
    dob: string; // Date string
    about: string;
    gender: string;
    avatar: string;
    coverImage: string | null;
    favorite_sport: string;
    career_name: string | null;
    sport_category: string | null;
    description: string | null;
    experience_level: string | null;
    team_affiliate: string | null;
    id_type: string | null;
    id_no: string | null;
    selfie: string | null;
    subtype: string | null;
    date_of_establishment: string | null; // Date string
    business_email: string | null;
    social_link: string | null;
    other_sports: string | null;
    favorite_team: string | null;
    sport_interests: string | null;
    display: boolean;
    age: number;
    admin_verified: boolean;
    created_at: string; // Date string
    updated_at: string; // Date string
  };
}

export interface UserData {
  user: User;
  predict_date: string; // Date string
  show_prediction: boolean;
  access_token: string;
}

export interface PostMeta {
  id: number;
  userId: number;
  communityId: any; // Type not defined
  slug: any; // Type not defined
  type: string;
  content: string;
  isPublished: string; // Should be boolean
  canReply: string; // Enum: "Everyone", "Followers", "Nobody"
  title: string | null;
  sport_type: string | null;
  editted: boolean;
  tags: string[];
  medias: any; // Type not defined
  tagedUsers: (string | null)[];
  viewsCount: number;
  notification_pushed: boolean;
  created_at: string; // Date string
  updated_at: string; // Date string
  user: User;
  media: any[]; // Type not defined
  likedByMe: any[]; // Type not defined
  savedPost: any[]; // Type not defined
  likes: any[]; // Type not defined
  commentsCount: number;
  likesCount: number;
}

interface Media {
  id: number;
  mediaType: number;
  media: string;
  original_media: string;
  original_posterImage: string;
  posterImage: string;
  duration: number;
}

export interface HighlightMeta {
  id: number;
  userId: number;
  communityId: number | null;
  slug: string | null;
  type: string | null;
  content: string;
  isPublished: string | boolean;
  canReply: boolean | null;
  title: string;
  sport_type: string;
  editted: boolean;
  tags: string[] | null;
  medias: object[];
  tagedUsers: string[];
  poll_duration: number | null;
  viewsCount: number;
  notification_pushed: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  media: Media[];
  likedByMe: object[];
  savedPost: object[];
  likes: { user: User }[];
  pollOption: object[];
  commentsCount: number;
  likesCount: number;
}

export interface CommunityRule {
  id: number;
  communityId: number;
  title: string;
  description: string;
  priority: number;
  created_at: string;
  updated_at: string;
}

export type CommunityMember = {
  id: number;
  communityId: number;
  userId: number;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CommunityModerator = {
  id: number;
  communityId: number;
  userId: number;
  level: string;
  created_at: string;
  updated_at: string;
};

export interface CommunityMeta {
  id: number;
  userId: number;
  type: string;
  name: string;
  description: string;
  coverImage: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
  rules: CommunityRule[];
  members: CommunityMember[];
  moderators: CommunityModerator[];
  isMember: CommunityMember[];
  memberCount: number;
}

export type CommentMeta = {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  viewsCount: number;
  created_at: string;
  updated_at: string;
  user: User;
  likes: { id: number; userId: number }[];
  replyCount: number;
  likesCount: number;
};

export type ReplyMeta = {
  id: number;
  userId: number;
  commentId: number;
  parentcommentId: null;
  message: string;
  type: string;
  viewsCount: number;
  created_at: string;
  updated_at: string;
  user: User;
  likes: { id: number; userId: number }[];
  likesCount: number;
};

export type WrapperProps = HTMLProps<HTMLDivElement> & {
  children?: ReactNode;
};

export type ApiResponse<T> = {
  items: T;
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
