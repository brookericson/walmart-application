import React, { Component } from 'react';
import Products from './components/Products/Products';
import Recommendations from './components/Recommendations/Recommendations';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProductPage: true,
            showRecommendationPage: false
        };
    }

    itemRecommendationHandler = (itemId) => {
        this.setState({
            showProductPage: false,
            showRecommendationPage: true,
            item: itemId
        });
    };

    searchItemHandler = () => {
        this.setState({
            showProductPage: true,
            showRecommendationPage: false,
            item: null
        });
    };

  render() {
      let prodList = null;
      if (this.state.showProductPage){
        prodList = <Products recommendationsHandler={this.itemRecommendationHandler}/>
      }

      let recList = null;
      if (this.state.showRecommendationPage){
          recList = <Recommendations itemId={this.state.item} searchHandler={this.searchItemHandler}/>
      }
    return (
      <div className="App">
          {prodList}
          {recList}
      </div>
    );
  }
}

export default App;
