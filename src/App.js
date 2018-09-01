import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

//Components
import Form from './components/form/Form';
import GroceryItem from './GroceryItem';

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
      console.log(snapshot.val());
      this.sortGroceryItems(snapshot.val())
    //   this.setState = ({
    //     fridgeInventory: snapshot.val(),
    //   })
    // })
    // console.log('app component did mount fired');
  
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
  render() {
    // console.log('render was called')
    return (
      <div className="App">
        <h1>Grocery List App</h1>
        <Form addGroceryToDatabase={this.addGroceryToDatabase} />
        <ul>
          <GroceryItem listOfGroceryItems={this.state.fridgeInventory} />
        </ul>
      </div>
    );
  }
}

export default App;
