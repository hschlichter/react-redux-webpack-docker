import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';

import reducer from './modules';

export default function create(initialState) {
	let newInitialState = {};
	for (const key in initialState) {
		newInitialState[key] = Immutable.fromJS(initialState[key]);
	}

	let finalCreateStore = compose(
		applyMiddleware(
			thunkMiddleware
		)
	)(createStore);

	if (__DEV__) {
		const DevTools = require('../containers/devtools').default;
		finalCreateStore = compose(
			applyMiddleware(
				thunkMiddleware
			),
			DevTools.instrument()
		)(createStore);
	}

	const store = finalCreateStore(reducer, newInitialState);

	return store;
}
