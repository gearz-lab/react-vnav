React-vnav
===

`React-vnav` is a [React](https://facebook.github.io/react/) library for building vertical main menus.

React-vnav is under active development. APIs might change. **Features that will probably be introduced until version 1.0**:

 - Search highlight
 - Keyboard navigation
 - Better integration with react-router. Today, routing must be done manually listening for node click events
 - Ability to mark active menu item automatically based on react-router
 - Drag and drop
 - Built in button for creating folders
 - Remove dependency on bootstrap and font-awesome LESS files

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

Adding the styles
---

Currently `react-vnav` requires the `bootstrap` and the `font-awesome` less files to be included.

    @import 'bootstrap/less/bootstrap';
    @import 'font-awesome/less/font-awesome';
    @import 'react-vnav/less/vnav.less';
    

Contributing
---

**Pull-requests are really really welcome**.
 
I'll be more than glad to invite frequent contributors to join the organization.
If you need help understanding the project, please post an issue and I'll do my best to reply and make sure you understand everything
you need.

In order to make a pull request:

 1. Fork it.
 2. Create your feature-branch git checkout -b your-new-feature-branch
 3. Commit your change git commit -am 'Add new feature'
 4. Push to the branch git push origin your-new-feature-branch
 5. Create new Pull Request with master branch

License
---
`React-vnav` is [MIT](https://github.com/gearz-lab/react-vnav/blob/master/LICENSE) licensed.