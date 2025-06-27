import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, LineChart, Package, LayoutGrid, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/orders-list", label: "Orders", icon: Package },
];

const LeftSidebar: React.FC = () => {
  console.log('LeftSidebar loaded');
  
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-center rounded-lg transition-colors md:h-9 md:w-9 h-12 w-12 ${
      isActive
        ? 'bg-accent text-accent-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-2.5 transition-colors rounded-lg ${
      isActive 
        ? 'text-foreground bg-muted'
        : 'text-muted-foreground hover:text-foreground'
    }`;


  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <LayoutGrid className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">ShopMetrics</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <NavLink to={item.to} end className={navLinkClasses}>
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      
      {/* Mobile Sidebar (can be integrated with Sheet component) */}
      <div className="sm:hidden">
        {/* This part can be placed inside a shadcn/ui <Sheet> component triggered by a menu button in the Header */}
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  className={({isActive}) => `${mobileNavLinkClasses({isActive})} py-2`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;