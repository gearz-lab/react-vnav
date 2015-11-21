var React = require("react/addons");
var MainMenuItem = require("./MainMenuItem.js");
var gearzMixin = require("./mixin.js");

var MainMenu = React.createClass({
    mixins: [gearzMixin],

    propTypes: {
        nodes: React.PropTypes.object.isRequired
    },

    /**
     * ReactJS function to get the component initial state.
     * @returns {{nodesCache: {}}}
     */
    getInitialState: function () {
        return {
            nodesCache: {}
        };
    },

    /**
     * Returns a list containing information about all nodes in a nodes collection.
     * @param nodes {Object | Array}
     *      An object or array representing a nodes collection.
     *      Each key of this object or array, contains a child node.
     *      A child node may have an arbitrary set of properties, but children must be in a property called 'nodes'.
     * @param path {Array=}
     *      Path to the node to which the passed nodes collection belongs.
     * @param output {Array=}
     *      Optional array to which items will be pushed, and then returned.
     *      If none is passed, then a new array is created, and returned.
     * @returns {Array}
     *      An array containing information about all nodes in the tree analysed in pre-order.
     *      Take a look at http://en.wikipedia.org/wiki/Tree_traversal#Pre-order
     */
    flattenNodes: function (nodes, path, output) {
        var flatData = output || [];

        for (var key in nodes)
            if (nodes.hasOwnProperty(key)) {
                var info = {
                    node: nodes[key],
                    path: (path || []).concat(key)
                };
                flatData.push(info);
                this.flattenNodes(info.node.nodes, info.path, flatData);
            }

        return flatData;
    },

    /**
     * Gets the nodes corresponding to each key in a `path`.
     * E.g.:
     *      `nodes` = {A: {B: {C: {}}}}
     *      `path` = ["A", "B", "C"]
     *      `return` => [{B: {C: {}}}]
     * @param nodes {Object | Array}
     *      An object or array representing a nodes collection.
     *      Each key of this object or array, contains a child node.
     *      A child node may have an arbitrary set of properties, but children must be in a property called 'nodes'.
     * @param path {Array}
     *      Path to get the nodes from. Each `path` key will be mapped to the corresponding node in the tree.
     * @param output {Array=}
     *      Optional array to which items will be pushed, and then returned.
     *      If none is passed, then a new array is created, and returned.
     * @returns {Array}
     *      An array containing the nodes that correspond to each `path` key.
     */
    getPathNodes: function (nodes, path, output) {
        var sequence = output || [];

        for (var it = 0; it < path.length; it++) {
            var key = path[it];
            if (!nodes || !nodes.hasOwnProperty(key))
                break;
            var node = nodes[key];
            sequence.push(node);
            nodes = node.nodes;
        }

        return sequence;
    },

    /**
     * Merges two nodes, the main node with all needed descendants and values,
     * and another source with default descendants and values.
     * @param main {Object|Array}
     *      An object or array containing the main descendants and values,
     *      that have precedence over the descendants and values from the default node.
     * @param defaults {Object|Array}
     *      An object or array containing default descendants and values,
     *      that are alternatives for elements missing from the main node.
     * @returns {Object|Array}
     *      An object or array containing the merged descendants and values from the main node and the default node.
     */
    mergeNodeValues: function (main, defaults) {
        var result = typeof main == 'object' ? {} : Array.isArray(main) ? [] : null;

        if (!result)
            throw Error("Argument `main` must be an object or an array.");

        if (typeof defaults != 'object' && Array.isArray(defaults))
            throw Error("Argument `defaults` must be an object or an array.");

        for (var key2 in defaults)
            if (defaults.hasOwnProperty(key2) && key2 != "nodes")
                result[key2] = defaults[key2];

        for (var key3 in main)
            if (main.hasOwnProperty(key3))
                if (defaults.hasOwnProperty(key3) && key3 == "nodes")
                    result[key3] = this.mergeNodeCollections(main[key3], defaults[key3]);
                else
                    result[key3] = main[key3];

        return result;
    },

    /**
     * Merges two node-collections.
     * @param main {Object}
     * @param defaults {Object}
     * @returns {Object}
     */
    mergeNodeCollections: function (main, defaults) {
        var result = {};

        for (var key1 in main)
            if (main.hasOwnProperty(key1))
                if (defaults.hasOwnProperty(key1))
                    result[key1] = this.mergeNodeValues(main[key1], defaults[key1]);
                else
                    result[key1] = main[key1];

        return result;
    },

    /**
     * Handles all node changes and triggers events indicating what node changed,
     * and what value of the node changed.
     * @param eventObject {Object}
     *      An object containing information about the event.
     */
    onNodeChange: function (eventObject) {
        function mergeOrCreate(previousValue) {
            return function (value) {
                return React.addons.update(typeof value != 'object' ? {} : value, previousValue);
            };
        }

        // Input:
        //      eventObject.path = ["app","page","editPanel"]
        //      eventObject.key = "collapsed"
        //      eventObject.value = true
        // Output:
        //      merger = {nodes: {$mergeOrCreate: {app: {$mergeOrCreate: {page: {$mergeOrCreate: {editPanel: {$mergeOrCreate: {collapsed: {$set: true}}}}}}}}}}
        let setter = {};
        setter[eventObject.key] = {$set: eventObject.value};
        let merger = eventObject.path.reduceRight((innerMerger, currentPathItem) => {
            let itemMerger = {};
            itemMerger[currentPathItem] = {$apply: mergeOrCreate(innerMerger)};
            let nodesMerger = {nodes: {$apply: mergeOrCreate(itemMerger)}};
            return nodesMerger;
        }, setter);

        // determining what is the new state
        let newState = React.addons.update(this.state, {nodesCache: merger.nodes});
        this.setState(newState);

        // calling external event handlers
        if (eventObject.trigger(eventObject.genericEventName) || eventObject.trigger(eventObject.specificEventName)) {
            return;
        }
    },

    /**
     * Determined whether a node visible or not.
     * A node is invisible when any ancestor node is collapsed.
     * @param nodes {Object|Array}
     *      An object or array that represents the root node, from which path nodes will be taken.
     * @param path {Array}
     *      An array containing the path components into the passed node.
     * @returns {boolean}
     *      True if the node is hidden; otherwise false.
     */
    isNodeHidden: function (nodes, path) {
        var ancestors = this.getPathNodes(nodes, path);
        ancestors.pop();
        return ancestors
            .map(x => x.collapsed)
            .reduce((a, b) => a || b, false);
    },

    /**
     * ReactJS rendering function.
     * @returns {XML}
     */
    render: function () {
        var nodes = this.get("nodes");

        var mergedNodes = this.mergeNodeCollections(nodes, this.state.nodesCache);
        var flattenNodes = this.flattenNodes(mergedNodes);

        var children = flattenNodes.map(info => (
            this.isNodeHidden(mergedNodes, info.path) ?
                null :
                <MainMenuItem
                    nodes={info.node.nodes}
                    collapsed={info.node.collapsed}
                    display={info.node.display}
                    path={info.path}
                    route={info.node.route}
                    onAnyChange={e => {
                        var newPath = Object.freeze([].concat(info.path));
                        var eventData = e.merge({
                            target: this,
                            path: newPath,
                            specificEventName: "Node" + e.specificEventName
                        });
                        this.onNodeChange(eventData);
                    }}
                    />
        ));

        return (
            <ul className="main-menu">
                {children}
            </ul>
        );
    }
});

module.exports = MainMenu;