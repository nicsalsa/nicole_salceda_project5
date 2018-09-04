import React, { Component, Fragment } from 'react';
import './GroceryItem.css';
import classNames from 'classnames';

class GroceryItem extends Component {
   render(){
      return (
         <Fragment>
            {this.props.listOfGroceryItems.map((groceryItem, category) => {
               return (
                  <li className={classNames(groceryItem.category, 'fridgeItem')} key={groceryItem.key}>
                     <div className="fridgeItemWrapper wrapper">
                        <div className="itemText">
                           <h3>{groceryItem.groceryItem}</h3>
                           <p>Category: {groceryItem.category}</p>
                           <p>Inventory: {groceryItem.inventory}</p>
                           <button className="trashCan" onClick={() => this.props.deleteGroceryItem(groceryItem.key)}>
                              <i className="fas fa-trash-alt"></i>
                           </button>
                        </div>
                        <div className="inventoryAddMinus">
                           <button onClick={() => this.props.updateInventory(groceryItem.key, -1)} disabled={groceryItem.inventory > 0 ? false : true}>
                              <i className="fas fa-minus"></i>
                           </button>
                           <button onClick={() => this.props.updateInventory(groceryItem.key, 1)}>
                              <i className="fas fa-plus"></i>
                           </button>
                        </div>
                        <button className="addToList" onClick={() => this.props.displayCart(groceryItem.key)}>
                           Add to <i className="fas fa-cart-plus"></i>
                        </button>
                     </div>
                  </li>
               )
            })}
         </Fragment>
      );
   }
}

export default GroceryItem;