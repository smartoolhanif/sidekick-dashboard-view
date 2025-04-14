
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerInfo } from '@/services/playerInfoService';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Shield } from 'lucide-react';
import { Region } from '@/types/playerInfo';
import { motion } from 'framer-motion';
import PlayerInfoSearch from '@/components/PlayerInfoSearch';
import PlayerInfoCard from '@/components/PlayerInfoCard';

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

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['playerInfo', playerId, selectedRegion],
    queryFn: () => fetchPlayerInfo(playerId, selectedRegion),
    enabled: shouldFetch && !!playerId,
    staleTime: 60000,
    retry: 2,
    retryDelay: 1000,
    onSettled: () => {
      setShouldFetch(false);
    }
  });

  return (
    <div className="min-h-screen ff-gradient relative overflow-hidden">
      <div className="relative z-10 p-4 flex flex-col">
        {/* Header with back button */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mb-4"
        >
          <Link to="/" className="text-white p-2 hover:bg-freefire-purple-dark/20 rounded-md transition-colors duration-300">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-white">Player Info</h1>
        </motion.div>

        {/* Search Form */}
        <PlayerInfoSearch 
          inputPlayerId={inputPlayerId}
          setInputPlayerId={setInputPlayerId}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          regions={regions}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 mb-6"
          >
            <div className="flex flex-col items-center justify-center py-8">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-freefire-purple"
              />
              <p className="text-white mt-4">Fetching player information...</p>
            </div>
          </motion.div>
        )}

        {/* Error Display */}
        {isError && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-500/20 border border-red-500/50 text-white rounded-xl p-4 mb-6"
          >
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Shield className="text-red-400" size={20} />
              Error
            </h3>
            <p className="mt-2">{(error as Error).message || 'Failed to fetch player information'}</p>
          </motion.div>
        )}

        {/* Results */}
        {data && data.status === 'success' && (
          <PlayerInfoCard playerData={data.data} credits={data.credits} />
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
