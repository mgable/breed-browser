import React from 'react'
import {
  Link
} from 'react-router-dom'

import $ from "jquery";

class Nav extends React.Component{

  constructor(props){
    super(props);
    this.clickHandler = this.close.bind(this);
  }


  close(evt){
    var target = $("#navbarResponsive")
    
    if (target.hasClass('show')){
       target.removeClass('show');
    }
   
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">Breed Browser <small>powered by</small> <img src="index.svg" alt="logo" className="App-logo" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto" onClick={this.close}>
              <li className="nav-item"><Link className="nav-link" to="/">Breeds</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/quiz">Quiz</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;