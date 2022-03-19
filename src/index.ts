import App from '@/classApp';
import IndexRoute from '@routes/index.route';
import ProfileRoute from '@routes/profile.routes';

const app = new App([new IndexRoute(), new ProfileRoute()]);

app.listen();
