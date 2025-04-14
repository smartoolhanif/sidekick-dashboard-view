
export interface PlayerBasicInfo {
  account_created: string;
  bio: string;
  booyah_pass_level: number;
  id: string;
  level: number;
  likes: number;
  name: string;
  server: string;
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
}

export interface PlayerData {
  animal: any | null;
  basic_info: PlayerBasicInfo;
  clan: ClanInfo;
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
