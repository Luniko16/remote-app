import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Link, Linkedin } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="font-headline text-lg font-semibold uppercase tracking-wide text-slate-800 mb-4 pb-2 border-b border-slate-200 relative">
      {title}
      <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-600"></div>
    </h2>
    {children}
  </section>
);

export default function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, references } = data;

  console.log('📄 ClassicTemplate component is rendering!');

  return (
    <div className="p-10 font-body bg-white text-slate-800 h-full max-w-4xl mx-auto">
      {/* Modern Header */}
      <header className="mb-10 pb-6 border-b-2 border-slate-100">
        <h1 className="font-headline text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          {personalInfo.name || 'Your Name'}
        </h1>
        
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-blue-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-blue-600" />
              <span className="truncate">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-blue-600" />
              <span className="truncate">{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {summary && (
        <Section title="Professional Summary">
          <p className="text-base leading-relaxed text-slate-700 font-light">{summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Professional Experience">
          {experience.map(exp => (
            <div key={exp.id} className="mb-6 pb-4 border-b border-slate-100 last:border-b-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{exp.role}</h3>
                  <p className="text-base font-medium text-blue-600 mb-2">{exp.company}</p>
                </div>
                <div className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full whitespace-nowrap">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <div className="text-sm text-slate-700 leading-relaxed space-y-1">
                {exp.description.split('\n').map((line, i) => 
                  line && (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1.5 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0"></span>
                      <span>{line.replace(/^- /, '')}</span>
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Key Projects">
          {projects.map(proj => (
            <div key={proj.id} className="mb-5 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-slate-900">{proj.name}</h3>
                {proj.url && (
                  <a 
                    href={proj.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                  >
                    <Link size={14} />
                    View Project
                  </a>
                )}
              </div>
              <div className="text-sm text-slate-700 leading-relaxed space-y-1">
                {proj.description.split('\n').map((line, i) => 
                  line && (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1.5 w-1 h-1 rounded-full bg-blue-600 flex-shrink-0"></span>
                      <span>{line.replace(/^- /, '')}</span>
                    </p>
                  )
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          <div className="grid gap-4">
            {education.map(edu => (
              <div key={edu.id} className="flex flex-col md:flex-row md:justify-between md:items-start p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{edu.degree}</h3>
                  <p className="text-base text-blue-600 font-medium">{edu.institution}</p>
                </div>
                <div className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full whitespace-nowrap mt-2 md:mt-0">
                  {edu.startDate} - {edu.endDate || 'Present'}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Core Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span 
                key={skill.id} 
                className="px-3 py-2 bg-blue-50 text-blue-800 text-sm font-medium rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </Section>
      )}

      {references.length > 0 && (
        <Section title="References">
          <div className="grid gap-4 md:grid-cols-2">
            {references.map(ref => (
              <div key={ref.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h3 className="text-base font-semibold text-slate-900 mb-1">{ref.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-1">{ref.title}</p>
                <p className="text-sm text-slate-700 mb-2">{ref.company}</p>
                {ref.relationship && (
                  <p className="text-xs text-slate-600 mb-2 italic">{ref.relationship}</p>
                )}
                <div className="space-y-1 text-xs text-slate-600">
                  {ref.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-blue-600" />
                      <span>{ref.email}</span>
                    </div>
                  )}
                  {ref.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-blue-600" />
                      <span>{ref.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
