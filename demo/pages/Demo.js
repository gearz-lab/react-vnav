import React from 'react';
import VNav from '../../src/components/MainMenu';

const Demo = React.createClass({

    render: function () {

        var menuData = {
            display: "Settings",
            nodes: {
                customization: {
                    display: "Customization",
                    nodes: {
                        entities: {
                            display: "Entities",
                            nodes: {
                                new: {
                                    display: "New",
                                    route: {
                                        name: "new",
                                        params: {
                                            entity: "entity"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        return <VNav nodes={menuData} />;
    }
});

export default Demo;
