import $ from 'jquery';

	var exports = {}

	var domain = "https://dog.ceo/api/",
		$http =  $.get,
		counter = 0;


 	function getBreeds(){
 		return _http("breeds/list/all", {}).then((response) => {
 			return response.message;
 		});
 	}

 	function getRandomImage(){
 		return _http(`breeds/image/random?=${counter++}`, {}).then((response) => {
 			return response.message;
 		});
 	}

 	function getRandomBreedImage(breed){
 		return _http(`breed/${breed}/images/random`, {}).then((response) =>{
 			return response.message;
 		});
 	}

 	function getBreedImages(breed){
 		return _http(`breed/${breed}/images`, {}).then((response) => {
 			return response.message;
 		});
 	}

 	function _http(endpoint, params){
 		return $http(domain + endpoint, {params:params}, (response) =>{
 			return response;
 		});
 	}

 	function getRandomImages(howMany){
 		return new Promise(function(resolve, reject){
 			_getImage(howMany, []);

	 		function _getImage(howMany, promises){
		 		if (howMany--){
					promises.push(getRandomImage());
					setTimeout(_getImage(howMany, promises), 250);
				} else {
					Promise.all(promises).then(function(response){
						resolve(response);
					});
				}
		 	}
		});
 	}

 	exports.getBreeds = getBreeds;
 	exports.getRandomImage = getRandomImage;
 	exports.getRandomImages = getRandomImages;
 	exports.getBreedImages = getBreedImages;
 	exports.getRandomBreedImage = getRandomBreedImage;

 	export default exports;

