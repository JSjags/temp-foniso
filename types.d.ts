export type AnyObject = { [key: string]: any };

export type PostProps = {
  postData: PostMeta;
  optionsType?: "user";
  isFetching?: boolean;
};

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  // You can add other properties returned by your API if needed
}

export type OptionProp = {
  label: string;
  value: string;
};

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
export interface UpdateUserData {
  user: User;
}

export interface PostMeta {
  id: number;
  userId: number;
  communityId: any; // Type not defined
  slug: any; // Type not defined
  type: string;
  content: string;
  isPublished: boolean; // Should be boolean
  canReply: string; // Enum: "Everyone", "Followers", "Nobody"
  title: string | null;
  sport_type: string | null;
  editted: boolean;
  tags: string[];
  medias: any; // Type not defined
  tagedUsers: (string | null)[];
  poll_duration: number;
  change_option: boolean;
  goal: null;
  call_to_action: null;
  external_link: null;
  duration: null;
  viewsCount: number;
  notification_pushed: boolean;
  created_at: string; // Date string
  updated_at: string; // Date string
  user: User;
  media: any[]; // Type not defined
  likedByMe: LikeMeta[]; // Type not defined
  savedPost: any[]; // Type not defined
  likes: LikeMeta[]; // Type not defined
  pollOption: PollMeta[];
  commentsCount: number;
  likesCount: number;
}

export interface LikeMeta {
  id: number;
  userId: number;
  postId: number;
  commentId: null;
  replyId: null;
  emojiId: number;
  type: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  user: User;
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

export interface PollMeta {
  id: number;
  userId: number;
  postId: number;
  option: string;
  result: number;
  totalResponse: number;
  created_at: string;
  updated_at: string;
}

export interface HighlightMeta {
  id: number;
  userId: number;
  communityId: number | null;
  slug: string | null;
  type: string;
  content: string;
  isPublished: boolean;
  canReply: string;
  title: string;
  sport_type: string;
  editted: boolean;
  tags: string[];
  medias: object[];
  tagedUsers: string[];
  poll_duration: number;
  change_option: boolean;
  goal: null;
  call_to_action: null;
  external_link: null;
  duration: null;
  viewsCount: number;
  notification_pushed: boolean;
  created_at: string;
  updated_at: string;
  user: User;
  media: Media[];
  likedByMe: LikeMeta[];
  savedPost: object[];
  likes: LikeMeta[];
  pollOption: PollMeta[];
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

export type TeamData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
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

export type NotificationMeta = {
  id: number;
  userId: number;
  senderId: number;
  title: string;
  content: string;
  type: string;
  action: null;
  status: string;
  created_at: string;
  updated_at: string;
  sender: User;
};
