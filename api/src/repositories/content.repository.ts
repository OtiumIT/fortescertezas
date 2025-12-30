import { readJsonFile, writeJsonFile } from '../lib/json-storage.js';
import type { SiteContent } from '../types/content.types.js';

const CONTENT_FILE = 'site-content.json';

export async function getSiteContent(): Promise<SiteContent> {
  return readJsonFile<SiteContent>(CONTENT_FILE, {
    createIfNotExists: true,
    defaultData: {
      homepage: {
        heroes: [
          {
            title: 'FORTES CERTEZAS',
            subtitle: 'Supervisão | Portarias | Condomínios',
            description: 'Mais de 20 anos de experiência em serviços de portaria e controlo de acessos',
            ctaText: 'Solicitar Orçamento',
            ctaLink: '/contacto',
            backgroundImage: '/images/hero-image.jpg',
          },
        ],
        about: {
          title: 'Sobre Nós',
          description: 'A Fortes Certezas, Unip. nasceu com o objetivo de criar uma empresa especializada...',
        },
        highlights: [],
      },
      about: {
        history: {
          title: 'Nossa História',
          content: 'A Fortes Certezas, Unipessoal nasceu com o objetivo de criar uma empresa especializada...',
        },
        mission: 'Criar uma empresa especializada em serviços de portaria e controlo de acessos...',
        vision: 'Destacar-se na área, oferecendo propostas equilibradas e ajustadas aos seus clientes.',
        values: [],
      },
      contact: {
        title: 'Contacte-nos',
        description: 'Utilize o formulário abaixo indicado para entrar em contacto connosco.',
        phone: '96 531 00 89',
        email: 'geral@fortescertezas.pt',
        address: {
          street: 'Rua Álvaro Castelões, 571, Loja 22',
          city: '4450-042 Matosinhos',
          location: 'Centro Comercial Alameda',
        },
        whatsapp: '965310089',
        businessHours: 'Segunda a Sexta: 9h - 18h',
      },
      privacy: {
        content: 'Conteúdo da política de privacidade...',
      },
      seo: {
        metaDescription: 'Fortes Certezas - Serviços de Portaria e Controlo de Acessos em Matosinhos',
        metaKeywords: 'portaria, controlo de acessos, segurança, Matosinhos, Porto',
      },
      branding: {
        logo: {
          header: '/logos/fortes certezas 2017 sf sletras_1.png',
          footer: '/logos/fortes certezas 2017 sf sletras.png',
          favicon: '/logos/object1316453987.png',
        },
        colors: {
          primary: '#e40000',
          secondary: '#f88306',
          textPrimary: '#777777',
          textDark: '#000000',
          textLight: '#ffffff',
          backgroundLight: '#ffffff',
          backgroundDark: '#000000',
        },
        typography: {
          fontFamily: "Arvo, Arial, Helvetica, 'Liberation Sans', FreeSans, sans-serif",
          titleLarge: '30px',
          titleMedium: '25px',
          titleSmall: '20px',
          bodyText: '14px',
          smallText: '12px',
        },
      },
    },
  });
}

export async function updateSiteContent(
  section: keyof SiteContent,
  data: Partial<SiteContent[keyof SiteContent]>
): Promise<SiteContent> {
  const content = await getSiteContent();
  const sectionData = content[section];
  if (sectionData && typeof sectionData === 'object' && !Array.isArray(sectionData)) {
    (content as any)[section] = { ...sectionData, ...data };
  } else {
    (content as any)[section] = data;
  }
  await writeJsonFile(CONTENT_FILE, content);
  return content;
}
