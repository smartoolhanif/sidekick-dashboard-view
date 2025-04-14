
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { fetchPlayerInfo } from '@/services/playerInfoService';
import { PlayerInfoResponse, Region } from '@/types/playerInfo';
import Sidebar from '@/components/Sidebar';
import { useToast } from '@/hooks/use-toast';

const regions: Region[] = [
  { name: 'India (IND)', code: 'IND' },
  { name: 'Bangladesh (BD)', code: 'BD' },
  { name: 'Indonesia (ID)', code: 'ID' },
  { name: 'Singapore (SG)', code: 'SG' },
  { name: 'Thailand (TH)', code: 'TH' },
  { name: 'Malaysia (MY)', code: 'MY' },
  { name: 'Vietnam (VN)', code: 'VN' }
];

const PlayerInfo: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [playerId, setPlayerId] = useState('');
  const [region, setRegion] = useState('IND');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { toast } = useToast();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['playerInfo', playerId],
    queryFn: () => fetchPlayerInfo(playerId),
    enabled: shouldFetch && !!playerId,
    staleTime: 60000,
    // Removed onSettled and replaced with onSuccess and onError
    onSuccess: () => {
      setShouldFetch(false);
    },
    onError: () => {
      setShouldFetch(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a player ID",
      });
      return;
    }
    
    setShouldFetch(true);
    refetch();
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not available';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen ff-gradient relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Overlay for when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="sticky top-0 z-20 p-4">
          <button onClick={toggleSidebar} className="text-white p-2">
            <Search size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-20">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Player Info</h1>
              <p className="text-gray-300">Get detailed information about a Free Fire player</p>
            </div>

            {/* Search Form */}
            <Card className="ff-card-gradient border border-freefire-purple/30 rounded-xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-4">Player Information</h2>
                <p className="text-gray-300 mb-6">Enter a player ID and select a region to get detailed information</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="playerId" className="text-white font-medium mb-1 block">Player ID</label>
                      <div className="relative">
                        <Input
                          id="playerId"
                          placeholder="Enter player ID"
                          className="bg-freefire-purple-dark/50 border-freefire-purple/30 text-white placeholder:text-gray-400"
                          value={playerId}
                          onChange={(e) => setPlayerId(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <Search className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3">
                      <label htmlFor="region" className="text-white font-medium mb-1 block">Region</label>
                      <Select defaultValue={region} onValueChange={setRegion}>
                        <SelectTrigger className="bg-freefire-purple-dark/50 border-freefire-purple/30 text-white">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.code} value={region.code}>
                              {region.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-freefire-purple hover:bg-freefire-purple/90 text-white px-6">
                      <Search className="mr-2 h-4 w-4" />
                      Get Player Info
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {isLoading && (
              <div className="flex justify-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-freefire-purple"></div>
              </div>
            )}

            {isError && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-white">
                <h3 className="font-bold mb-1">Error</h3>
                <p>{(error as Error)?.message || 'Failed to fetch player data'}</p>
              </div>
            )}

            {data && data.status === 'success' && (
              <div className="space-y-4">
                <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-white">{data.data.basic_info.name}</h2>
                      <p className="text-gray-300">ID: {data.data.basic_info.id} • {data.data.basic_info.server}</p>
                    </div>
                    <div className="bg-freefire-blue text-white px-3 py-1 rounded-full text-sm">
                      Level {data.data.basic_info.level}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="bg-freefire-purple-dark/50 border border-freefire-purple/30 rounded-lg mb-6">
                    <TabsTrigger value="basic" className="data-[state=active]:bg-freefire-purple text-white">Basic Info</TabsTrigger>
                    <TabsTrigger value="guild" className="data-[state=active]:bg-freefire-purple text-white">Guild</TabsTrigger>
                    <TabsTrigger value="other" className="data-[state=active]:bg-freefire-purple text-white">Other</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="bg-freefire-purple-dark/40 border-freefire-purple/30">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Account Created:</span> {formatDate(data.data.basic_info.account_created)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Likes:</span> {data.data.basic_info.likes.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 2 7l10 5 10-5-10-5Z" /><path d="M2 17 12 22 22 17" /><path d="M2 12 12 17 22 12" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Booyah Pass Level:</span> {data.data.basic_info.booyah_pass_level}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-freefire-purple-dark/40 border-freefire-purple/30">
                        <CardContent className="p-4">
                          <h3 className="text-white font-medium mb-2">Bio:</h3>
                          <p className="text-gray-300">{data.data.basic_info.bio || 'No bio available'}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="guild" className="space-y-4">
                    {data.data.clan ? (
                      <Card className="bg-freefire-purple-dark/40 border-freefire-purple/30">
                        <CardContent className="p-4 space-y-3">
                          <h3 className="text-white font-medium text-lg mb-2">Guild Information</h3>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Guild Name:</span> {data.data.clan.name}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Guild Level:</span> {data.data.clan.level}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Members:</span> {data.data.clan.members_count}
                            </div>
                          </div>
                          
                          <h4 className="text-white font-medium mt-4 mb-2">Guild Leader</h4>
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Leader Name:</span> {data.data.clan.leader.name}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 border-b border-freefire-purple/20 pb-2">
                            <div className="w-6 h-6 flex items-center justify-center text-freefire-purple-light">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                            </div>
                            <div className="text-white">
                              <span className="text-gray-400 text-sm">Leader Level:</span> {data.data.clan.leader.level}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-freefire-purple-dark/40 border-freefire-purple/30">
                        <CardContent className="p-4 text-center">
                          <p className="text-gray-300">This player is not part of any guild</p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="other" className="space-y-4">
                    <Card className="bg-freefire-purple-dark/40 border-freefire-purple/30">
                      <CardContent className="p-4">
                        <h3 className="text-white font-medium mb-2">Additional Information</h3>
                        <p className="text-gray-300">Server: {data.data.basic_info.server}</p>
                        <p className="text-gray-300 mt-2">Data fetched at: {formatDate(data.timestamp)}</p>
                        <p className="text-gray-300 mt-2">Credits: {data.credits}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm py-4 border-t border-freefire-purple/20">
          <p>Free Fire Tools</p>
          <p className="text-xs">Developed by @rahulexez</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;
