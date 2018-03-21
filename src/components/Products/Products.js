import React, {Component} from 'react';
import Request from 'superagent';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProducts: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = ({ target }) => {
        const searchValue = target.value;
        const url = "http://api.walmartlabs.com/v1/search?apiKey=gtcgtdg945mwxj4ywafatz2w&query=" + searchValue + "&numItems=10";
        Request.get(url).then((response) => {
            this.setState({
                products: response.body.items,
                showProducts: true
            });
        });
        console.log(this.state.products);
    }

    render() {
        let product = null;
        if (this.state.showProducts){
            product = (
                <div className="item-list-container">

                    {this.state.products.map(product => {
                        return (

                            <ul className="item-container">
                                <li><img src={product.thumbnailImage} alt="thumbnail"
                                         onClick={() => this.props.recommendationsHandler(product.itemId)}></img></li>
                                <li onClick={() => this.props.recommendationsHandler(product.itemId)}>{product.name}</li>
                                <li><strong>${product.salePrice}</strong></li>
                                <li>{product.categoryPath}</li>
                            </ul>
                        )
                    })
                    }
                </div>
        )}

        return (
            <div>
                <div class="top-container">
                    <img src="logo.png" alt="icon" class="logo"></img>
                    <input onKeyUp={this.handleChange} type="text" name="search" id="search" placeholder="Search"></input>
                </div>
                <div className="page-description"><h2>Search for an Item</h2></div>
                    {product}
            </div>
        );
    }
}

export default Products;
