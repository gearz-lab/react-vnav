var React = require("react");
import update from 'react-addons-update';
import VNavItem from './VNavItem';
import Icon from './Icon';
import menuHelper from '../lib/menuHelper.js';
import clone from 'clone';

var VNav = React.createClass({

    getInitialState: function() {
        return {
            search: null
        }
    },

    handleTextChange: function(event) {
        this.setState({search: event.target.value});
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        let nodesClone = clone(this.props.nodes);
        let nodes = this.state.search ? menuHelper.filterNodes(nodesClone, this.state.search) : nodesClone;
        return <div className="vnav">
            <div className="search-wrapper">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Filter" onChange={this.handleTextChange}/>
                    <span className="input-group-addon"><Icon icon="search"/></span>
                    <span className="input-group-addon"><Icon icon="gear"/></span>
                </div>

            </div>
            <div className="children-wrapper">
                {menuHelper.createVNavItemsFromNodes(nodes)}
            </div>
        </div>;
    }
});

export default VNav;