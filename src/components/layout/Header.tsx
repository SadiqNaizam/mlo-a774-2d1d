import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex w-full items-center justify-between">
        {/* This is a placeholder for a potential mobile nav toggle, kept for structure */}
        <div className="sm:hidden">
          {/* Mobile menu could be triggered here */}
        </div>
        
        {/* App Logo/Name shown on larger screens, as sidebar has it on mobile */}
        <div className="hidden sm:flex items-center gap-2">
           <LayoutGrid className="h-6 w-6 text-primary" />
           <span className="font-bold text-xl">ShopMetrics</span>
        </div>

        <div className="relative ml-auto flex-1 md:grow-0">
          {/* Search bar could be placed here in the future */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="User Avatar" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                <SettingsIcon className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link to="/login" className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;