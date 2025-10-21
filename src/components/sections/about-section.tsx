
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useToast } from "@/hooks/use-toast";
import { Trophy } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">{children}</h2>;
}

export function AboutSection() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("About Me");
  const [isGamer, setIsGamer] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    const isGamerTheme = theme === 'gamer';
    setIsGamer(isGamerTheme);
    setTitle(isGamerTheme ? "Player Profile" : "About Me");
  }, [theme]);
  
  useEffect(() => {
    if (isIntersecting && isGamer && !achievementUnlocked) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-bold">Achievement Unlocked!</span>
          </div>
        ),
        description: "Explored the Player Profile.",
        variant: 'gamer',
        duration: 3000,
      });
      setAchievementUnlocked(true);
    }
  }, [isIntersecting, isGamer, achievementUnlocked, toast]);

  return (
    <section 
      id="about" 
      ref={ref}
      className={cn(
        "relative py-16 md:py-24 opacity-0 transition-opacity duration-1000",
        isIntersecting && "animate-fade-in-up"
      )}
    >
      <div className="container max-w-5xl mx-auto relative">
        <SectionTitle>{title}</SectionTitle>
        <div className="max-w-4xl mx-auto">
          <div className={cn("space-y-6 text-lg text-foreground text-left md:text-center")}>
             <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center">I'm Ntsika Lusindiso Mtshixa</h3>
            <p>
              I work as a Systems Support Associate, where I specialize in maintaining reliable IT systems, troubleshooting issues, and ensuring smooth operations across hardware, software, and networks.
            </p>
            <p>
              With a passion for problem-solving, I enjoy helping people overcome technical challenges and making technology more accessible and efficient. My work involves supporting users, monitoring systems, and keeping everything running at peak performance.
            </p>
            <p>
              Beyond the technical side, I’m always eager to learn, grow, and explore new tools that can improve workflows and productivity. My goal is to not only fix problems but also create solutions that make everyday tasks easier for others.
            </p>
            <p>
                When I’m not working with technology, I enjoy learning new skills, exploring new tech trends, or working on personal IT projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
