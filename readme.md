React-vnav
===

`React-vnav` is a [React](https://facebook.github.io/react/) library for building vertical main menus.

Demo
---

You can check the [online demo here](http://gearz-lab.github.io/react-vnav/demo.html).

Installing
---

For now, `react-vnav` is only supports `npm`.

Install:

    npm install react-vnav --save
    
Using
---

    import VNav from 'react-vnav';
    ...
    var menuData = {
                contacts: {
                    display: "Contacts",
                    icon: "user",
                    nodes: {
                        newContact: {
                            display: "New contact",
                            icon: "user-plus"
                        },
                        search: {
                            display: "Search contacts",
                            icon: "search"
                        }
                    }
                }
            };
    ...
    handleItemClick: function (node) {
        console.log(node);
    },
    ...
    <VNav nodes={menuData} onItemClick={this.handleItemClick} />
    
Check the [demo source code](https://github.com/gearz-lab/react-vnav/blob/master/demo/pages/Demo.js) for a complete working example;

Props
---

Prop | Type | Description
--- | --- | ---
nodes | Object | A JavaScript that describes the nodes. Each property in the object represents a node. Nodes can have whatever properties you want. Special properties are: `display`: The display text.  `icon`: The name of the font-awesome icon to use. `nodes`: The children nodes.
clearSearchText | string | The text to be displayed next to the "clear search" button
onItemClick | function | Function that will be called when an item is clicked
searchBarButtons | array | Array of buttons that will be placed next to the search input. Each item of the array is a JavaScript object. Each object has the following properties: `icon`: The font-awesome icon. `onClick`: The function that will be called when the button is clicked.