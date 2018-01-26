import React, { Component } from 'react';
import './LineItem.css';

class LineItem extends Component{
	constructor(props) {
		super(props);
		this.state = {breeds: props.breeds};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		// console.info(event.target);
		if (event){
			event.preventDefault();
			event.stopPropagation();
		}
		this.props.setBreed(event.target.textContent);
	}

	render(){

		return (
			<ul>
				{this.props.breeds.map((breed) => {
					if (breed.subbreeds && breed.subbreeds.length){
						return ( <li onClick={(event) => this.props.setBreed(breed.name, event)} key={breed.name}>{breed.name}
							<LineItem breeds={breed.subbreeds} setBreed={(evt) => this.props.setBreed(evt, breed.name)}></LineItem>
							</li>
						)
					} else {
						return <li onClick={this.handleClick} key={breed.name || breed}>{breed.name || breed}</li>
					}
				})}
			</ul>
		);
	}
}

export default LineItem;