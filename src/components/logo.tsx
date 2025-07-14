import { Baby } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Logo({ showTagline = false }: { showTagline?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-3" aria-label="chAIid Logo">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Baby className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold font-headline leading-tight">{t('app.name')}</span>
        {showTagline && <p className="text-xs text-muted-foreground leading-tight">{t('app.tagline')}</p>}
      </div>
    </div>
  );
}
