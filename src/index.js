import { bootstrap } from 'redux-bootstrap';

import { routes } from './routes';
import { uploader } from './reducers/uploader';
import { filter } from './reducers/filter';

bootstrap({
  reducers: {
    uploader,
    filter
  },
  routes
});
