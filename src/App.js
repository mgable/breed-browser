import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import BasicDisplay from './BasicDisplay.js';
import Nav from './Nav.js';
import Footer from './Footer/Footer.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class App extends Component {
	render(){
		return (
			<Router>
				<div>
					<Nav />
					<BasicDisplay />
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;