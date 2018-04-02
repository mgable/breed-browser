import React from 'react'
import Slick from "./Slick.js";
import Browser from './Browser.js';
import SearchField from './SearchField.js';

const Layout = ({images, breed, sub, breeds, onChoiceClick, onFilterBreeds, onClearFilter}) => {
	return (
		<div className="App">
			<Slick images={images}></Slick>
			<div className="main">
				<h2>Now showing {sub} {breed} pictures.</h2>
				<SearchField breed={breed} onFilterBreeds={onFilterBreeds} onClearFilter={onClearFilter}></SearchField>
				<Browser sub={sub} breed={breed} breeds={breeds} onChoiceClick={onChoiceClick}></Browser>
			</div>
		</div>
	);
}
 
export default Layout
