import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
	static prepare(store) {
		return store.dispatch(fetch('dashboard', Dashboard.getQuery().main, { locale: 'en-US' })).then(() => {
			let promises = [
				// store.dispatch(fetch('latest', FeedItemList.getQuery(), {
				// 	...defaults
				// }))
			];

			return Promise.all(promises);
	}

	render() {
		return (
			<div>
				<div className="row align-center">
					<p>
						Hello World
					</p>
				</div>
			</div>
		);
	}
}

export default connect(
	(state, ownProps) => {
		return {
		};
	}
)(Home);




