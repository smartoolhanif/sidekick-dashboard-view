
import React from 'react';
import { motion } from 'framer-motion';
import { 
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
import { PlayerData } from '@/types/playerInfo';

interface PlayerInfoCardProps {
  playerData: PlayerData;
  credits: string;
}

const PlayerInfoCard: React.FC<PlayerInfoCardProps> = ({ playerData, credits }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
      className="space-y-4"
    >
      {/* Basic Info Card */}
      <motion.div 
        variants={cardVariants}
        className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 hover:border-freefire-purple/50 transition-all duration-300"
      >
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <User className="text-freefire-purple-light" size={20} />
          Basic Information
        </h3>
        <motion.div 
          variants={staggerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
        >
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Player Name</p>
            <p className="text-white font-medium">{playerData.basic_info.name}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Player ID</p>
            <p className="text-white font-medium">{playerData.basic_info.id}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Level</p>
            <p className="text-white font-medium">{playerData.basic_info.level}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Likes</p>
            <p className="text-white font-medium flex items-center gap-1">
              {playerData.basic_info.likes}
              <Heart size={14} className="text-pink-400" />
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Account Created</p>
            <p className="text-white font-medium flex items-center gap-1">
              {playerData.basic_info.account_created}
              <Calendar size={14} />
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Server</p>
            <p className="text-white font-medium flex items-center gap-1">
              {playerData.basic_info.server}
              <Globe size={14} />
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1">
            <p className="text-gray-400">Booyah Pass Level</p>
            <p className="text-white font-medium">{playerData.basic_info.booyah_pass_level}</p>
          </motion.div>
          
          {playerData.basic_info.language && (
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Language</p>
              <p className="text-white font-medium flex items-center gap-1">
                {playerData.basic_info.language}
                <MessageSquare size={14} />
              </p>
            </motion.div>
          )}
          
          {playerData.basic_info.preferred_mode && (
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Preferred Mode</p>
              <p className="text-white font-medium flex items-center gap-1">
                {playerData.basic_info.preferred_mode}
                <Gamepad2 size={14} />
              </p>
            </motion.div>
          )}
          
          {playerData.basic_info.last_login && (
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Last Login</p>
              <p className="text-white font-medium flex items-center gap-1">
                {playerData.basic_info.last_login}
                <Clock size={14} />
              </p>
            </motion.div>
          )}
          
          {playerData.basic_info.credit_score !== undefined && (
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Credit Score</p>
              <p className="text-white font-medium flex items-center gap-1">
                {playerData.basic_info.credit_score}
                <Award size={14} />
              </p>
            </motion.div>
          )}
          
          {playerData.basic_info.release_version && (
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Release Version</p>
              <p className="text-white font-medium">
                {playerData.basic_info.release_version}
              </p>
            </motion.div>
          )}
          
          {playerData.basic_info.bio && (
            <motion.div variants={itemVariants} className="space-y-1 col-span-1 md:col-span-2">
              <p className="text-gray-400">Bio</p>
              <p className="text-white font-medium">{playerData.basic_info.bio}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Rank Info Card */}
      {playerData.basic_info.rank && (
        <motion.div 
          variants={cardVariants}
          className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 hover:border-freefire-purple/50 transition-all duration-300"
        >
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Star className="text-freefire-purple-light" size={20} />
            Rank Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Battle Royale Rank */}
            <motion.div 
              variants={itemVariants}
              className="ff-card-gradient-darker border border-freefire-purple/20 rounded-lg p-3 hover:border-freefire-purple/40 transition-all duration-300"
            >
              <h4 className="text-md font-medium text-white mb-2 flex items-center gap-2">
                <Swords className="text-freefire-green" size={16} />
                Battle Royale
              </h4>
              <div className="grid grid-cols-1 gap-3 text-gray-300">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Current Rank</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.br.current}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Highest Rank</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.br.max}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Rank Points</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.br.points}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Clash Squad Rank */}
            <motion.div 
              variants={itemVariants}
              className="ff-card-gradient-darker border border-freefire-purple/20 rounded-lg p-3 hover:border-freefire-purple/40 transition-all duration-300"
            >
              <h4 className="text-md font-medium text-white mb-2 flex items-center gap-2">
                <Target className="text-freefire-green" size={16} />
                Clash Squad
              </h4>
              <div className="grid grid-cols-1 gap-3 text-gray-300">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Current Rank</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.cs.current}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Highest Rank</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.cs.max}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Rank Points</p>
                  <p className="text-white font-medium">{playerData.basic_info.rank.cs.points}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Clan Info Card */}
      {playerData.clan && (
        <motion.div 
          variants={cardVariants}
          className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 hover:border-freefire-purple/50 transition-all duration-300"
        >
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Users className="text-freefire-purple-light" size={20} />
            Guild Information
          </h3>
          <motion.div 
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
          >
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Guild Name</p>
              <p className="text-white font-medium">{playerData.clan.name}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Guild ID</p>
              <p className="text-white font-medium">{playerData.clan.id}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Guild Level</p>
              <p className="text-white font-medium">{playerData.clan.level}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Members</p>
              <p className="text-white font-medium">
                {playerData.clan.members_count}
                {playerData.clan.capacity && ` / ${playerData.clan.capacity}`}
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1 col-span-1 md:col-span-2">
              <p className="text-gray-400">Guild Leader</p>
              <div className="flex flex-col">
                <p className="text-white font-medium">{playerData.clan.leader.name}</p>
                <p className="text-gray-400 text-sm">ID: {playerData.clan.leader.id}</p>
                {playerData.clan.leader.level > 0 && (
                  <p className="text-gray-400 text-sm">Level: {playerData.clan.leader.level}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Pet Info Card */}
      {playerData.pet && (
        <motion.div 
          variants={cardVariants}
          className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4 hover:border-freefire-purple/50 transition-all duration-300"
        >
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Dog className="text-freefire-purple-light" size={20} />
            Pet Information
          </h3>
          <motion.div 
            variants={staggerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300"
          >
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Pet ID</p>
              <p className="text-white font-medium">{playerData.pet.id}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Pet Level</p>
              <p className="text-white font-medium">{playerData.pet.level}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Pet EXP</p>
              <p className="text-white font-medium">{playerData.pet.exp}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Pet Skin ID</p>
              <p className="text-white font-medium">{playerData.pet.skin_id}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Selected Skill ID</p>
              <p className="text-white font-medium">{playerData.pet.skill_id}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-1">
              <p className="text-gray-400">Status</p>
              <p className="text-white font-medium">
                {playerData.pet.selected ? 'Active' : 'Inactive'}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Attribution */}
      <motion.div 
        variants={cardVariants}
        className="bg-freefire-purple-dark/30 border border-freefire-purple/30 rounded-lg p-4 hover:border-freefire-purple/40 transition-all duration-300"
      >
        <h3 className="text-white font-medium mb-1 flex items-center gap-1">
          <Info size={16} />
          Credits:
        </h3>
        <p className="text-gray-300 text-sm">
          {credits}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PlayerInfoCard;
