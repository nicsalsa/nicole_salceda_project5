import React, { Component, Fragment } from 'react';
import classNames from 'classnames';


class ToBuy extends Component {

   render(){
      return (
         <Fragment>
            <ul className="toBuyList">
               {this.props.toBuyList.map((listItem) => {
                  return (
                     <li className={this.props.handleAlert ? 'hidden' : 'groceryListItem' } onClick={this.props.hiddenState} key={listItem}>
                        <input type="checkbox" id={listItem}/> 
                        <label htmlFor={listItem}> {listItem} </label>
                     </li>
                  );
               })}
            </ul>
         </Fragment>
      )
   }
}

export default ToBuy;

