import { GameWrapper } from '@/components/game/game-wrapper';
import { TemplateProvider } from '@/contexts/template-context';

export default function Home() {
  return (
    <TemplateProvider>
      <GameWrapper />
    </TemplateProvider>
  );
}
