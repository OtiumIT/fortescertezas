import { getSiteContent, updateSiteContent } from '../repositories/content.repository.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { SiteContent } from '../types/content.types.js';

export async function getContent(section?: keyof SiteContent): Promise<SiteContent | SiteContent[keyof SiteContent]> {
  const content = await getSiteContent();

  if (section) {
    return content[section];
  }

  return content;
}

export async function updateContent(
  section: keyof SiteContent,
  data: Partial<SiteContent[keyof SiteContent]>
): Promise<SiteContent> {
  if (!section) {
    throw new AppError('Seção não especificada', HTTP_STATUS.BAD_REQUEST, 'INVALID_SECTION');
  }

  return updateSiteContent(section, data);
}
