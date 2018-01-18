import React from 'react'
import {
  Route, Link
} from 'react-router-dom';

import BreedBrowser from './BreedBrowser.js';
import Quiz from './quiz/Quiz.js';


class BasicDisplay extends React.Component{
  render() {
   return (
      <section className="py-5">
        <div className="container">
          <Route exact path="/" component={BreedBrowser}/>
          <Route path="/about" component={About}/>
          <Route path="/quiz" component={Quiz}/>
        </div>
      </section>
    );
  }
}

const About = () => (
  <div className="container">
    <h2>About</h2>
  </div>
)

// const Quiz = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

const Topic = ({ match }) => (
  <div className="container">
    <h3>{match.params.topicId}</h3>
  </div>
)


export default BasicDisplay;