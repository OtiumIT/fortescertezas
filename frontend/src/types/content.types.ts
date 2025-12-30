export interface HomepageHero {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface HomepageAbout {
  title: string;
  description: string;
}

export interface Highlight {
  title: string;
  description: string;
  icon: string;
}

export interface HomepageContent {
  heroes: HomepageHero[]; // Array de até 3 heroes
  hero?: HomepageHero; // Compatibilidade com formato antigo
  about: HomepageAbout;
  highlights: Highlight[];
}

export interface AboutHistory {
  title: string;
  content: string;
}

export interface Value {
  name: string;
  description: string;
  icon?: string;
}

export interface AboutContent {
  history: AboutHistory;
  mission: string;
  vision: string;
  values: Value[];
}

export interface ContactAddress {
  street: string;
  city: string;
  location: string;
}

export interface ContactContent {
  title: string;
  description: string;
  phone: string;
  email: string;
  address: ContactAddress;
  whatsapp: string;
  businessHours: string;
}

export interface SeoContent {
  metaDescription: string;
  metaKeywords: string;
}

export interface BrandingContent {
  logo: {
    header: string;
    footer: string;
    favicon: string;
  };
  colors: {
    primary: string;
    secondary: string;
    textPrimary: string;
    textDark: string;
    textLight: string;
    backgroundLight: string;
    backgroundDark: string;
  };
  typography: {
    fontFamily: string;
    titleLarge: string;
    titleMedium: string;
    titleSmall: string;
    bodyText: string;
    smallText: string;
  };
}

export interface PrivacyContent {
  content: string;
}

export interface SiteContent {
  homepage: HomepageContent;
  about: AboutContent;
  contact: ContactContent;
  privacy: PrivacyContent;
  seo: SeoContent;
  branding: BrandingContent;
}
