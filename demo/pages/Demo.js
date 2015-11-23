import React from 'react';
import VNav from '../../src/components/VNav';
import VNavItem from '../../src/components/VNavItem';

const Demo = React.createClass({

    render: function () {

        return <div style={{width: "300px"}}>
                <VNav>
                    <VNavItem text="Settings">
                        <VNavItem text="Customization">
                            <VNavItem text="Entities" icon="amazon"/>
                            <VNavItem text="Texts"/>
                        </VNavItem>
                    </VNavItem>
                    <VNavItem text="About"/>
                </VNav>
            </div>;
    }
});

export default Demo;
