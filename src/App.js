import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

//Components
import Form from './components/form/Form';
import GroceryItem from './components/groceryItems/GroceryItem';

const dbRef = firebase.database().ref();

class App extends Component {
  constructor(){
    super();
    this.state = {
      fridgeInventory: []
    }
  }
  componentDidMount() {
    dbRef.on('value', (snapshot) => {
      // console.log(snapshot.val());
      const data = snapshot.val();
      this.sortGroceryItems(data);
      const newState = [];
      for (let key in data) {
        newState.push({ key: key, name: data[key] });
        console.log(newState)
      }
  
  })
}
  addGroceryToDatabase = (grocery, category, inventory) => {
    dbRef.push({
      groceryItem: grocery,
      category: category,
      inventory: inventory
    })
    // console.log(book, author);
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
  }
  render(){
    // console.log('render was called')
    return (
      <div className="App">
        <h1>Grocery List App</h1>
        <ul className="fridgeList">
          <GroceryItem listOfGroceryItems={this.state.fridgeInventory} deleteGroceryItem={this.deleteGroceryItem} updateInventory={this.updateInventory}/>
        </ul>
        <Form addGroceryToDatabase={this.addGroceryToDatabase} />
      </div>
    );
  }
}

export default App;
