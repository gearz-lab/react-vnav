var React = require("react");
import Icon from './Icon';
import update from 'react-addons-update';

var VNavItem = React.createClass({
    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        let childrenWrapper = null;
        if(this.props.children) {
            childrenWrapper = <div className="vnav-children-wrapper">
                {this.props.children}
            </div>;
        }

        let vNavIconTextClass =  this.props.icon ? "vnav-item-text with-icon" : "vnav-item-text";
        let plusWrapper = this.props.children ? <span className="plus-wrapper">
             <Icon icon="plus"/>
        </span> : null;

        return <div className="vnav-item-wrapper">
                <div className="vnav-item">
                    {this.props.icon ? <Icon icon={this.props.icon}/> : null }
                    <span className={vNavIconTextClass}>{this.props.text}</span>
                    {plusWrapper}
                </div>
                {childrenWrapper}
            </div>
    }
});

export default VNavItem;