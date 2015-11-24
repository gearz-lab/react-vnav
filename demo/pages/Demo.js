import React from 'react';
import VNav from '../../src/components/VNav';
import VNavItem from '../../src/components/VNavItem';

const Demo = React.createClass({

    render: function () {

        return <div style={{width: "300px", margin: 10}}>
                <VNav>
                    <VNavItem text="Bookmarks" icon="bookmark"/>
                    <VNavItem text="Settings" icon="gear">
                        <VNavItem text="Customization" icon="wrench">
                            <VNavItem text="Entities" icon="puzzle-piece"/>
                            <VNavItem text="Localization" icon="location-arrow"/>
                        </VNavItem>
                    </VNavItem>
                    <VNavItem text="Feedback" icon="envelope"/>
                </VNav>
            </div>;
    }
});

export default Demo;
