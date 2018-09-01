import React, { Component } from 'react';

class GroceryItem extends Component {
   render(){
      console.log(this.props.listOfGroceryItems);
      return (
         <ul>
            <h2 className="fridgeInventory">What's in my fridge?</h2>
            {this.props.listOfGroceryItems.map((groceryItem, category) => {
               return (
                  <li className="groceryItem" key={groceryItem.key} >
                     <h3>{groceryItem.groceryItem}</h3>
                     <p>category: {groceryItem.category}</p>
                     <p>inventory: {groceryItem.inventory}</p>
                     <button>
                        <i className="fas fa-minus"></i>
                     </button>
                     <button>
                        <i className="fas fa-plus"></i>
                     </button>
                  </li>
               )
            })}
         </ul>
      );
   }
}


// const BookList = (props) => {
//    console.log(props);
//    return (
//       <section className="booklist">
//          <h2>My Books</h2>
//          {props.listOfBooks.map((book) => {
//             return (
//                <div className="book" key={book.key}>
//                   <h3>{book.bookTitle}</h3>
//                   <p>{`by ${book.bookAuthor}`}</p>
//                   <button onClick={() => props.deleteBook(book.key)} id={book.key}>Delete Book</button>
//                </div>
//             )
//          })}

//       </section>
//    )
// }

// class Donut extends Component {
//    render() {
//       return (
//          <div>
//             <h2>{this.props.donutName}</h2>
//             <p>{this.props.inventory}</p>
//             <button
//                id={this.props.inventoryLocation}
//                onClick={this.props.updateInventory}
//                disabled={this.props.inventory ? false : true} >
//                Order a Donut
//                </button>
//          </div>
//       )
//    }
// }

export default GroceryItem;