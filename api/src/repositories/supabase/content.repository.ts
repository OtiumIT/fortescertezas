import { getSupabaseClient } from '../../lib/supabase.js';
import { env } from '../../config/env.js';
import { createClient } from '@supabase/supabase-js';
import type { SiteContent } from '../../types/content.types.js';

const CONTENT_ID = 'main';

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('id', CONTENT_ID)
    .single();

  if (error) {
    // Se não existe, retorna dados padrão
    if (error.code === 'PGRST116') {
      return getDefaultContent();
    }
    throw new Error(`Failed to fetch site content: ${error.message}`);
  }

  return data.content as SiteContent;
}

export async function updateSiteContent(
  section: keyof SiteContent,
  data: Partial<SiteContent[keyof SiteContent]>
): Promise<SiteContent> {
  console.log('[content] Atualizando seção:', section);
  console.log('[content] Dados recebidos:', JSON.stringify(data, null, 2).substring(0, 500));
  
  // Usa SERVICE_KEY se disponível para bypassar RLS, senão usa ANON_KEY
  const supabaseKey = env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY;
  if (!env.SUPABASE_URL || !supabaseKey) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY ou SUPABASE_SERVICE_KEY.');
  }
  
  // Cria cliente com SERVICE_KEY para ter permissões completas (bypassa RLS)
  const supabase = createClient(env.SUPABASE_URL, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
  
  if (env.SUPABASE_SERVICE_KEY) {
    console.log('[content] Usando SUPABASE_SERVICE_KEY (bypassa RLS)');
  } else {
    console.warn('[content] Usando SUPABASE_ANON_KEY - pode precisar de políticas RLS configuradas');
  }
  
  const current = await getSiteContent();
  
  console.log('[content] Conteúdo atual carregado');
  
  // Atualiza a seção específica
  const sectionData = current[section];
  if (sectionData && typeof sectionData === 'object' && !Array.isArray(sectionData)) {
    // Se é um objeto, faz merge
    (current as any)[section] = { ...sectionData, ...data };
  } else {
    // Se é array ou outro tipo, substitui completamente
    (current as any)[section] = data;
  }

  console.log('[content] Conteúdo atualizado, fazendo upsert no Supabase...');
  console.log('[content] Tamanho do JSON:', JSON.stringify(current).length, 'bytes');

  const { data: upsertData, error } = await supabase
    .from('site_content')
    .upsert({
      id: CONTENT_ID,
      content: current,
      updated_at: new Date().toISOString(),
    })
    .select();

  if (error) {
    console.error('[content] Erro ao fazer upsert:', error);
    console.error('[content] Código do erro:', error.code);
    console.error('[content] Mensagem:', error.message);
    console.error('[content] Detalhes:', error.details);
    throw new Error(`Failed to update site content: ${error.message} (code: ${error.code})`);
  }

  console.log('[content] Conteúdo atualizado com sucesso');
  return current;
}

function getDefaultContent(): SiteContent {
  return {
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
  };
}
