
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { socialLinks } from '@/lib/data';
import Link from 'next/link';
import { Loader2, Send, Phone, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import emailjs from '@emailjs/browser';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">{children}</h2>;
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isGamer, setIsGamer] = useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);

  useEffect(() => {
    setIsGamer(theme === 'gamer');
  }, [theme]);

  useEffect(() => {
    if (isIntersecting && isGamer && !achievementUnlocked) {
      toast({
        title: "🏆 Achievement Unlocked!",
        description: "Opened a communication channel.",
        variant: 'gamer',
        duration: 3000,
      });
      setAchievementUnlocked(true);
    }
  }, [isIntersecting, isGamer, achievementUnlocked, toast]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    startTransition(async () => {
      try {
        const serviceId = 'service_gw7h5r8';
        const templateId = 'template_kh4z2he';
        const publicKey = 'DoIrFXgMK77U8nmXQ';

        const templateParams = {
          name: data.name,
          email: data.email,
          message: data.message,
        };

        console.log('Sending email with params:', { serviceId, templateId });

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        
        console.log('EmailJS Success:', response);
        
        toast({
          title: "Message Sent! ✅",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        form.reset();
      } catch (error: any) {
        console.error('EmailJS error details:', error);
        console.error('Error text:', error?.text);
        console.error('Error status:', error?.status);
        toast({
          title: "Oops! Something went wrong",
          description: "Please contact me directly at mtshixantsikalusindiso@gmail.com or call 069 230 4189.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section 
      id="contact" 
      ref={ref}
      className={cn(
        "py-16 md:py-24 bg-background/50 opacity-0 transition-opacity duration-1000",
        isIntersecting && "animate-fade-in-up"
      )}
    >
      <div className="container max-w-5xl mx-auto">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Let's Connect</h3>
            <p className="text-muted-foreground text-lg">
              I'm currently open to new opportunities and collaborations. If you have a project in mind, a question, or just want to say hi, feel free to reach out.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-4 text-lg text-muted-foreground">
                <Phone className="h-5 w-5" />
                <span>069 230 4189</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-muted-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:mtshixantsikalusindiso@gmail.com" className="hover:text-primary transition-colors">
                  mtshixantsikalusindiso@gmail.com
                </a>
              </div>
            </div>
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social) => (
                <Button asChild key={social.name} variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <social.icon className="h-6 w-6" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <Card className="p-4 sm:p-6 shadow-lg bg-transparent border-0">
            <CardContent className="p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
