
import { PlayerInfoResponse } from "@/types/playerInfo";

export const fetchPlayerInfo = async (playerId: string, region: string): Promise<PlayerInfoResponse> => {
  try {
    // Direct API endpoint without proxy
    const apiUrl = `https://ariiflexlabs-playerinfo-icxc.onrender.com/ff_info?uid=${playerId}&region=${region.toLowerCase()}`;
    
    console.log('Fetching player info from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Failed to fetch player data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);

    // Transform the API response to match our expected format
    const transformedData: PlayerInfoResponse = {
      credits: data.credits || data._credits || "Credits: @ariflexlabs Developer @Uncle_chips",
      data: {
        animal: data.petInfo || null,
        basic_info: {
          account_created: new Date(Number(data.captainBasicInfo.createAt) * 1000).toLocaleString(),
          bio: data.socialinfo?.AccountSignature || "",
          booyah_pass_level: data.AccountInfo?.AccountBPBadges || 0,
          id: data.captainBasicInfo.accountId,
          level: data.captainBasicInfo.level,
          likes: data.captainBasicInfo.liked,
          name: data.captainBasicInfo.nickname,
          server: data.captainBasicInfo.region,
          language: data.socialinfo?.AccountLanguage?.replace("Language_", "") || "English",
          preferred_mode: data.socialinfo?.AccountPreferMode?.replace("Prefermode_", "") || "Battle Royale",
          last_login: new Date(Number(data.captainBasicInfo.lastLoginAt) * 1000).toLocaleString(),
          credit_score: data.creditScoreInfo?.creditScore || 100,
          rank: {
            br: {
              current: data.captainBasicInfo.rank,
              max: data.captainBasicInfo.maxRank,
              points: data.captainBasicInfo.rankingPoints
            },
            cs: {
              current: data.captainBasicInfo.csRank,
              max: data.captainBasicInfo.csMaxRank,
              points: data.captainBasicInfo.csRankingPoints
            }
          },
          release_version: data.captainBasicInfo.releaseVersion,
          equipment: {
            weapon: data.captainBasicInfo.EquippedWeapon || [],
            outfit: data.AccountProfileInfo?.EquippedOutfit || []
          }
        },
        clan: data.GuildInfo ? {
          id: Number(data.GuildInfo.GuildID),
          leader: {
            account_created: "",
            booyah_pass_level: 0,
            id: Number(data.GuildInfo.GuildOwner),
            level: 0,
            likes: 0,
            name: data.GuildInfo.GuildOwner
          },
          level: data.GuildInfo.GuildLevel,
          members_count: data.GuildInfo.GuildMember,
          name: data.GuildInfo.GuildName,
          capacity: data.GuildInfo.GuildCapacity
        } : null,
        pet: data.petInfo ? {
          id: data.petInfo.id,
          exp: data.petInfo.exp,
          level: data.petInfo.level,
          skin_id: data.petInfo.skinId,
          selected: data.petInfo.isSelected,
          skill_id: data.petInfo.selectedSkillId
        } : null
      },
      message: "Player information retrieved successfully",
      status: "success",
      timestamp: new Date().toISOString()
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching player info:', error);
    throw error;
  }
};
