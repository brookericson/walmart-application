import React, {Component} from 'react';
import Request from 'superagent';

class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRecommendation: false
        };
    }

    componentDidMount(){
        const itemId = this.props.itemId;
        const url = "http://api.walmartlabs.com/v1/nbp?apiKey=gtcgtdg945mwxj4ywafatz2w&itemId=" + itemId;
        Request.get(url,{
            headers: {
                "Accept": "application/json"
            }
        }).then((response) => {
            this.setState({
                showRecommendation: true,
                recommendations: response.body
            });
        });
    }


    render() {
        let recommendation = null;
        if (this.state.showRecommendation){
            recommendation = (
                <div className="item-list-container"> {
                    this.state.recommendations.map(recommendation => {
                            return (

                                <ul className="item-container">
                                    <li><img src={recommendation.thumbnailImage} alt="thumbnail"></img></li>
                                    <li><span>{recommendation.name}</span></li>
                                    <li><strong>${recommendation.salePrice}</strong></li>
                                    <li>{recommendation.categoryPath}</li>
                                </ul>

                            )
                        }
                    )
                }
                </div>
            )
        }
        return (
            <div>
                <div className="top-container">
                    <img src="logo.png" alt="logo" className="logo"></img>
                </div>
                <div className="page-description"><h2>Recommended Items:</h2><div onClick={this.props.searchHandler}>&#8249; Search items</div></div>
                {recommendation}
            </div>
        );
    }
}

export default Recommendations;