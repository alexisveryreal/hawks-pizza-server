import App from '@/classApp';
import IndexRoute from '@routes/index.route';

const app = new App([new IndexRoute()]);

app.listen();
