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
