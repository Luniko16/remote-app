
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { technicalSkills, softSkills } from '@/lib/data';
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

export function SkillsSection() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("My Skills");
  const [isGamer, setIsGamer] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [softSkillsTitle, setSoftSkillsTitle] = useState("Soft Skills");
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    const gamer = theme === 'gamer';
    const professional = theme === 'professional';
    setIsGamer(gamer);
    setIsProfessional(professional);
    setTitle(gamer ? "Skill Tree" : "My Skills");
    setSoftSkillsTitle(gamer ? "Passive Abilities" : "Soft Skills");
  }, [theme]);

  useEffect(() => {
    if (isIntersecting && isGamer && !achievementUnlocked) {
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Viewed the Skill Tree.",
        variant: 'gamer',
        duration: 3000,
      });
      setAchievementUnlocked(true);
    }
  }, [isIntersecting, isGamer, achievementUnlocked, toast]);

  return (
    <section 
      id="skills" 
      ref={ref}
      className={cn(
        "py-16 md:py-24 bg-background/50 opacity-0 transition-opacity duration-1000",
        isIntersecting && "animate-fade-in-up"
      )}
    >
      <div className="container max-w-5xl mx-auto">
        <SectionTitle>{title}</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technicalSkills.map((skillCategory) => (
            <Card 
              key={skillCategory.category} 
              className={cn(
                "flex flex-col group transition-all duration-300",
                isGamer ? 'card-glowing-border hover:scale-105' : 'hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2'
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent text-xl">
                  <skillCategory.icon className={cn("h-6 w-6 text-primary transition-all duration-300 group-hover:scale-125 group-hover:text-accent")} />
                  {skillCategory.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {skillCategory.skills.map((skill) => (
                  <Badge variant="secondary" key={skill} className="mr-2 mb-2">{skill}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center text-foreground">{softSkillsTitle}</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {softSkills.map((skill) => (
              <Card 
                key={skill}
                className={cn(
                  "flex items-center justify-center p-6 group transition-all duration-300",
                  isGamer ? 'card-glowing-border hover:scale-105' : 'hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2'
                )}
              >
                <p className="text-lg font-semibold text-center">{skill}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
