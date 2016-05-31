'use strict';

const koa = require('koa');
const flow = require('co-flow');
const views = require('co-views');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');

if (!process.env.NODE_ENV) {
	throw new Error('Envionrment variable NODE_ENV not defined. Look in README for howto');
}

global.__DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
global.__TEST__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'testing';
global.__STAGING__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'staging',
global.__PROD__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';

const React = require('react');
const ReactDOM = require('react-dom/server');
const IntlProvider = require('react-intl').IntlProvider;
const match = require('react-router').match;
const RouterContext = require('react-router').RouterContext;
const Provider = require('react-redux').Provider;
const routes = require('./routes').default;
const create = require('./redux/create').default;

let app = koa();
let render = views(path.join(__dirname, 'views'), { ext: 'ejs' });

app.use(logger());
app.use(serve(path.join(__dirname, '../dist')));
app.use(function *() {
	let self = this;

	let store = create({});
	let locale = 'en-US';

	const messages = require(`./intl/${locale}`);

	const renderProps = yield new Promise((resolve, reject) => {
		match({ routes, location: self.request.url }, (error, redirectLocation, renderProps) => {
			if (error) {
				self.throw(error.message, 500);
			} else if (redirectLocation) {
				self.redirect(redirectLocation);
			} else {
				resolve(renderProps);
			}
		});
	});

	yield flow.all(renderProps.components.map(component => {
		// Will only check for container components that are connected to redux.
		if (component.WrappedComponent && component.WrappedComponent.prepare) {
			return component.WrappedComponent.prepare(store);
		} else {
			return null;
		}
	}).filter(component => component !== null));

	let content = ReactDOM.renderToString(
		React.createElement(IntlProvider, { locale: locale, messages: messages },
			React.createElement(Provider, { store: store },
				React.createElement('div', {},
					React.createElement(RouterContext, renderProps)
				)
			)
		)
	);

	const context = {
		store: store.getState(),
		locale: locale,
		messages: messages
	};

	this.body = yield render('index', {
		title: 'React-Redux-Webpack-Docker',
		context: JSON.stringify(context),
		content: content
	});
});

app.listen(3000);

console.log(`Listening on ${port}`);

