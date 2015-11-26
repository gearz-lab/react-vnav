var React = require("react");
import update from 'react-addons-update';
import VNavItem from './VNavItem';
import Icon from './Icon';
import menuHelper from '../lib/menuHelper.js';

var VNav = React.createClass({
    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        return <div className="vnav">
            <div className="search-wrapper">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Filter"/>
                    <span className="input-group-addon"><Icon icon="search"/></span>
                    <span className="input-group-addon"><Icon icon="gear"/></span>
                </div>

            </div>
            <div className="children-wrapper">
                {menuHelper.createVNavItemsFromNodes(this.props.nodes)}
            </div>
        </div>;
    }
});

export default VNav;