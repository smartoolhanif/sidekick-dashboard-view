
import { PlayerInfoResponse } from "@/types/playerInfo";

export const fetchPlayerInfo = async (playerId: string): Promise<PlayerInfoResponse> => {
  try {
    const response = await fetch(`https://info-iota-ashen.vercel.app/api/player-info?id=${playerId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch player data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching player info:', error);
    throw error;
  }
};
