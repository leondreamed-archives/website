import { createApp } from 'vue';
import SimpleVueIcon from 'simple-vue-icon';
import App from './app.vue';
import { router } from '~/router';
import 'virtual:windi.css';

const app = createApp(App);
app.use(SimpleVueIcon);
app.use(router);
app.mount('#app');
