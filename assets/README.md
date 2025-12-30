# Assets - Fortes Certezas

## Estrutura de Pastas

```
assets/
├── logos/
│   ├── original/          # Logos originais capturados do site atual
│   │   ├── fortes certezas 2017 sf sletras_1.png  (Logo header)
│   │   ├── fortes certezas 2017 sf sletras.png    (Logo completo)
│   │   └── object1316453987.png                    (Favicon)
│   ├── variants/          # Variantes do logo (se necessário no futuro)
│   └── README.md          # Documentação dos logos
│
└── branding/
    ├── IDENTIDADE_VISUAL.md    # Documentação completa da identidade visual
    ├── cores.json              # Paleta de cores em JSON
    ├── cores.css               # Variáveis CSS com as cores
    └── README.md               # Este arquivo
```

## ✅ Logos Capturados

Todos os logos foram capturados do site atual (www.fortescertezas.pt) em 30/12/2025:

1. **Logo Header** - Versão simplificada para navegação (99px de altura)
2. **Logo Completo** - Versão completa para footer e materiais
3. **Favicon** - Ícone do site

## 🎨 Identidade Visual Documentada

### Cores Principais
- **Vermelho**: `#e40000` - Cor principal da marca
- **Laranja**: `#f88306` - Cor secundária
- **Texto**: `#777777` - Cor do texto principal

### Tipografia
- **Fonte**: Arvo, Arial, Helvetica, 'Liberation Sans', FreeSans, sans-serif
- **Tamanhos**: 12px a 30px conforme hierarquia

## ⚠️ IMPORTANTE

**A identidade visual atual NÃO PODE SER ALTERADA** sem autorização, pois:
- É usada em uniformes dos funcionários
- Está estabelecida em materiais oficiais
- Faz parte da marca consolidada da empresa

## Uso no Desenvolvimento

### CSS/Tailwind
Use as variáveis CSS definidas em `branding/cores.css`:
```css
@import '../assets/branding/cores.css';

.titulo {
  color: var(--fc-vermelho-primario);
  font-family: var(--fc-fonte-familia);
}
```

### JSON/Config
Importe as cores de `branding/cores.json` para configurações:
```json
{
  "cores": {
    "primaria": "#e40000",
    "secundaria": "#f88306"
  }
}
```

### Logos
Use os logos de `logos/original/` conforme necessário:
- Header: `fortes certezas 2017 sf sletras_1.png` (altura: 99px)
- Footer: `fortes certezas 2017 sf sletras.png`
- Favicon: `object1316453987.png`

## Documentação Completa

- **Identidade Visual**: `branding/IDENTIDADE_VISUAL.md`
- **Logos**: `logos/README.md`

---

**Status**: ✅ Completo  
**Data**: 30/12/2025  
**Fonte**: www.fortescertezas.pt
