import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Link, Linkedin } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="font-headline text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-3 text-gray-700">{title}</h2>
    {children}
  </section>
);

export default function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="p-8 font-body bg-white text-gray-800 h-full">
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-widest uppercase text-gray-900">{personalInfo.name || 'Your Name'}</h1>
        <div className="flex justify-center items-center gap-x-4 gap-y-1 text-xs text-gray-600 mt-2 flex-wrap">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1.5"><Linkedin size={12} />{personalInfo.linkedin}</span>}
          {personalInfo.website && <span className="flex items-center gap-1.5"><Globe size={12} />{personalInfo.website}</span>}
        </div>
      </header>

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
                <p className="text-xs font-medium text-gray-600">{exp.startDate} - {exp.endDate}</p>
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

      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-bold text-gray-800">{edu.institution}</h3>
                <p className="text-xs font-medium text-gray-600">{edu.startDate} - {edu.endDate}</p>
              </div>
              <p className="text-sm italic text-gray-700">{edu.degree}</p>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => <span key={skill.id} className="text-sm">{skill.name}{skills[skills.length-1].id !== skill.id ? ' •' : ''}</span>)}
          </div>
        </Section>
      )}
    </div>
  );
}
