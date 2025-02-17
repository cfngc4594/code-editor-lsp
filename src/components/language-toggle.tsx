import { connectToLanguageServer } from '@/lib/language-server'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'
import { SUPPORTED_LANGUAGE_SERVERS } from '@/config/language-server'
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/constants/language'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function LanguageToggle() {
  const { language, setLanguage, languageClient, setLanguageClient } = useCodeEditorStore()

  return (
    <Select
      value={language}
      onValueChange={(newLanguage: string) => {
        const validLang = newLanguage as SupportedLanguage

        if (languageClient) {
          languageClient.dispose()
          setLanguageClient(null)
        }

        const serverConfig = SUPPORTED_LANGUAGE_SERVERS.find(s => s.id === validLang)
        if (serverConfig) {
          connectToLanguageServer(serverConfig);
        }

        setLanguage(validLang)
      }}
    >
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
