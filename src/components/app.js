import React, { Component } from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="callout title-header text-center">
					<h2><FormattedMessage id="app.title" /></h2>
				</div>
				{this.props.children}
				<div className="row">
					<div className="column text-center">
						<FormattedHTMLMessage id="app.footer"/>
					</div>
				</div>
			</div>
		);
	}
}

