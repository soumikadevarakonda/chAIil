import { Baby } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Logo() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2" aria-label="chAIid Logo">
      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
        <Baby className="h-6 w-6" />
      </div>
      <span className="text-xl font-bold font-headline">{t('app.name')}</span>
    </div>
  );
}
