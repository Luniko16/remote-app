import { Header } from '@/components/header';
import { ResumeBuilder } from '@/components/resume-builder';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <ResumeBuilder />
      </main>
    </div>
  );
}
