import { join } from 'desm';
import onetime from 'onetime';

export const getRootPath = onetime(() => join(import.meta.url, '../../..'));
