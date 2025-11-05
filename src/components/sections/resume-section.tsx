
"use client";

import { Button } from '@/components/ui/button';
import { resume } from '@/lib/data';
import { Download, Award, Trophy, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useToast } from '@/hooks/use-toast';
import { generateHTMLToPDF } from '@/lib/pdf-generator';
import type { ResumeData } from '@/lib/types';
import { useTemplate } from '@/contexts/template-context';
import { TemplateSelector } from '@/components/template-selector';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">{children}</h2>;
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">{children}</h3>;
}

export function ResumeSection() {
  const { theme } = useTheme();
  const { template } = useTemplate();
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

  // Convert resume data to ResumeData format
  const getResumeData = (): ResumeData => {
    return {
      personalInfo: {
        name: "Ntsika Mtshixa",
        email: "ntsikamtshixa@gmail.com",
        phone: "+27 73 123 4567",
        location: "Cape Town, South Africa",
        linkedin: "linkedin.com/in/ntsika-mtshixa",
        website: "ntsikamtshixa.dev"
      },
      summary: "Passionate software developer and AI enthusiast with expertise in full-stack development, machine learning, and modern web technologies. Experienced in building scalable applications and implementing AI solutions.",
      experience: resume.workExperience.map((work, index) => ({
        id: `exp-${index}`,
        role: work.role,
        company: work.company,
        startDate: work.period.split(' - ')[0],
        endDate: work.period.split(' - ')[1] || 'Present',
        description: work.description
      })),
      education: resume.education.map((edu, index) => ({
        id: `edu-${index}`,
        degree: edu.degree,
        institution: edu.institution,
        startDate: edu.period.split(' - ')[0],
        endDate: edu.period.split(' - ')[1] || 'Present'
      })),
      skills: [
        { id: 'skill-1', name: 'JavaScript/TypeScript' },
        { id: 'skill-2', name: 'React/Next.js' },
        { id: 'skill-3', name: 'Node.js' },
        { id: 'skill-4', name: 'Python' },
        { id: 'skill-5', name: 'Machine Learning' },
        { id: 'skill-6', name: 'AI/LLMs' },
        { id: 'skill-7', name: 'Database Design' },
        { id: 'skill-8', name: 'Cloud Computing' }
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'AI Resume Builder',
          description: 'Full-stack application for generating professional resumes using AI technology',
          url: 'https://github.com/ntsika-mtshixa/resume-builder'
        },
        {
          id: 'proj-2',
          name: 'Crop Disease Detection',
          description: 'Machine learning model for detecting plant diseases using computer vision',
          url: 'https://github.com/ntsika-mtshixa/crop-disease-detection'
        }
      ],
      references: []
    };
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      
      console.log('PDF Download - Current template:', template);
      
      toast({
        title: "Generating PDF...",
        description: `Creating your resume with ${template} template`,
        duration: 2000,
      });

      const resumeData = getResumeData();
      
      // Use the enhanced jsPDF method (no html2canvas)
      await generateHTMLToPDF(resumeData, 'Ntsika_Mtshixa_Resume.pdf', template);
      
      toast({
        title: "✅ PDF Generated!",
        description: `Your ${template} template resume has been downloaded successfully`,
        duration: 3000,
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast({
        title: "❌ PDF Generation Failed",
        description: "There was an error generating your PDF. Please try again.",
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

        <div className="text-center mt-16">
          <TemplateSelector />
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
            {isGeneratingPDF ? "Generating PDF..." : "Download My Resume"}
          </Button>
        </div>
      </div>
    </section>
  );
}
