import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Link as LinkIcon, Linkedin } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const Section: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="font-headline text-2xl font-bold text-gray-800 mb-3 relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-12 after:h-0.5 after:bg-primary">{title}</h2>
    {children}
  </section>
);

export default function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="font-body bg-white text-gray-700 h-full flex">
      {/* Sidebar Header */}
      <div className="w-[35%] bg-primary/10 p-8 flex flex-col">
        <header className="mt-8 mb-auto">
          <h1 className="font-headline text-5xl font-extrabold text-primary leading-tight tracking-tight">{personalInfo.name || 'Your Name'}</h1>
          <h2 className="font-headline text-lg text-gray-600 mt-2">{experience[0]?.role || 'Professional Title'}</h2>
        </header>

        <div className="space-y-6 mt-auto">
          <section>
            <h3 className="font-headline text-lg font-bold text-primary mb-2">Contact</h3>
            <div className="space-y-1.5 text-xs text-gray-600">
              {personalInfo.email && <p className="flex items-center gap-2"><Mail size={14} />{personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center gap-2"><Phone size={14} />{personalInfo.phone}</p>}
              {personalInfo.location && <p className="flex items-center gap-2"><MapPin size={14} />{personalInfo.location}</p>}
              {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin size={14} />{personalInfo.linkedin}</p>}
              {personalInfo.website && <p className="flex items-center gap-2"><Globe size={14} />{personalInfo.website}</p>}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h3 className="font-headline text-lg font-bold text-primary mb-2">Skills</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {skills.map(skill => <span key={skill.id} className="text-sm">{skill.name}</span>)}
              </div>
            </section>
          )}

           {education.length > 0 && (
            <section>
              <h3 className="font-headline text-lg font-bold text-primary mb-2">Education</h3>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h3 className="text-sm font-bold text-gray-800">{edu.degree}</h3>
                  <p className="text-xs italic text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-8 overflow-y-auto">
        {summary && (
          <Section title="Profile">
            <p className="text-sm leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-800">{exp.company}</h3>
                  <p className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-sm font-semibold italic text-primary mb-1">{exp.role}</p>
                <ul className="list-disc pl-5 text-sm space-y-1 leading-relaxed">
                  {exp.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}
        
        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map(proj => (
              <div key={proj.id} className="mb-4">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base font-bold text-gray-800">{proj.name}</h3>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-primary hover:underline flex items-center gap-1"><LinkIcon size={12} />Link</a>}
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1 leading-relaxed">
                  {proj.description.split('\n').map((line, i) => line && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </Section>
        )}
      </div>
    </div>
  );
}
