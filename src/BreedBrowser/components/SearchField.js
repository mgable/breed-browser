import React, { Component } from 'react';

// using 'class' not 'const' on purpose
class SearchField extends Component {
	constructor(props) {
		super(props);
		this.state = {breed: props.breed, fieldName: 'search', field: null};
		this.clearSearch = this.clearSearch.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(){
		var field = document.getElementById(this.state.fieldName);
		this.setState({field})
	}

	handleChange(event) {
		var value = event.target.value;
		this.setState({breed: value});
		this.props.onFilterBreeds(value);
	}

	clearSearch(){
		this.state.field.focus();
		this.setState({breed: ""});
		this.props.onFilterBreeds("");
	}

	render() {
		return (
			<div className="search-wrapper">
				<form>
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