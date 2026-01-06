# Proposta Comercial - Fortes Certezas

Site HTML estático premium de proposta comercial com estrutura narrativa (storytelling) que apresenta a empresa, desafios, solução desenvolvida e investimento de forma profissional e envolvente.

## Estrutura

```
proposta-comercial/
├── index.html              # Página principal com todas as 13 seções
├── css/
│   ├── style.css          # Estilos principais com branding Fortes Certezas
│   └── animations.css     # Animações e transições
├── js/
│   ├── main.js            # JavaScript principal (menu, formulário, etc)
│   └── scroll.js          # Controle de scroll e animações
├── images/
│   ├── screenshots/       # Screenshots do projeto (adicionar quando disponíveis)
│   └── icons/            # Ícones (se necessário)
└── assets/
    └── logos/            # Logos da Fortes Certezas (link simbólico)
```

## Seções da Narrativa

1. **Hero Section** - "Uma Empresa que Cresceu"
2. **Quem Somos** - "Orgulho e Tradição"
3. **Situação Atual** - "O Que Temos Hoje"
4. **Os Desafios** - "Quando o Crescimento Traz Complexidade"
5. **A Solução Básica** - "Fundação Digital Sólida" (2.000€)
6. **A Solução Completa** - "Onde Está o Verdadeiro Valor" (5.000€)
7. **O Projeto Desenvolvido** - "Veja o Que Criamos"
8. **Demonstração das Funcionalidades Avançadas** - "O Sistema que Resolve os Desafios Reais"
9. **Benefícios** - "Como Isso Transforma Seu Negócio"
10. **Investimento** - "Escolha o Pacote Ideal para Você"
11. **Destrinchando os Valores** - "Transparência e Justiça no Investimento"
12. **Novas Necessidades Tecnológicas** - "Vamos Além"
13. **Próximos Passos** - "Vamos Começar?"

## Características

### Design
- Branding da Fortes Certezas (cores vermelho #e40000 e laranja #f88306)
- Tipografia Arvo (mesma do site atual)
- Design responsivo mobile-first
- Animações suaves ao scroll

### Funcionalidades
- Navegação fixa com scroll suave
- Menu mobile responsivo
- Animações fade-in ao scroll
- Barra de progresso de scroll
- Formulário de contato funcional
- Botão scroll-to-top

### Tecnologias
- HTML5 semântico
- CSS3 puro (sem frameworks)
- JavaScript vanilla
- Google Fonts (Arvo)

## Como Usar

1. Abra `index.html` em um navegador moderno
2. Para desenvolvimento local, use um servidor HTTP simples:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js (com http-server)
   npx http-server
   ```

## Personalização

### Adicionar Screenshots
Coloque screenshots do projeto em `images/screenshots/` e atualize os placeholders no HTML.

### Modificar Cores
As cores estão definidas como variáveis CSS em `css/style.css`:
```css
:root {
    --fc-red: #e40000;
    --fc-orange: #f88306;
    /* ... */
}
```

### Ajustar Conteúdo
Todo o conteúdo está no `index.html`. Procure pelas seções específicas e ajuste conforme necessário.

## Próximos Passos

1. Adicionar screenshots reais do projeto desenvolvido
2. Integrar formulário de contato com backend (atualmente apenas validação frontend)
3. Adicionar imagens de fundo no hero (opcional)
4. Testar em diferentes navegadores e dispositivos
5. Otimizar imagens antes do deploy

## Notas

- O formulário de contato atualmente apenas valida e mostra mensagem. Para produção, integrar com API/backend.
- Os placeholders de screenshots devem ser substituídos por imagens reais.
- Todas as animações são otimizadas para performance.

## Suporte

Para questões ou ajustes, consulte o plano original em `.cursor/plans/`.
