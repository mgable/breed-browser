import { connect } from 'react-redux';
import { selectBreed, GetBreedImages } from '../actions';
import Layout from './components/Layout.jsx';
import _ from 'underscore';

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
			console.info("I have made a selection of");
			console.info(breed, sub);
			GetBreedImages(breed, sub).then((response) => {
				let images = _.map(response, (image) => {
					return image.message;
				});
				dispatch(selectBreed(breed, sub, images));
			}, (error) => {

			})
			
		}
	}
}


const BreedBrowser = connect(
	mapStateToProps,
	mapDispatchToProps
)(Layout)


export default BreedBrowser