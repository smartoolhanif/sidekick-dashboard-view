
import React, { useState } from 'react';
import { 
  Home, 
  User, 
  ShieldAlert, 
  FileCog, 
  ChevronDown, 
  ChevronUp, 
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [apisOpen, setApisOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const toggleApis = () => setApisOpen(!apisOpen);
  const toggleTools = () => setToolsOpen(!toolsOpen);

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-freefire-purple/20 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="ff-header-gradient p-4 flex flex-col space-y-1">
          <div className="flex justify-between items-center">
            <div className="flex-1"></div>
            <button onClick={toggleSidebar} className="text-white p-1">
              <X size={24} />
            </button>
          </div>
          <h2 className="text-freefire-purple-light text-2xl font-bold">Free Fire Tools</h2>
          <p className="text-gray-400 text-sm">Advanced utilities for Free Fire</p>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1">
          <a 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 text-white bg-freefire-green hover:bg-freefire-green/90 rounded-md mx-2"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </a>

          {/* APIs Dropdown */}
          <div className="px-2">
            <button 
              onClick={toggleApis}
              className="w-full flex items-center justify-between px-4 py-3 text-white bg-freefire-purple hover:bg-freefire-purple/90 rounded-md"
            >
              <div className="flex items-center gap-3">
                <FileCog size={20} />
                <span>APIs</span>
              </div>
              {apisOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {apisOpen && (
              <div className="ml-2 mt-1 space-y-1">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-freefire-purple-dark/30 rounded-md">
                  <User size={18} />
                  <span>Player Info</span>
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-freefire-purple-dark/30 rounded-md">
                  <ShieldAlert size={18} />
                  <span>Ban Checker</span>
                </a>
              </div>
            )}
          </div>

          {/* Tools Dropdown */}
          <div className="px-2">
            <button 
              onClick={toggleTools}
              className="w-full flex items-center justify-between px-4 py-3 text-white bg-freefire-purple hover:bg-freefire-purple/90 rounded-md"
            >
              <div className="flex items-center gap-3">
                <FileCog size={20} />
                <span>Tools</span>
              </div>
              {toolsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {toolsOpen && (
              <div className="ml-2 mt-1 space-y-1">
                <a href="#" className="flex items-center gap-3 px-4 py-2 text-white hover:bg-freefire-purple-dark/30 rounded-md">
                  <FileCog size={18} />
                  <span>Guest Combiner</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-freefire-purple/20 text-center text-xs text-gray-500">
          © Exe Toolz All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
