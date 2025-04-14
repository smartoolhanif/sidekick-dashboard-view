
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Region } from '@/types/playerInfo';

interface PlayerInfoSearchProps {
  inputPlayerId: string;
  setInputPlayerId: (id: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  regions: Region[];
}

const PlayerInfoSearch: React.FC<PlayerInfoSearchProps> = ({
  inputPlayerId,
  setInputPlayerId,
  selectedRegion,
  setSelectedRegion,
  handleSubmit,
  isLoading,
  regions,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 mb-6"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-bold text-white mb-3"
      >
        Free Fire Player ID Lookup
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="playerId" className="text-gray-300">Player ID</label>
          <Input
            id="playerId"
            type="text"
            value={inputPlayerId}
            onChange={(e) => setInputPlayerId(e.target.value)}
            placeholder="Enter Free Fire player ID"
            className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md focus:ring-freefire-purple transition-all duration-300 hover:border-freefire-purple/80"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="region" className="text-gray-300">Region</label>
          <Select defaultValue={selectedRegion} onValueChange={(value) => setSelectedRegion(value)}>
            <SelectTrigger className="bg-freefire-purple-dark/30 text-white border border-freefire-purple/50 rounded-md focus:ring-freefire-purple transition-all duration-300 hover:border-freefire-purple/80">
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
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(0, 255, 128, 0.8)' }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-freefire-green hover:bg-freefire-green/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Player'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PlayerInfoSearch;
