import { connect } from 'react-redux';
import { selectBreed, filterBreeds, GetBreedImages } from '../actions';
import Layout from './components/Layout.jsx';

const getBreed = (state) => {
	return state.breedbrowser.breed;
}

const getBreeds = (state) => {
	return state.breedbrowser.breeds;
}

const getSubBreed = (state) => {
	return state.breedbrowser.sub;
}

const getImages = (state) => {
	return state.breedbrowser.images;
}

const mapStateToProps = state => {
	return {
		images: getImages(state),
		breed: getBreed(state),
		sub: getSubBreed(state),
		breeds: getBreeds(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onChoiceClick: (breed, sub, event) => {
			if (event){
				event.preventDefault();
				event.stopPropagation();
			}

			GetBreedImages(breed, sub).then((response) => {
				let images = response.message.slice(0, response.length);
				dispatch(selectBreed(breed, sub, images));
			}, (error) => {

			})
			
		},
		onFilterBreeds: (term) => {
			dispatch(filterBreeds(term))
		}
	}
}


const BreedBrowser = connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout)


export default BreedBrowser