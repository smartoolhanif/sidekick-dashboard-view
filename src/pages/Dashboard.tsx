
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ToolCard from '@/components/ToolCard';
import { ShieldIcon, UserIcon, FileIcon } from '@/components/ToolIcons';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
            <Menu size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-20">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Dashboard</h1>
              <p className="text-gray-300">Access all Free Fire tools from one place</p>
            </div>

            {/* Welcome Card */}
            <div className="ff-card-gradient border border-freefire-purple/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">Welcome to Free Fire Tools Dashboard</h2>
              <p className="text-gray-300">
                This dashboard provides access to various tools for Free Fire game. Use the sidebar menu 
                to navigate between different tools or select one of the cards below.
              </p>
            </div>

            {/* Available Tools */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Available Tools</h2>
              <p className="text-gray-300">Currently 3 tools available in the dashboard</p>

              <div className="flex flex-col gap-3 py-2">
                {/* Tool Cards */}
                <div className="grid">
                  <ToolCard 
                    title="Ban Checker" 
                    description="Check if a Free Fire player account has been banned" 
                    icon={<ShieldIcon />}
                    shortcutKey="B"
                  />
                </div>

                <div className="grid">
                  <ToolCard 
                    title="Guest Combiner" 
                    description="Combine multiple .dat files into a single JSON file" 
                    icon={<FileIcon />}
                    shortcutKey="G"
                  />
                </div>

                <Link to="/player-info" className="grid">
                  <ToolCard 
                    title="Player Info" 
                    description="Get detailed information about a Free Fire player" 
                    icon={<UserIcon />}
                    shortcutKey="P"
                  />
                </Link>
              </div>
            </div>

            {/* Note */}
            <div className="bg-freefire-purple-dark/30 border border-freefire-purple/30 rounded-lg p-4">
              <h3 className="text-white font-medium mb-1">Note:</h3>
              <p className="text-gray-300 text-sm">
                All tools are for educational purposes only. Use them responsibly and 
                in accordance with the game's terms of service.
              </p>
            </div>
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

export default Dashboard;
