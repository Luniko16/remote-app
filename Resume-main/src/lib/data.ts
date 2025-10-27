import type { ResumeData } from './types';

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    website: 'https://your-portfolio.com',
  },
  summary: 'A highly motivated and detail-oriented professional seeking to leverage my skills in a challenging new role. You can write your own summary, or use our AI to generate a powerful one based on your experience and skills.',
  experience: [
    {
      id: 'exp1',
      company: 'Innovate Corp',
      role: 'Software Engineer',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: '- Developed and maintained web applications using React and Node.js.\n- Collaborated with cross-functional teams to define, design, and ship new features.\n- Optimized application for maximum speed and scalability.'
    },
     {
      id: 'exp2',
      company: 'Tech Solutions Inc.',
      role: 'Junior Developer',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      description: '- Assisted in the development of front-end components.\n- Participated in code reviews and contributed to team meetings.'
    },
  ],
  education: [
    {
      id: 'edu1',
      institution: 'University of Technology',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2016',
      endDate: 'May 2020',
    },
  ],
  skills: [
    { id: 'skill1', name: 'React' },
    { id: 'skill2', name: 'Next.js' },
    { id: 'skill3', name: 'TypeScript' },
    { id: 'skill4', name: 'Node.js' },
    { id: 'skill5', name: 'SQL' },
    { id: 'skill6', name: 'Agile Methodologies' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'Project Alpha',
      description: '- A cool project that does cool things using cool technology.\n- Led to a 20% increase in coolness.',
      url: 'https://github.com/your-name/project-alpha',
    },
  ],
  references: [
    {
      id: 'ref1',
      name: 'Jane Smith',
      title: 'Senior Engineering Manager',
      company: 'Innovate Corp',
      email: 'jane.smith@innovatecorp.com',
      phone: '(555) 123-4567',
      relationship: 'Former supervisor',
    },
  ],
};
