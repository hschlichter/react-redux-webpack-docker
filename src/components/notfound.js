import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="column text-center">
						<h3><FormattedMessage id="app.notfound"/></h3>
					</div>
				</div>
			</div>
		);
	}
}

