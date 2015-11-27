import VNavItem from '../components/VNavItem';
import _ from 'underscore';
import React from 'react';

class MenuHelper {

    /**
     * Creates VNavItems from an Object containing nodes (each property in the nodes object represents a node)
     * @param nodes
     * @returns {*}
     */
    createVNavItemsFromNodes(nodes) {
        if (!nodes) {
            return null;
        }
        return Object.keys(nodes).map((n, i) => this.createVNavItemFromNode(nodes[n], i));
    }

    /**
     * Creates a VNavItem from a JSON node
     * @param node
     * @returns {XML}
     */
    createVNavItemFromNode(node, key) {
        return <VNavItem text={node.display} icon={node.icon} key={key} nodes={node.nodes}/>
    }

    /**
     * Filter the given nodes. "nodes" is an object in which each property is a node
     * @param nodes
     * @param filterString
     */
    filterNodes(nodes, filterString) {
        let result = {};
        for (let node in nodes) {
            let filteredNode = this.filterNode(nodes[node], filterString);
            if (filteredNode) {
                result[node] = filteredNode;
            }
        }
        return result;
    }

    /**
     * Filters the given node and returns it.
     * @param node
     * @param filterString
     */
    filterNode(node, filterString) {
        if (node.display.match(new RegExp(filterString, 'i'))) {
            return node;
        }
        else if(node.nodes) {
            let filteredChildren = this.filterNodes(node.nodes, filterString);
            if(Object.keys(filteredChildren).length) {
                node.nodes = filteredChildren;
                return node;
            }
        }
        return null;
    }
}

export default new MenuHelper();