var React = require("react");
import Icon from './Icon';
import menuHelper from '../lib/menuHelper';
import update from 'react-addons-update';

var VNavItem = React.createClass({

    PropTypes: {
        node: React.PropTypes.object.isRequired,
        onClick: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            collapsed: false
        }
    },

    handleOnClick: function () {
        if (this.props.node.nodes) {
            this.setState({collapsed: !this.state.collapsed});
        }
        if (this.props.onClick) {
            this.props.onClick(this.props.node);
        }
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {

        let childrenWrapper = null;
        if (this.props.node.nodes && this.state.collapsed === false) {
            childrenWrapper = <div className="vnav-children-wrapper">
                {menuHelper.createVNavItemsFromNodes(this.props.node.nodes, this.props.onClick)}
            </div>;
        }

        let vNavIconTextClass = this.props.node.icon ? "vnav-item-text with-icon" : "vnav-item-text";
        let plusWrapper = this.props.node.nodes ? <span className="plus-wrapper">
             <Icon icon={this.state.collapsed ? "plus" : "minus"}/>
        </span> : null;

        return <div className="vnav-item-wrapper">
            <div className="vnav-item" onClick={this.handleOnClick}>
                {this.props.node.icon ? <Icon icon={this.props.node.icon}/> : null }
                <span className={vNavIconTextClass}>{this.props.node.display}</span>
                {plusWrapper}
            </div>
            {childrenWrapper}
        </div>
    }
});

export default VNavItem;