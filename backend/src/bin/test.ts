import 'dotenv/config.js';
import { getGithubData } from '~/utils/update/github.js';

console.log(await getGithubData());
