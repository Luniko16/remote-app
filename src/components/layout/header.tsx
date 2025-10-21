
"use client";

import React from 'react';
import Link from 'next/link';
import { Menu, Home, User, Briefcase, Star, FileText, Mail as ContactIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { socialLinks } from '@/lib/data';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const professionalNavLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'About', href: '#about', icon: User },
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'Skills', href: '#skills', icon: Star },
  { name: 'Resume', href: '#resume', icon: FileText },
  { name: 'Contact', href: '#contact', icon: ContactIcon },
];

const gamerNavLinks = [
  { name: 'Start', href: '#home', icon: Home },
  { name: 'Player Profile', href: '#about', icon: User },
  { name: 'Quests', href: '#projects', icon: Briefcase },
  { name: 'Skill Tree', href: '#skills', icon: Star },
  { name: 'Character Sheet', href: '#resume', icon: FileText },
  { name: 'Contact', href: '#contact', icon: ContactIcon },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();
  const [currentNavLinks, setCurrentNavLinks] = React.useState(professionalNavLinks);
  const sectionIds = currentNavLinks.map(link => link.href.substring(1));
  const activeSection = useActiveSection(sectionIds);
  const [isGamer, setIsGamer] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const gamer = theme === 'gamer';
    setIsGamer(gamer);
    if (gamer) {
      setCurrentNavLinks(gamerNavLinks);
    } else {
      setCurrentNavLinks(professionalNavLinks);
    }
  }, [theme]);

  if (!mounted) {
    // Render a placeholder or null on the server and initial client render
    return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-20" />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">
              NLM
            </div>
            {isGamer && (
              <span className="text-sm text-primary font-mono">
                Level: 25
              </span>
            )}
          </div>
        </Link>
        <div className="flex items-center gap-4 ml-auto">
            <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
              <TooltipProvider>
                {currentNavLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <Tooltip key={link.name}>
                      <TooltipTrigger asChild>
                        <Button asChild variant={isActive ? "secondary" : "ghost"} size="icon" className="h-9 w-9">
                          <Link
                            href={link.href}
                            className={cn("flex items-center gap-2 transition-colors", {
                              "text-primary": isActive,
                              "hover:text-primary": !isActive,
                            })}
                          >
                            <link.icon className="h-5 w-5" />
                            <span className="sr-only">{link.name}</span>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{link.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </nav>
            <div className="hidden md:flex items-center gap-2">
                <ThemeToggle />
            </div>
        </div>
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-lg">Ntsika Lusindiso Mtshixa</span>
                  </Link>
                  <ThemeToggle />
                </div>
                <nav className="flex flex-col gap-4 mt-8">
                  {currentNavLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn("flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary", {
                          "text-primary": isActive,
                        })}
                      >
                         <link.icon className="h-5 w-5" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
