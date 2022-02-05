import { createApp } from 'vue';
import SimpleVueIcon from 'simple-vue-icon';
import App from './app.vue';
import './tailwind.css';
import { router } from '~/router';

const app = createApp(App);
app.use(SimpleVueIcon);
app.use(router);
app.mount('#app');
