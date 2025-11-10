
"use client";

import { Button } from '@/components/ui/button';
import { resume } from '@/lib/data';
import { Download, Award, Trophy, ExternalLink, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useToast } from '@/hooks/use-toast';


function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">{children}</h2>;
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">{children}</h3>;
}

export function ResumeSection() {
  const { theme } = useTheme();
  const [title, setTitle] = useState("My Journey");
  const [isGamer, setIsGamer] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const gamer = theme === 'gamer';
    const professional = theme === 'professional';
    setIsGamer(gamer);
    setIsProfessional(professional);
    setTitle(gamer ? "Character Sheet" : "My Journey");
  }, [theme]);

  useEffect(() => {
    if (isIntersecting && isGamer && !achievementUnlocked) {
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Opened the Character Sheet.",
        variant: 'gamer',
        duration: 3000,
      });
      setAchievementUnlocked(true);
    }
  }, [isIntersecting, isGamer, achievementUnlocked, toast]);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);

      toast({
        title: "Downloading CV...",
        description: "Your resume is being downloaded",
        duration: 2000,
      });

      // Create a link element to download the static PDF
      const link = document.createElement('a');
      link.href = '/Ntsika Mtshixa.pdf.pdf';
      link.download = 'Ntsika_Mtshixa_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "✅ CV Downloaded!",
        description: "Your resume has been downloaded successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('PDF download failed:', error);
      toast({
        title: "❌ Download Failed",
        description: "There was an error downloading your CV. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <section
      id="resume"
      ref={ref}
      className={cn(
        "py-16 md:py-24 bg-transparent",
        !isProfessional && isIntersecting && "animate-fade-in-up opacity-0",
        isProfessional && "opacity-100"
      )}
    >
      <div className="container max-w-6xl mx-auto">
        <SectionTitle>{title}</SectionTitle>

        {/* Education Section */}
        <div className="mb-20">
          <SubsectionTitle>{isGamer ? "Training Grounds" : "Education"}</SubsectionTitle>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 relative border-l-2 border-accent/30 pl-8">
              {resume.education.map((edu, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative",
                    isProfessional && isIntersecting && "animate-fade-in-up opacity-0"
                  )}
                  style={{ animationDelay: isProfessional ? `${index * 200}ms` : '0ms' }}
                >
                  <div className="absolute -left-[42px] top-1.5 h-4 w-4 rounded-full bg-accent" />
                  <p className="font-semibold text-xl">{edu.degree}</p>
                  <p className="text-muted-foreground text-lg">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mb-20">
          <SubsectionTitle>{isGamer ? "Quest Log" : "Work Experience"}</SubsectionTitle>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8 relative border-l-2 border-accent/30 pl-8">
              {resume.workExperience.map((work, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative",
                    isProfessional && isIntersecting && "animate-fade-in-left opacity-0"
                  )}
                  style={{ animationDelay: isProfessional ? `${(resume.education.length + index) * 200}ms` : '0ms' }}
                >
                  <div className="absolute -left-[42px] top-1.5 h-4 w-4 rounded-full bg-accent" />
                  <p className="font-semibold text-xl">{work.role}</p>
                  <p className="text-muted-foreground text-lg">{work.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{work.period}</p>
                  <p className="mt-3 text-base leading-relaxed">{work.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mb-16">
          <SubsectionTitle>{isGamer ? 'Achievements Unlocked' : 'Certificates'}</SubsectionTitle>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resume.certificates.map((cert, index) => (
              <Link
                key={index}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group overflow-hidden rounded-lg transition-all duration-300",
                  isGamer ? 'card-glowing-border hover:scale-105' : 'border bg-card hover:shadow-xl hover:-translate-y-2'
                )}
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  <Image
                    src={(cert as any).coverImage || cert.url}
                    alt={cert.name}
                    fill
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  {isGamer ? (
                    <>
                      <p className="font-semibold text-base mb-1">{`🏆 ${cert.name}`}</p>
                      <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-base mb-1">{cert.name}</p>
                      <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* References Section */}
        <div className="mb-16">
          <SubsectionTitle>{isGamer ? 'Guild Members' : 'References'}</SubsectionTitle>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resume.references.map((ref, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-lg transition-all duration-300 relative overflow-hidden",
                  isGamer ? 'card-glowing-border hover:scale-105' : 'border bg-card hover:shadow-xl hover:-translate-y-2',
                  isProfessional && isIntersecting && "animate-fade-in-up opacity-0"
                )}
                style={{ animationDelay: isProfessional ? `${(resume.education.length + resume.workExperience.length + resume.certificates.length + index) * 200}ms` : '0ms' }}
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className={cn(
                    "p-2 rounded-full flex-shrink-0",
                    isGamer ? 'bg-accent/20' : 'bg-primary/10'
                  )}>
                    <User className={cn(
                      "w-5 h-5",
                      isGamer ? 'text-accent' : 'text-primary'
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg mb-1 truncate">
                      {isGamer ? `👤 ${ref.name}` : ref.name}
                    </h4>
                    <p className="text-primary font-medium text-sm truncate">{ref.title}</p>
                    <p className="text-muted-foreground text-sm truncate">{ref.company}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full inline-block">
                    {ref.relationship}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`mailto:${ref.email}`}
                      className="text-primary hover:underline truncate min-w-0"
                      title={ref.email}
                    >
                      {ref.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <a
                      href={`tel:${ref.phone}`}
                      className="text-primary hover:underline"
                    >
                      {ref.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* References Note */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-lg inline-block">
              {isGamer ? '🔒 Additional references available upon request' : 'Additional references available upon request'}
            </p>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            size="lg"
            className={cn(
              "transition-all duration-300",
              isGeneratingPDF && "opacity-70 cursor-not-allowed"
            )}
          >
            <Download className={cn(
              "mr-2 h-5 w-5",
              isGeneratingPDF && "animate-spin"
            )} />
            {isGeneratingPDF ? "Downloading..." : "Download My CV"}
          </Button>
        </div>
      </div>
    </section>
  );
}
