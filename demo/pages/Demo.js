import React from 'react';
import VNav from '../../src/components/VNav';
import VNavItem from '../../src/components/VNavItem';
import NotificationSystem from 'react-notification-system';

const Demo = React.createClass({

    _notificationSystem: null,

    handleItemClick: function (node) {
        this._notificationSystem.addNotification({
            title: `You clicked on ${node.display}`,
            message: JSON.stringify(node),
            level: 'success'
        });
    },

    componentDidMount: function () {
        this._notificationSystem = this.refs.notificationSystem;
    },

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
            <VNav nodes={data} onItemClick={this.handleItemClick}/>
            <NotificationSystem ref="notificationSystem" />
        </div>;
    }
});

export default Demo;
