'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import { translations, TranslationKey } from '@/lib/translations'

type Language = 'en' | 'hi' | 'te'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('chaiid-lang') as Language | null
    if (savedLanguage && ['en', 'hi', 'te'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])
  
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('chaiid-lang', lang);
  }

  const t = useCallback((key: TranslationKey): string => {
    return translations[language][key] || translations['en'][key] || key
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
