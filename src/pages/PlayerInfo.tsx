
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerInfo } from '@/services/playerInfoService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, User, Users, Calendar, Heart, Info, Shield } from 'lucide-react';
import { Region } from '@/types/playerInfo';

// Define available regions
const regions: Region[] = [
  { name: 'Indonesia', code: 'ID' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Vietnam', code: 'VN' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'India', code: 'IN' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Brazil', code: 'BR' },
  { name: 'MENA', code: 'MENA' },
  { name: 'Taiwan', code: 'TW' },
  { name: 'North America', code: 'NA' },
  { name: 'Latin America', code: 'LATAM' },
];

const PlayerInfo = () => {
  const [playerId, setPlayerId] = useState('');
  const [inputPlayerId, setInputPlayerId] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('BD');
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
    queryKey: ['playerInfo', playerId],
    queryFn: () => fetchPlayerInfo(playerId),
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
              <input
                id="playerId"
                type="text"
                value={inputPlayerId}
                onChange={(e) => setInputPlayerId(e.target.value)}
                placeholder="Enter Free Fire player ID"
                className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-freefire-purple"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="region" className="text-gray-300">Region</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-freefire-purple"
              >
                {regions.map((region) => (
                  <option key={region.code} value={region.code}>{region.name}</option>
                ))}
              </select>
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
                  <p className="text-white font-medium">{data.data.basic_info.server}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Booyah Pass Level</p>
                  <p className="text-white font-medium">{data.data.basic_info.booyah_pass_level}</p>
                </div>
                {data.data.basic_info.bio && (
                  <div className="space-y-1 col-span-1 md:col-span-2">
                    <p className="text-gray-400">Bio</p>
                    <p className="text-white font-medium">{data.data.basic_info.bio}</p>
                  </div>
                )}
              </div>
            </div>

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
                    <p className="text-white font-medium">{data.data.clan.members_count}</p>
                  </div>
                  <div className="space-y-1 col-span-1 md:col-span-2">
                    <p className="text-gray-400">Guild Leader</p>
                    <div className="flex flex-col">
                      <p className="text-white font-medium">{data.data.clan.leader.name}</p>
                      <p className="text-gray-400 text-sm">ID: {data.data.clan.leader.id}</p>
                      <p className="text-gray-400 text-sm">Level: {data.data.clan.leader.level}</p>
                    </div>
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
                Data provided by {data.credits}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
