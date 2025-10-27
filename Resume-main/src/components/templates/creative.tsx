import type { ResumeData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin, Link as LinkIcon, Linkedin } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};



export default function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, projects, references } = data;

  // Add debug logging to ensure this component is being called
  console.log('🎨 CreativeTemplate component is rendering!');

  return (
    <div className="font-body bg-white text-gray-700 h-full flex" style={{ minHeight: '100%' }}>
      {/* Left Sidebar - Creative Template Signature */}
      <div className="w-[35%] bg-gray-50 p-8 flex flex-col border-r-2 border-gray-200">
        <header className="mb-8">
          <h1 className="font-headline text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
            {personalInfo.name || 'Your Name'}
          </h1>
        </header>

        <div className="space-y-8">
          <section>
            <h3 className="font-headline text-lg font-bold text-teal-600 mb-4 uppercase tracking-wide">CONTACT</h3>
            <div className="space-y-3 text-sm text-gray-700">
              {personalInfo.email && <p className="flex items-center gap-3"><Mail size={16} className="text-teal-600" />{personalInfo.email}</p>}
              {personalInfo.phone && <p className="flex items-center gap-3"><Phone size={16} className="text-teal-600" />{personalInfo.phone}</p>}
              {personalInfo.location && <p className="flex items-center gap-3"><MapPin size={16} className="text-teal-600" />{personalInfo.location}</p>}
              {personalInfo.linkedin && <p className="flex items-center gap-3"><Linkedin size={16} className="text-teal-600" />{personalInfo.linkedin}</p>}
              {personalInfo.website && <p className="flex items-center gap-3"><Globe size={16} className="text-teal-600" />{personalInfo.website}</p>}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h3 className="font-headline text-lg font-bold text-teal-600 mb-4 uppercase tracking-wide">SKILLS</h3>
              <div className="space-y-2">
                {skills.map(skill => (
                  <div key={skill.id} className="text-sm text-gray-700">{skill.name}</div>
                ))}
              </div>
            </section>
          )}

           {education.length > 0 && (
            <section>
              <h3 className="font-headline text-lg font-bold text-teal-600 mb-4 uppercase tracking-wide">EDUCATION</h3>
              {education.map(edu => (
                <div key={edu.id} className="mb-4">
                  <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate || 'Present'}</p>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-8 overflow-y-auto">
        {summary && (
          <section className="mb-8">
            <h2 className="font-headline text-xl font-bold text-teal-600 mb-4 uppercase tracking-wide">SUMMARY</h2>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="font-headline text-xl font-bold text-teal-600 mb-4 uppercase tracking-wide">EXPERIENCE</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                  <p className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                </div>
                <p className="text-base font-medium text-gray-700 mb-3 italic">{exp.company}</p>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {exp.description.split('\n').map((line, i) => 
                    line && <p key={i} className="mb-1">• {line.replace(/^- /, '')}</p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}
        
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 className="font-headline text-xl font-bold text-teal-600 mb-4 uppercase tracking-wide">PROJECTS</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-6">
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{proj.name}</h3>
                  {proj.url && <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-teal-600 hover:underline flex items-center gap-1"><LinkIcon size={12} />Link</a>}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {proj.description.split('\n').map((line, i) => 
                    line && <p key={i} className="mb-1">• {line.replace(/^- /, '')}</p>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {references.length > 0 && (
          <section className="mb-8">
            <h2 className="font-headline text-xl font-bold text-teal-600 mb-4 uppercase tracking-wide">REFERENCES</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {references.map(ref => (
                <div key={ref.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{ref.name}</h3>
                  <p className="text-sm font-medium text-teal-600 mb-1">{ref.title}</p>
                  <p className="text-sm text-gray-700 mb-2">{ref.company}</p>
                  {ref.relationship && (
                    <p className="text-xs text-gray-600 mb-2 italic">{ref.relationship}</p>
                  )}
                  <div className="space-y-1 text-xs text-gray-600">
                    {ref.email && (
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="text-teal-600" />
                        <span>{ref.email}</span>
                      </div>
                    )}
                    {ref.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-teal-600" />
                        <span>{ref.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
