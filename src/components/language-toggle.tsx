import { SUPPORTED_LANGUAGES } from "@/constants/language"
import { useCodeEditorStore } from "@/store/useCodeEditorStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LanguageToggle() {
  const { language, setLanguage } = useCodeEditorStore()

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-32 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 [&>span_svg]:text-muted-foreground/80">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <SelectItem key={lang.id} value={lang.id}>
            {lang.icon}
            <span className="truncate text-sm font-semibold">{lang.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
