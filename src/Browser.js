import React, { Component } from 'react';
import SearchField from './SearchField.js';

class Browser extends Component {
	render(){
		return (
			<div className="main">
				<h2>Now showing {this.props.breed} pictures.</h2>
				<SearchField breed={this.props.breed} filterBreeds={this.props.filterBreeds}></SearchField>
				<div className="breed-listing">
					{this.props.breeds}
				</div>
			</div>
		);
	}
}

export default Browser;