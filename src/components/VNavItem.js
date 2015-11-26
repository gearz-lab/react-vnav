var React = require("react");
import Icon from './Icon';
import menuHelper from '../lib/menuHelper';
import update from 'react-addons-update';

var VNavItem = React.createClass({

    getInitialState: function () {
        return {
            collapsed: false
        }
    },

    handleOnClick: function () {
        if (this.props.nodes)
            this.setState({collapsed: !this.state.collapsed});
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        let childrenWrapper = null;
        if (this.props.nodes && this.state.collapsed === false) {
            childrenWrapper = <div className="vnav-children-wrapper">
                {menuHelper.createVNavItemsFromNodes(this.props.nodes)}
            </div>;
        }

        let vNavIconTextClass = this.props.icon ? "vnav-item-text with-icon" : "vnav-item-text";
        let plusWrapper = this.props.nodes ? <span className="plus-wrapper">
             <Icon icon={this.state.collapsed ? "plus" : "minus"}/>
        </span> : null;

        return <div className="vnav-item-wrapper">
            <div className="vnav-item" onClick={this.handleOnClick}>
                {this.props.icon ? <Icon icon={this.props.icon}/> : null }
                <span className={vNavIconTextClass}>{this.props.text}</span>
                {plusWrapper}
            </div>
            {childrenWrapper}
        </div>
    }
});

export default VNavItem;