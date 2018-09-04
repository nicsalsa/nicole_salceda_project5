import React, { Component, Fragment } from 'react';
import './App.css';
import firebase from './firebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import classNames from 'classnames';

//Components
import Header from './components/header/Header';
import GroceryItem from './components/groceryItems/GroceryItem';
// Global Variables
const dbRef = firebase.database().ref();
const newState = [];
// Class based component begins
class App extends Component {
  constructor(){
    super();
    this.state = {
      fridgeInventory: [],
      toBuyList: [],
      toDos: []
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      this.sortGroceryItems(data);

      for (let key in data) {
        newState.push({ key: key, name: data[key] });
        // console.log(newState)
      }
    })
  }
  addGroceryToDatabase = (grocery, category, inventory) => {
    dbRef.push({
      groceryItem: grocery,
      category: category,
      inventory: inventory
    })
  }
  sortGroceryItems = (groceryItemObject) => {
    if (groceryItemObject === null)  {
      groceryItemObject = {};
    }
    // we need to transform our object into an array to easily map through it.
    // object.entries is an object method that turns an object into an array of arrays
    const groceriesArrays = Object.entries(groceryItemObject)
      .map((item) => {
        return ({
          key: item[0],
          groceryItem: item[1].groceryItem,
          category: item[1].category,
          inventory: item[1].inventory
        });
      });
    this.setState({
      fridgeInventory: groceriesArrays
    });
    console.log(groceriesArrays)
  }
  deleteGroceryItem(groceryId) {
    const grocerydbRef = firebase.database().ref(`${groceryId}`);
    grocerydbRef.remove();
  }
  updateInventory = (id, number) => {
    let inventoryNum;
    const grocerydbRef = firebase.database().ref(`${id}`);
    grocerydbRef.child('/inventory').on("value", (snapshot) => {
      inventoryNum = snapshot.val();
    })
    grocerydbRef.update({inventory: inventoryNum + number});
    if(inventoryNum <= 0){
      this.displayCart(id);
    }
  }

  displayCart = (id) => {
    let groceryItemName;
    const listArray = this.state.toBuyList;
    const grocerydbRef = firebase.database().ref(`${id}`);
    grocerydbRef.child('/groceryItem').on('value', (snapshot) => {
        groceryItemName = snapshot.val();
        listArray.push(groceryItemName);
      })
      this.setState({
        toBuyList: listArray
    })
  }
  
  render(){
    return (
      <Fragment>
        <div className="App">
          <Header toBuyList={this.state.toBuyList} addGroceryToDatabase={this.addGroceryToDatabase}/>
          {/* <section className="toBuy">
            <ul>
              <ToBuy toBuyList={this.state.toBuyList} />
            </ul>
          </section> */}
          <ul className="fridgeList">
            <GroceryItem listOfGroceryItems={this.state.fridgeInventory} deleteGroceryItem={this.deleteGroceryItem} updateInventory={this.updateInventory} displayCart={this.displayCart}/>
          </ul>
          
          {/* <Link to="/Form">Add New Grocery Item</Link>
          <Route path="/Form" render={() => <Form addGroceryToDatabase={this.addGroceryToDatabase} />} /> */}

        </div>
      </Fragment>
    );
  }
}

export default App;


{/* <Route path="/contact" component={Contact} />
  <Form addGroceryToDatabase={this.addGroceryToDatabase} /> */}