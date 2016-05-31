import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { IntlProvider, addLocaleData } from 'react-intl';
import create from './redux/create';
import routes from './routes.js';

// addLocaleData(localeData);

let store = create(context.store);

class Root extends Component {
	render() {
		return (
			<IntlProvider locale={context.locale} messages={context.messages} >
				<Provider store={store}>
					<div>
						<Router history={browserHistory} routes={routes} />
						{this.props.children}
					</div>
				</Provider>
			</IntlProvider>
		);
	}
}

render(
	<Root />,
	document.getElementById('content')
);

if (__DEV__) {
	const DevTools = require('./containers/devtools').default;
	render(
		<Root>
			<DevTools />
		</Root>,
		document.getElementById('content')
	);
}

