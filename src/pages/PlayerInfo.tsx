
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerInfo } from '@/services/playerInfoService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  User, 
  Users, 
  Calendar, 
  Heart, 
  Info, 
  Shield, 
  Globe, 
  MessageSquare, 
  Clock, 
  Award, 
  Gamepad2, 
  Star, 
  Swords, 
  Target, 
  Crosshair, 
  Dog 
} from 'lucide-react';
import { Region } from '@/types/playerInfo';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define available regions (limited to the specified ones)
const regions: Region[] = [
  { name: 'India', code: 'IND' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Taiwan', code: 'TW' },
];

const PlayerInfo = () => {
  const [playerId, setPlayerId] = useState('');
  const [inputPlayerId, setInputPlayerId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('IND');
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPlayerId) {
      toast.error('Please enter a player ID');
      return;
    }
    setPlayerId(inputPlayerId);
    setShouldFetch(true);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['playerInfo', playerId, selectedRegion],
    queryFn: () => fetchPlayerInfo(playerId, selectedRegion),
    enabled: shouldFetch && !!playerId,
    staleTime: 60000,
    meta: {
      onSettled: () => {
        setShouldFetch(false);
      }
    }
  });

  return (
    <div className="min-h-screen ff-gradient relative overflow-hidden">
      <div className="relative z-10 p-4 flex flex-col">
        {/* Header with back button */}
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="text-white p-2 hover:bg-freefire-purple-dark/20 rounded-md">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Player Info</h1>
        </div>

        {/* Search Form */}
        <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 mb-6">
          <h2 className="text-xl font-bold text-white mb-3">Free Fire Player ID Lookup</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="playerId" className="text-gray-300">Player ID</label>
              <Input
                id="playerId"
                type="text"
                value={inputPlayerId}
                onChange={(e) => setInputPlayerId(e.target.value)}
                placeholder="Enter Free Fire player ID"
                className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md focus:ring-freefire-purple"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="region" className="text-gray-300">Region</label>
              <Select defaultValue={selectedRegion} onValueChange={(value) => setSelectedRegion(value)}>
                <SelectTrigger className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md focus:ring-freefire-purple">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-freefire-purple-dark border border-freefire-purple/50 text-white">
                  {regions.map((region) => (
                    <SelectItem key={region.code} value={region.code} className="text-white hover:bg-freefire-purple/20 focus:bg-freefire-purple/20 focus:text-white">
                      {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full bg-freefire-green hover:bg-freefire-green/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Player'}
            </button>
          </form>
        </div>

        {/* Results */}
        {isLoading && (
          <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 mb-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-freefire-purple"></div>
              <p className="text-white mt-4">Fetching player information...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white rounded-xl p-4 mb-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="text-red-400" size={20} />
              Error
            </h3>
            <p className="mt-2">{(error as Error).message || 'Failed to fetch player information'}</p>
          </div>
        )}

        {data && data.status === 'success' && (
          <div className="space-y-4">
            {/* Basic Info Card */}
            <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <User className="text-freefire-purple-light" size={20} />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                <div className="space-y-1">
                  <p className="text-gray-400">Player Name</p>
                  <p className="text-white font-medium">{data.data.basic_info.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Player ID</p>
                  <p className="text-white font-medium">{data.data.basic_info.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Level</p>
                  <p className="text-white font-medium">{data.data.basic_info.level}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Likes</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    {data.data.basic_info.likes}
                    <Heart size={14} className="text-pink-400" />
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Account Created</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    {data.data.basic_info.account_created}
                    <Calendar size={14} />
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Server</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    {data.data.basic_info.server}
                    <Globe size={14} />
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Booyah Pass Level</p>
                  <p className="text-white font-medium">{data.data.basic_info.booyah_pass_level}</p>
                </div>
                
                {data.data.basic_info.language && (
                  <div className="space-y-1">
                    <p className="text-gray-400">Language</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      {data.data.basic_info.language}
                      <MessageSquare size={14} />
                    </p>
                  </div>
                )}
                
                {data.data.basic_info.preferred_mode && (
                  <div className="space-y-1">
                    <p className="text-gray-400">Preferred Mode</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      {data.data.basic_info.preferred_mode}
                      <Gamepad2 size={14} />
                    </p>
                  </div>
                )}
                
                {data.data.basic_info.last_login && (
                  <div className="space-y-1">
                    <p className="text-gray-400">Last Login</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      {data.data.basic_info.last_login}
                      <Clock size={14} />
                    </p>
                  </div>
                )}
                
                {data.data.basic_info.credit_score !== undefined && (
                  <div className="space-y-1">
                    <p className="text-gray-400">Credit Score</p>
                    <p className="text-white font-medium flex items-center gap-1">
                      {data.data.basic_info.credit_score}
                      <Award size={14} />
                    </p>
                  </div>
                )}
                
                {data.data.basic_info.release_version && (
                  <div className="space-y-1">
                    <p className="text-gray-400">Release Version</p>
                    <p className="text-white font-medium">
                      {data.data.basic_info.release_version}
                    </p>
                  </div>
                )}
                
                {data.data.basic_info.bio && (
                  <div className="space-y-1 col-span-1 md:col-span-2">
                    <p className="text-gray-400">Bio</p>
                    <p className="text-white font-medium">{data.data.basic_info.bio}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Rank Info Card */}
            {data.data.basic_info.rank && (
              <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Star className="text-freefire-purple-light" size={20} />
                  Rank Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Battle Royale Rank */}
                  <div className="ff-card-gradient-darker border border-freefire-purple/20 rounded-lg p-3">
                    <h4 className="text-md font-medium text-white mb-2 flex items-center gap-2">
                      <Swords className="text-freefire-green" size={16} />
                      Battle Royale
                    </h4>
                    <div className="grid grid-cols-1 gap-3 text-gray-300">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Current Rank</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.br.current}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Highest Rank</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.br.max}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Rank Points</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.br.points}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clash Squad Rank */}
                  <div className="ff-card-gradient-darker border border-freefire-purple/20 rounded-lg p-3">
                    <h4 className="text-md font-medium text-white mb-2 flex items-center gap-2">
                      <Target className="text-freefire-green" size={16} />
                      Clash Squad
                    </h4>
                    <div className="grid grid-cols-1 gap-3 text-gray-300">
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Current Rank</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.cs.current}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Highest Rank</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.cs.max}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm">Rank Points</p>
                        <p className="text-white font-medium">{data.data.basic_info.rank.cs.points}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clan Info Card */}
            {data.data.clan && (
              <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Users className="text-freefire-purple-light" size={20} />
                  Guild Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-1">
                    <p className="text-gray-400">Guild Name</p>
                    <p className="text-white font-medium">{data.data.clan.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Guild ID</p>
                    <p className="text-white font-medium">{data.data.clan.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Guild Level</p>
                    <p className="text-white font-medium">{data.data.clan.level}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Members</p>
                    <p className="text-white font-medium">
                      {data.data.clan.members_count}
                      {data.data.clan.capacity && ` / ${data.data.clan.capacity}`}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-1 md:col-span-2">
                    <p className="text-gray-400">Guild Leader</p>
                    <div className="flex flex-col">
                      <p className="text-white font-medium">{data.data.clan.leader.name}</p>
                      <p className="text-gray-400 text-sm">ID: {data.data.clan.leader.id}</p>
                      {data.data.clan.leader.level > 0 && (
                        <p className="text-gray-400 text-sm">Level: {data.data.clan.leader.level}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pet Info Card */}
            {data.data.pet && (
              <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Dog className="text-freefire-purple-light" size={20} />
                  Pet Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div className="space-y-1">
                    <p className="text-gray-400">Pet ID</p>
                    <p className="text-white font-medium">{data.data.pet.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Pet Level</p>
                    <p className="text-white font-medium">{data.data.pet.level}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Pet EXP</p>
                    <p className="text-white font-medium">{data.data.pet.exp}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Pet Skin ID</p>
                    <p className="text-white font-medium">{data.data.pet.skin_id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Selected Skill ID</p>
                    <p className="text-white font-medium">{data.data.pet.skill_id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-400">Status</p>
                    <p className="text-white font-medium">
                      {data.data.pet.selected ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Attribution */}
            <div className="bg-freefire-purple-dark/30 border border-freefire-purple/30 rounded-lg p-4">
              <h3 className="text-white font-medium mb-1 flex items-center gap-1">
                <Info size={16} />
                Credits:
              </h3>
              <p className="text-gray-300 text-sm">
                {data.credits}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
