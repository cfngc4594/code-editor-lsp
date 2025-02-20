import { SUPPORTED_LANGUAGES } from "@/constants/language";
import { SUPPORTED_THEMES } from "@/constants/theme";
import { createHighlighter, Highlighter } from "shiki";

let highlighter: Highlighter;

async function initializeHighlighter() {
  highlighter = await createHighlighter({
    themes: SUPPORTED_THEMES.map(theme => theme.id),
    langs: SUPPORTED_LANGUAGES.map(lang => lang.id)
  });
}

initializeHighlighter();

export { highlighter };
