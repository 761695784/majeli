import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: '#FFFBE3' }}>
      <div className="max-w-7xl mx-auto container-padding">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://horizons-cdn.hostinger.com/643fe87e-c220-49ef-848d-95ea0c5a57c5/2de5c91482ef30998934b1fb9e47f01e.png" 
              alt="Majeli Connect Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Majeli Connect
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-300 relative ${
                  isActive(link.path)
                    ? 'text-accent font-semibold'
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200">
              <a href="https://wa.me/221782643438" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 active:scale-[0.98]">
              <Link to="/contact">Démarrer un projet</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      isActive(link.path)
                        ? 'text-accent font-semibold'
                        : 'text-foreground hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button asChild variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white w-full transition-all duration-200">
                  <a href="https://wa.me/221782643438" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground w-full transition-all duration-200 active:scale-[0.98]">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Démarrer un projet
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;