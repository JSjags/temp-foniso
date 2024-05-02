import { User } from "@/types";

export type CreateCommunityForm = {
  name: string;
  description: string;
  type: string;
};

export type MoreOptionsContext = {
  label: string;
  callback: () => void;
  color?: string;
};

export type AddRulesContext = {
  title: string;
  description: string;
};

export type ItemContext = {
  name: string;
  desc: string;
  membersCount: number;
  isLocked: boolean;
  hasJoined: boolean;
  hasRequested: boolean;
};

export type CommunityRule = {
  id: number;
  communityId: number;
  title: string;
  description: string;
  priority: number;
  created_at: string;
};

export type CommunityMember = {
  id: number;
  communityId: number;
  userId: number;
  status: "joined" | "requested";
  created_at: string;
  user: User;
};
export type CommunityModerator = Omit<CommunityMember, "status"> & {
  level: string;
};

export type CommunityContext = {
  id: number;
  userId: number;
  type: "public" | "private";
  name: string;
  description: string;
  coverImage: string;
  status: "active" | "closed";
  created_at: string;
  user: User;
  rules: Array<CommunityRule>;
  members: Array<CommunityMember>;
  moderators: Array<CommunityModerator>;
  isMember: Array<CommunityMember>;
  memberCount: number;
};
