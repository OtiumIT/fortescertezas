function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function processInlineMarkdown(text: string): string {
  // First escape HTML
  let result = escapeHtml(text);
  
  // Process bold (**text**) first - this takes priority
  // Use a more specific pattern to avoid conflicts
  result = result.replace(/\*\*([^*\n]+?)\*\*/g, (match, content) => {
    // Skip if already processed or empty
    if (!content.trim() || 
        content.includes('<strong') || 
        content.includes('</strong>') ||
        content.includes('<em') || 
        content.includes('</em>')) {
      return match;
    }
    return `<strong class="font-bold text-neutral-900">${content}</strong>`;
  });
  
  // Process bold (__text__)
  result = result.replace(/__([^_\n]+?)__/g, (match, content) => {
    if (!content.trim() || 
        content.includes('<strong') || 
        content.includes('</strong>') ||
        content.includes('<em') || 
        content.includes('</em>')) {
      return match;
    }
    return `<strong class="font-bold text-neutral-900">${content}</strong>`;
  });
  
  // Process italic (*text*) - only match single asterisks that aren't part of **
  // We'll match *text* and then check if it's not inside a strong tag
  result = result.replace(/\*([^*\n]+?)\*/g, (match, content, offset, fullText) => {
    // Skip if already processed
    if (!content.trim() || 
        content.includes('<strong') || 
        content.includes('</strong>') ||
        content.includes('<em') || 
        content.includes('</em>')) {
      return match;
    }
    
    // Check if this match is inside a strong tag by looking at surrounding context
    const contextStart = Math.max(0, offset - 20);
    const contextEnd = Math.min(fullText.length, offset + match.length + 20);
    const context = fullText.substring(contextStart, contextEnd);
    
    // If we see <strong nearby, this might be inside a tag, skip
    if (context.includes('<strong') && !context.includes('</strong>')) {
      return match;
    }
    
    // Check if this is actually **text** (double asterisk) - look at chars before/after
    const charBefore = offset > 0 ? fullText[offset - 1] : '';
    const charAfter = offset + match.length < fullText.length ? fullText[offset + match.length] : '';
    
    // If there's a * before or after, it's part of **, skip
    if (charBefore === '*' || charAfter === '*') {
      return match;
    }
    
    return `<em class="italic">${content}</em>`;
  });
  
  // Process italic (_text_) - only match single underscores that aren't part of __
  result = result.replace(/_([^_\n]+?)_/g, (match, content, offset, fullText) => {
    // Skip if already processed
    if (!content.trim() || 
        content.includes('<strong') || 
        content.includes('</strong>') ||
        content.includes('<em') || 
        content.includes('</em>')) {
      return match;
    }
    
    // Check context
    const contextStart = Math.max(0, offset - 20);
    const contextEnd = Math.min(fullText.length, offset + match.length + 20);
    const context = fullText.substring(contextStart, contextEnd);
    
    if (context.includes('<strong') && !context.includes('</strong>')) {
      return match;
    }
    
    // Check if this is actually __text__ (double underscore)
    const charBefore = offset > 0 ? fullText[offset - 1] : '';
    const charAfter = offset + match.length < fullText.length ? fullText[offset + match.length] : '';
    
    if (charBefore === '_' || charAfter === '_') {
      return match;
    }
    
    return `<em class="italic">${content}</em>`;
  });
  
  return result;
}

export function parseMarkdownToHTML(markdown: string): string {
  const lines = markdown.split('\n');
  const html: string[] = [];
  let inList = false;
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === '') {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        html.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    // Headers
    if (trimmed.startsWith('# ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        html.push('</p>');
        inParagraph = false;
      }
      const headerText = processInlineMarkdown(trimmed.substring(2));
      html.push(`<h1 class="text-3xl font-bold text-neutral-900 mt-8 mb-4">${headerText}</h1>`);
      continue;
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        html.push('</p>');
        inParagraph = false;
      }
      const headerText = processInlineMarkdown(trimmed.substring(3));
      html.push(`<h2 class="text-2xl font-bold text-neutral-900 mt-8 mb-4">${headerText}</h2>`);
      continue;
    }

    if (trimmed.startsWith('### ')) {
      if (inList) {
        html.push('</ul>');
        inList = false;
      }
      if (inParagraph) {
        html.push('</p>');
        inParagraph = false;
      }
      const headerText = processInlineMarkdown(trimmed.substring(4));
      html.push(`<h3 class="text-xl font-semibold text-neutral-900 mt-6 mb-3">${headerText}</h3>`);
      continue;
    }

    // Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (inParagraph) {
        html.push('</p>');
        inParagraph = false;
      }
      if (!inList) {
        html.push('<ul class="list-disc list-inside space-y-2 mb-4 ml-4">');
        inList = true;
      }
      const listItemText = processInlineMarkdown(trimmed.substring(2));
      html.push(`<li class="text-neutral-700">${listItemText}</li>`);
      continue;
    }

    // Regular paragraph
    if (inList) {
      html.push('</ul>');
      inList = false;
    }

    if (!inParagraph) {
      html.push('<p class="mb-4 text-neutral-700 leading-relaxed">');
      inParagraph = true;
    } else {
      html.push(' ');
    }
    
    // Process inline markdown (bold, italic, etc.)
    const processedLine = processInlineMarkdown(trimmed);
    html.push(processedLine);
  }

  if (inList) {
    html.push('</ul>');
  }
  if (inParagraph) {
    html.push('</p>');
  }

  return html.join('');
}
