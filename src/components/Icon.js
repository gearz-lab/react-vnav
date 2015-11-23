var React = require("react");

var Icon = React.createClass({
    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        return <i className={`vnav-icon fa fa-${this.props.icon}`}></i>
    }
});

export default Icon;