import React from "react";
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import VNavItem from './VNavItem';
import Icon from './Icon';
import menuHelper from '../lib/menuHelper.js';
import clone from 'clone';

var VNav = React.createClass({

    getDefaultProps: function () {
        return {
            clearSearchText: "Clear search"
        }
    },


    getInitialState: function () {
        return {
            search: null
        }
    },

    handleTextChange: function (event) {
        this.setState({search: event.target.value});
    },

    handlerClearSearch: function(event) {
        this.setState({search: null}, function() {
            ReactDOM.findDOMNode(this.refs.searchInput).focus();
        });
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {

        let nodesClone = clone(this.props.nodes);
        let nodes = this.state.search ? menuHelper.filterNodes(nodesClone, this.state.search) : nodesClone;

        let searchClearer = this.state.search ? <div className="search-clearer">
            {this.props.clearSearchText}
            <div className="search-clearer-button pull-right" onClick={this.handlerClearSearch} >
                <i className="fa fa-close" ></i>
            </div>
        </div> : null;

        return <div className="vnav">
            <div className="search-wrapper">
                <div className="input-group">
                    <input ref="searchInput" type="text" className="form-control" placeholder="Filter" onChange={this.handleTextChange} value={this.state.search}/>
                    <span className="input-group-addon"><Icon icon="search"/></span>
                    <span className="input-group-addon"><Icon icon="gear"/></span>
                </div>

            </div>
            <div className="search-clearer-wrapper">
                {searchClearer}
            </div>
            <div className="children-wrapper">
                {menuHelper.createVNavItemsFromNodes(nodes)}
            </div>
        </div>;
    }
});

export default VNav;