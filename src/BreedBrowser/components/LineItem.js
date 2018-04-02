import React from 'react';
import './LineItem.css';

const LineItem = ({breeds, parent, onChoiceClick}) => {

	return (
		<ul>
			{breeds.map((breed) => {
				if (breed.subbreeds && breed.subbreeds.length){
					return ( <li onClick={(event) => onChoiceClick(breed.name, null, event)} key={breed.name}>{breed.name}
						<LineItem breeds={breed.subbreeds} onChoiceClick={onChoiceClick} parent={breed.name}></LineItem>
						</li>
					)
				} else {
					return <li onClick={(event) => onChoiceClick((parent || breed.name), (parent ? breed : null), event)} key={breed.name || breed}>{breed.name || breed}</li>
				}
			})}
		</ul>
	);
}

export default LineItem;