import React from 'react'
import {
  Link
} from 'react-router-dom'

class Nav extends React.Component{

  doIt(evt){
    console.info("doing it");
    console.info(evt);
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
            <ul className="navbar-nav ml-auto" onClick={this.doIt}>
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/topics">Topics</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;