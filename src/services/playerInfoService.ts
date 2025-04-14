
import { PlayerInfoResponse } from "@/types/playerInfo";

export const fetchPlayerInfo = async (playerId: string): Promise<PlayerInfoResponse> => {
  try {
    // Use CORS proxy to avoid cross-origin issues
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://info-iota-ashen.vercel.app/api/player-info?id=${playerId}`;
    
    console.log('Fetching player info from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Failed to fetch player data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching player info:', error);
    throw error;
  }
};
