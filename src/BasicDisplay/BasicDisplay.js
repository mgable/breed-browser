import React from 'react'
import {Route} from 'react-router-dom';
import About from '../About/About.js';
import BreedBrowser from '../BreedBrowser/BreedBrowser.js';
import Quiz from '../Quiz/Quiz.js';
import './BasicDisplay.css';


class BasicDisplay extends React.Component{

  render() {
     return (
        <section className="py-5">
          <div className="container">
            <Route exact path="/" component={BreedBrowser} />
            <Route path="/about" component={About} />
            <Route path="/quiz" component={Quiz} />
          </div>
        </section>
      );
  }
}

export default BasicDisplay;