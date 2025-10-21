
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { projects } from '@/lib/data';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useToast } from '@/hooks/use-toast';
import { Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">{children}</h2>;
}

export function ProjectsSection() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("My Projects");
  const [isGamer, setIsGamer] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    const gamer = theme === 'gamer';
    const professional = theme === 'professional';
    setIsGamer(gamer);
    setIsProfessional(professional);
    setTitle(gamer ? "Completed Quests" : "My Projects");
  }, [theme]);

  useEffect(() => {
    if (isIntersecting && isGamer && !achievementUnlocked) {
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Inspected the Quest Log.",
        variant: 'gamer',
        duration: 3000,
      });
      setAchievementUnlocked(true);
    }
  }, [isIntersecting, isGamer, achievementUnlocked, toast]);

  return (
    <section 
      id="projects" 
      ref={ref}
      className={cn(
        "py-16 md:py-24"
      )}
    >
      <div className="container max-w-5xl mx-auto">
        <SectionTitle>{title}</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.imageUrlId);
            return (
              <Link
                key={project.id}
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col overflow-hidden transition-all duration-300 rounded-lg group cursor-pointer",
                  isGamer ? 'card-glowing-border hover:scale-105' : 'border bg-card text-card-foreground shadow-sm hover:shadow-xl hover:-translate-y-2',
                  isProfessional && isIntersecting && "animate-fade-in-up opacity-0"
                )}
                style={{ animationDelay: isProfessional ? `${index * 200}ms` : '0ms' }}
              >
                {projectImage && (
                  <div className="aspect-video overflow-hidden rounded-t-lg relative">
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      data-ai-hint={projectImage.imageHint}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Project →
                      </span>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  {isGamer && (
                    <Badge 
                      className={cn("mb-2", {
                        'bg-green-500/20 text-green-400 border-green-500/30': project.status === 'Completed',
                      })}
                    >
                      {project.status}
                    </Badge>
                  )}
                  <p className="text-muted-foreground text-sm mt-2">{project.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
