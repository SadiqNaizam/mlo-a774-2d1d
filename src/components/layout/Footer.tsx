import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-2 py-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} ShopMetrics. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="#" className="hover:text-primary transition-colors">
            Support
          </Link>
          <Link to="#" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;