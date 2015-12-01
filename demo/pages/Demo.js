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
            },
            customization: {
                display: "Customization",
                icon: "wrench",
                nodes: {
                    entities: {
                        display: "Entities",
                        icon: "database",
                        nodes: {
                            new: {
                                display: "New entity",
                                icon: "plus",
                                route: {
                                    name: "new",
                                    params: {
                                        entity: "entity"
                                    }
                                }
                            },
                            search: {
                                display: "Search entities",
                                icon: "search"
                            }
                        }
                    }
                }
            }
        };

        return <div style={{width: "300px", margin: 10}}>
            <VNav nodes={data} onItemClick={this.handleItemClick} searchBarButtons={[{
            id: 'options',
            icon: "gear",
            onClick: function(id, event) { console.log(id); }
            }]}/>
            <NotificationSystem ref="notificationSystem" />
        </div>;
    }
});

export default Demo;
