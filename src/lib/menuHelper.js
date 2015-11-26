import VNavItem from '../components/VNavItem';
import React from 'react';

class MenuHelper {

    createVNavItemsFromNodes(nodes) {
        if(!nodes) {
            return null;
        }
        return Object.keys(nodes).map((n,i) => this.createVNavItemFromNode(nodes[n], i));
    }

    /**
     * Creates a VNavItem from a JSON node
     * @param node
     * @returns {XML}
     */
    createVNavItemFromNode(node, key) {
        return <VNavItem text={node.display} icon={node.icon} key={key} nodes={node.nodes} />
    }
}

export default new MenuHelper();