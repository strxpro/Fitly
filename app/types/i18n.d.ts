declare module '../config/i18n' {
  const i18n: {
    t: (key: string) => string;
    locale: string;
    enableFallback: boolean;
    defaultLocale: string;
  };
  export default i18n;
} 