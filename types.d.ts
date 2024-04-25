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

interface User {
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

interface UserData {
  user: User;
  predict_date: string; // Date string
  show_prediction: boolean;
  access_token: string;
}

interface PostMeta {
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
