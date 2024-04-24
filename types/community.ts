export type CreateCommunityForm = {
  community_name: string;
  description: string;
  community_type: string;
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
