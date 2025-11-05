"use client";

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const KNOWLEDGE_BASE = {
  name: "Ntsika Lusindiso Mtshixa",
  role: "Systems Support Associate & Tech Enthusiast",
  email: "mtshixantsikalusindiso@gmail.com",
  phone: "069 230 4189",
  github: "https://github.com/Luniko16",
  linkedin: "https://www.linkedin.com/in/lusindiso-mtshixa-6a8077349/",
  education: "ICT Diploma in Support Services from Walter Sisulu University (2022)",
  currentWork: "Systems Support Associate (Learnership) at Capaciti (2025 - Present)",
  skills: [
    "Hardware Support", "Operating Systems", "Software & Security",
    "Network Infrastructure", "AI & Machine Learning", "Computer Vision"
  ],
  certifications: [
    "CompTIA A+ Certification",
    "CompTIA Network+ Certification",
    "Generative AI with Large Language Models",
    "AI Essentials",
    "Python for Data Science, AI & Development"
  ],
  projects: [
    "AI-Powered Resume Builder",
    "Crop Disease Detection",
    "AI-Powered Chatbot",
    "AI-Powered Content Creator"
  ]
};

function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hello! I'm Ntsika's AI assistant. I can help you learn more about Ntsika's skills, experience, and projects. What would you like to know?`;
  }
  
  if (msg.includes('name')) {
    return `His name is ${KNOWLEDGE_BASE.name}.`;
  }
  
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return `You can reach Ntsika at:\n📧 Email: ${KNOWLEDGE_BASE.email}\n📱 Phone: ${KNOWLEDGE_BASE.phone}`;
  }
  
  if (msg.includes('skill') || msg.includes('what can') || msg.includes('expertise')) {
    return `Ntsika has expertise in:\n${KNOWLEDGE_BASE.skills.map(s => `• ${s}`).join('\n')}\n\nHe's particularly skilled in hardware support, network infrastructure, and AI/ML technologies.`;
  }
  
  if (msg.includes('education') || msg.includes('study') || msg.includes('degree')) {
    return `Ntsika holds an ${KNOWLEDGE_BASE.education}.`;
  }
  
  if (msg.includes('work') || msg.includes('job') || msg.includes('experience')) {
    return `Ntsika is currently working as a ${KNOWLEDGE_BASE.currentWork.split(' at ')[0]} at ${KNOWLEDGE_BASE.currentWork.split(' at ')[1]}. He provides comprehensive technical support for hardware, software, and network issues across diverse enterprise environments.`;
  }
  
  if (msg.includes('project')) {
    return `Ntsika has worked on several impressive projects:\n${KNOWLEDGE_BASE.projects.map(p => `• ${p}`).join('\n')}\n\nYou can view them in the Projects section of this portfolio!`;
  }
  
  if (msg.includes('certificate') || msg.includes('certification')) {
    return `Ntsika holds these certifications:\n${KNOWLEDGE_BASE.certifications.map(c => `• ${c}`).join('\n')}`;
  }
  
  if (msg.includes('github')) {
    return `You can find Ntsika's GitHub at: ${KNOWLEDGE_BASE.github}`;
  }
  
  if (msg.includes('linkedin')) {
    return `Connect with Ntsika on LinkedIn: ${KNOWLEDGE_BASE.linkedin}`;
  }
  
  if (msg.includes('hire') || msg.includes('available') || msg.includes('opportunity')) {
    return `Ntsika is open to new opportunities! Feel free to reach out via email at ${KNOWLEDGE_BASE.email} or call ${KNOWLEDGE_BASE.phone} to discuss potential collaborations.`;
  }
  
  return `I can help you learn about Ntsika's:\n• Skills and expertise\n• Work experience\n• Education\n• Projects\n• Certifications\n• Contact information\n\nWhat would you like to know?`;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm Ntsika's AI assistant. I can answer questions about his skills, experience, and projects. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isGamer = theme === 'gamer';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 500);
  };

  // Only show in professional mode
  if (isGamer) return null;

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-300",
          isOpen ? "scale-0" : "scale-100"
        )}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-card border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Chat with AI Assistant</h3>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-line",
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
