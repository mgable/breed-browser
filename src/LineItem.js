import React, { Component } from 'react';

class LineItem extends Component{
	constructor(props) {
		super(props);
		this.state = {breeds: props.breeds};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		this.props.setBreed(event.target.textContent);
	}

	render(){
		return (
			<ul>
				{this.props.breeds.map((breed) => {
					return <li onClick={this.handleClick} key={breed.name}>{breed.name}</li>
				})}
			</ul>
		);
	}
}

export default LineItem;