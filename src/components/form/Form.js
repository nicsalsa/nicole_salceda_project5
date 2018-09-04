import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
   
   constructor(){
      super();
      this.state = {
         groceryItem: '',
         category: '',
         inventory: 0
      }
   }

   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value,
      })
      console.log(e.target.id)
   }

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.addGroceryToDatabase(this.state.groceryItem, this.state.category, parseInt(this.state.inventory));
      this.setState({
         groceryItem: '',
         category: '',
      });
      
   }  

   render(){
      return (
         <form onSubmit={this.handleSubmit}>
            <div className="inputItem input">
               <label htmlFor="groceryItem"> Grocery Item </label>
               <input onChange={this.handleChange} type="text" id="groceryItem" placeholder="Enter item..." value={this.state.groceryItem} />
            </div>
            <div className="inputCategory input">
               <label htmlFor="category"> Category </label>
               <select onChange={this.handleChange} name="category" id="category" value={this.state.category}>
                  <option value="">Click here to select a category</option>
                  <option value="Fruits" id={this.state.category}>Fruits</option>
                  <option value="Veggie" id={this.state.category}>Veggies</option>
                  <option value="Dairy" id={this.state.category}>Dairy</option>
                  <option value="Grains" id={this.state.category}>Grains</option>
                  <option value="Meat" id={this.state.category}>Meat</option>
                  <option value="Freezer" id={this.state.category}>Freezer</option>
                  <option value="Other" id={this.state.category}>Other</option>
               </select>
            </div>
            <div className="inputInventory input">
               <label htmlFor="inventory">Qty. </label>
               <input onChange={this.handleChange} type="text" value={this.state.inventory} id="inventory"/>
            </div>

            <input type="submit" value="Update Inventory"/>
         </form>
      )
   }
}

export default Form;




// class Form extends Component {
//    constructor() {
//       super();
//       this.state = {
//          bookTitle: '',
//          bookAuthor: '',
//       }
//    }
//    handleChange = (e) => {
//       // console.log(e.target.id);

//       this.setState({
//          [e.target.id]: e.target.value
//       })
//    }
//    // this is the callback that we are passing to our form submission
//    // we aren't directly calling add to database because we need to work with the form itself as well
//    handleSubmit = (e) => {
//       // preventing the page from refreshing
//       e.preventDefault();
//       // calling the add to database prop that the app passed down to us
//       // letting the app component know the form has some information ready to send to firebase
//       // we are passing the method the information it needs from our state
//       this.props.addBookToDatabase(this.state.bookTitle, this.state.bookAuthor);
//       // resetting the form values to be empty strings
//       this.setState({
//          bookTitle: '',
//          bookAuthor: ''
//       });
//    }
//    render() {
//       return (
//          <form onSubmit={this.handleSubmit}>
//             <label htmlFor="bookTitle">Book Title</label>
//             <input onChange={this.handleChange} type="text" placeholder="Book Title" id="bookTitle" value={this.state.bookTitle} />
//             <label htmlFor="bookAuthor">Book Author</label>
//             <input onChange={this.handleChange} type="text" id="bookAuthor" placeholder="Book Author" value={this.state.bookAuthor} />
//             <input type="submit" value="Add Book" />
//          </form>
//       )
//    }
// }
