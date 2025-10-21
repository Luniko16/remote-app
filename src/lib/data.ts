
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
    liveDemoUrl: 'https://carretnet.netlify.app',
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
