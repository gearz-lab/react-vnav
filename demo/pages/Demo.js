import React from 'react';
import VNav from '../../src/components/VNav';
import VNavItem from '../../src/components/VNavItem';

const Demo = React.createClass({

    render: function () {

        var data = {
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
                            },
                            search: {
                                display: "search",
                                icon: "search"
                            }
                        }
                    }
                }
            }
        };

        return <div style={{width: "300px", margin: 10}}>
                <VNav nodes={data} />
            </div>;
    }
});

export default Demo;
