import React, { Component} from 'react';
import './Header.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// components
import Form from '../form/Form';
import ToBuy from '../toBuy/ToBuy';

class Header extends Component {
   constructor() {
      super();
      this.state = ({
         isHidden: true
      })
   }
   handleAlert = (e) => {
      this.setState({
         isHidden: !this.state.isComplete
      })
   }
   render(){
      return (
         <Router>
               <header>
                  <div className="wrapper">
                     <h1>The Food Locker</h1>
                     <nav>
                        <ul className="navContainer">
                           <li className="navLink left">
                              <Link to="/Form"><li>New Grocery Item</li></Link>
                           </li>
                           <li className="navLink middle">
                              <Link to="/"><li>Clear</li></Link>        
                           </li>
                           <li className="navLink right">
                              <Link to="/ToBuy"><li>View Grocery List</li></Link>
                           </li>
                        </ul>
                        <section className="display">
                           <div className="wrapper displayContainer">
                              <Route path="/Form" render={() => <Form addGroceryToDatabase={this.props.addGroceryToDatabase} />} />
                              <Route path="/" />
                              <Route path="/ToBuy" render={() => <ToBuy toBuyList={this.props.toBuyList} hiddenState={this.state.isHidden} handleAlert={this.state.handleAlert} />} />
                           </div>
                        </section>
                     </nav>
                  </div>
               </header>
         </Router>
      )
   }
}

export default Header;