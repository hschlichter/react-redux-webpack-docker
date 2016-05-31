import React from 'react';
import { Route, IndexRoute, NotFoundRoute } from 'react-router';

import App from './components/app';
import Home from './containers/home';
import NotFound from './components/notfound';

export default (
	<Route path="/" component={App}>
		<IndexRoute name="Home" component={Home} />
		<Route path="*" component={NotFound} />
	</Route>
);

