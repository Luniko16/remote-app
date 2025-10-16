import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Link, Linkedin } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const Section: React.FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
  <section className={`mb-6 ${className}`}>
    <h2 className="font-headline text-lg font-semibold uppercase tracking-wider text-accent pb-1 mb-3">{title}</h2>
    {children}
  </section>
);

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="font-body bg-white text-gray-800 h-full flex">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-50 p-6">
        <header className="mb-8">
          <h1 className="font-headline text-3xl font-bold text-gray-900 leading-tight">{personalInfo.name || 'Your Name'}</h1>
        </header>

        <section className="mb-6">
          <h2 className="font-headline text-lg font-semibold uppercase tracking-wider text-accent pb-1 mb-3">Contact</h2>
          <div className="space-y-2 text-xs">
            {personalInfo.email && <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-accent" />{personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-accent" />{personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-accent" />{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="flex items-center gap-2"><Linkedin className="w-3.5 h-3.5 text-accent" />{personalInfo.linkedin}</p>}
            {personalInfo.website && <p className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-accent" />{personalInfo.website}</p>}
          </div>
        </section>

        {skills.length > 0 && (
          <Section title="Skills">
            <ul className="space-y-1 text-sm">
              {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
            </ul>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                <h3 className="text-sm font-bold text-gray-800">{edu.institution}</h3>
                <p className="text-xs italic text-gray-700">{edu.degree}</p>
                <p className="text-xs text-gray-500 mt-1">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </Section>
        )}
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-6 overflow-y-auto">
        {summary && (
          <Section title="Summary">
            <p className="text-sm leading-relaxed">{summary}</p>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold text-gray-800">{exp.role}</h3>
                  <p className="text-xs font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="text-sm font-semibold italic text-gray-700 mb-1">{exp.company}</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
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
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold text-gray-800">{proj.name}</h3>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-gray-600 hover:underline flex items-center gap-1"><Link size={10} />Link</a>}
                </div>
                <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
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
