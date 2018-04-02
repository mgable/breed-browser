import React, { Component } from 'react';

// using 'class' not 'const' on purpose
class SearchField extends Component {
	constructor(props) {
		super(props);
		this.state = {breed: props.breed};
		this.clearSearch = this.clearSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		console.info("fitlering");
		var value = event.target.value;
		this.setState({breed: value});
		this.props.onFilterBreeds(value);
	}

	clearSearch(){
		console.info("clear search");
		this.setState({breed: ""});
		this.props.onFilterBreeds("");
	}

	render() {
		return (
			<div className="search-wrapper">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="search">Search breeds:&nbsp;
						<input type="text" name="focus" required className="search-box search" onChange={this.handleChange} id="search" value={this.state.breed} placeholder="search" />
						<button onClick={this.clearSearch} className="close-icon" type="reset" />
					</label>
				</form>
			</div>
		);
	}
}

export default SearchField;