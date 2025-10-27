import { Header } from '@/components/header';
import { ResumeBuilder } from '@/components/resume-builder';
import { TemplateProvider } from '@/contexts/template-context';

export default function Home() {
  return (
    <TemplateProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <ResumeBuilder />
        </main>
      </div>
    </TemplateProvider>
  );
}
