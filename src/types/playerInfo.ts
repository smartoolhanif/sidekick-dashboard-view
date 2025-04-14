
export interface PlayerBasicInfo {
  account_created: string;
  bio: string;
  booyah_pass_level: number;
  id: string;
  level: number;
  likes: number;
  name: string;
  server: string;
  language?: string;
  preferred_mode?: string;
  last_login?: string;
  credit_score?: number;
  rank?: {
    br: {
      current: number;
      max: number;
      points: number;
    };
    cs: {
      current: number;
      max: number;
      points: number;
    };
  };
  release_version?: string;
  equipment?: {
    weapon: number[];
    outfit: number[];
  };
}

export interface ClanLeader {
  account_created: string;
  booyah_pass_level: number;
  id: number;
  level: number;
  likes: number;
  name: string;
}

export interface ClanInfo {
  id: number;
  leader: ClanLeader;
  level: number;
  members_count: number;
  name: string;
  capacity?: number;
}

export interface PetInfo {
  id: number;
  exp: number;
  level: number;
  skin_id: number;
  selected: boolean;
  skill_id: number;
}

export interface PlayerData {
  animal: any | null;
  basic_info: PlayerBasicInfo;
  clan: ClanInfo | null;
  pet?: PetInfo | null;
}

export interface PlayerInfoResponse {
  credits: string;
  data: PlayerData;
  message: string;
  status: string;
  timestamp: string;
}

export interface Region {
  name: string;
  code: string;
}
