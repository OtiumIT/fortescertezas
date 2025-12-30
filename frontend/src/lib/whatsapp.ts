/**
 * Gera URL do WhatsApp com mensagem pré-formatada
 */
export function getWhatsAppUrl(phoneNumber: string, message?: string): string {
  const defaultMessage = 'Olá, gostaria de saber mais sobre os serviços da Fortes Certezas.';
  const whatsappMessage = message || defaultMessage;
  
  // Garantir que o número tenha código do país (351 para Portugal)
  const phone = phoneNumber.startsWith('351') 
    ? phoneNumber 
    : `351${phoneNumber}`;
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
}
