import type { ResumeData } from './types';

export const initialResumeData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '(123) 456-7890',
    location: 'City, State',
    website: 'https://your-portfolio.com',
    linkedin: 'https://linkedin.com/in/yourprofile',
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

import { Github, Linkedin, Mail, HardDrive, Terminal, ShieldCheck, Network, Cpu, BrainCircuit } from 'lucide-react';

export const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export const socialLinks: { name: string; href: string; icon: React.ElementType }[] = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lusindiso-mtshixa-6a8077349/',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Luniko16',
    icon: Github,
  },
  {
    name: 'Email',
    href: 'mailto:mtshixantsikalusindiso@gmail.com',
    icon: Mail,
  },
];

export const projects = [
  {
    id: 1,
    title: 'AI-Powered Resume Builder',
    description: 'A smart resume builder that uses AI to help users create professional resumes tailored to job descriptions.',
    imageUrlId: 'project1',
    liveDemoUrl: 'https://ai-resume.vercel.app',
    repoUrl: '#',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Crop Disease Detection',
    description: 'An application that uses computer vision to detect diseases in crops from images, helping farmers protect their yield.',
    imageUrlId: 'project2',
    liveDemoUrl: 'https://cropsafe.netlify.app',
    repoUrl: '#',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'AI-Powered Chatbot',
    description: 'An intelligent chatbot for customer service, capable of understanding and responding to user queries in natural language.',
    imageUrlId: 'project3',
    liveDemoUrl: 'https://poe.com/NETFUSEBOT',
    repoUrl: '#',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'AI-Powered Content Creator',
    description: 'A tool that leverages generative AI to create engaging marketing copy, blog posts, and other written content.',
    imageUrlId: 'project4',
    liveDemoUrl: '/study.html',
    repoUrl: '#',
    status: 'Completed',
  },
];

export const technicalSkills: { category: string, icon: React.ElementType, skills: string[] }[] = [
  {
    category: 'Hardware Support',
    icon: HardDrive,
    skills: [
      'PC & Laptop Troubleshooting',
      'Printer & Peripheral Setup',
      'Component Installation',
      'Hardware Diagnostics',
    ],
  },
  {
    category: 'Operating Systems',
    icon: Terminal,
    skills: [
      'Windows Administration',
      'Linux Management',
      'macOS Support',
      'System Installation',
    ],
  },
  {
    category: 'Software & Security',
    icon: ShieldCheck,
    skills: [
      'Application Troubleshooting',
      'Driver Management',
      'Malware Removal',
      'Antivirus Solutions',
    ],
  },
  {
    category: 'Network Infrastructure',
    icon: Network,
    skills: [
      'TCP/IP & DNS Configuration',
      'DHCP Management',
      'VPN Setup & Routing',
      'Network Switching',
    ],
  },
  {
    category: 'Network Hardware',
    icon: Cpu,
    skills: [
      'Router Configuration',
      'Switch Management',
      'Access Point Setup',
      'Cable Installation',
    ],
  },
  {
    category: 'AI & Machine Learning',
    icon: BrainCircuit,
    skills: [
      'Computer Vision',
      'Machine Learning Fundamentals',
    ],
  },
];

export const softSkills = [
  'Communication',
  'Teamwork',
  'Problem-Solving',
];

export const resume = {
  education: [
    {
      degree: 'ICT Diploma in Support Services',
      institution: 'Walter Sisulu University',
      period: '2022',
    },
  ],
  workExperience: [
    {
      company: 'Capaciti',
      role: 'Systems Support Associate (Learnership)',
      period: '2025 - Present',
      description: 'Providing comprehensive technical support for hardware, software, and network issues across diverse enterprise environments. Responsibilities include troubleshooting PC and laptop issues, configuring network infrastructure, managing Windows and Linux systems, performing hardware diagnostics and repairs, implementing security solutions, and providing end-user support. Gained hands-on experience with Active Directory, TCP/IP networking, system administration, and IT service management best practices.',
    },
  ],
  certificates: [
    {
      name: 'CompTIA A+ Certification',
      issuer: 'Boston City College',
      date: '2023',
      url: '/CompTIA A+ ce certificate.pdf',
      coverImage: '/CompTIA A+ cover.jpg',
    },
    {
      name: 'CompTIA Network+ Certification',
      issuer: 'Boston City College',
      date: '2023',
      url: '/CompTIA Network+ ce certificate.pdf',
      coverImage: '/CompTIA Network+ cover.jpg',
    },
    {
      name: 'Generative AI with Large Language Models',
      issuer: 'Coursera',
      date: '2025',
      url: '/Generative AI with Large Language Models.pdf',
      coverImage: '/Generative AI cover.jpg',
    },
    {
      name: 'AI Essentials',
      issuer: 'Coursera',
      date: '2025',
      url: '/AI Essentials.pdf',
      coverImage: '/AI Essentials cover.jpg',
    },
    {
      name: 'Python for Data Science, AI & Development',
      issuer: 'Coursera',
      date: '2025',
      url: '/Python for Data Science, AI & Development.pdf',
      coverImage: '/Python cover.jpg',
    },
  ],

};
