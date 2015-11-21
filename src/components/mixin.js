var gearz = {
    getInitialState: function () {
        return {};
    },
    // 'get' is used to get properties that may be stored in 'state' or in 'props'
    // this happens when a value is defined throw a 'setter'
    get: function (propName) {
        return this.state.hasOwnProperty(propName)
            ? this.state[propName]
            : this.props[propName];
    },
    /**
     * 'set' is used to define the value of a property, given the name of the
     * property and the new value to assign. It can also receive a third parameter,
     * representing the context of the change. For example: you can pass the
     * event data when the change is caused by a DOM event.
     * This will raise events that can be listened by parent components,
     * so that they know when the child component changes.
     * @param propName {String}
     *      Name of the property that is being changed.
     *      This is usually the name of a `prop` of the component.
     * @param newValue {*}
     * @param context {Object}
     */
    set: function (propName, newValue, context) {
        var prevDef = false, isOriginalNewValue = true;

        var name = propName == "value" ? "" : propName[0].toUpperCase() + propName.substr(1);
        var specificEventName = name + "Change";

        // properties of an event object that cannot be overridden
        var defaultProps = [
            "previous",
            "context",
            "originalNewValue",
            "genericEventName",
            "value",
            "isOriginalNewValue",
            "preventDefault",
            "merge",
            "trigger"];

        var eventObject = {
            target: this,
            key: propName,
            previous: this.props[propName],
            context: context,
            originalNewValue: newValue,
            specificEventName: specificEventName,
            genericEventName: "AnyChange",
            get value() {
                return newValue;
            },
            set value(value) {
                newValue = value;
                isOriginalNewValue = this.originalNewValue === newValue;
            },
            get isOriginalNewValue() {
                return isOriginalNewValue;
            },

            /**
             * Prevents the default behavior of storing the data internally in the state of the component.
             * This is generally used to indicate that the state is going to be stored externally from the component.
             */
            preventDefault: function () {
                prevDef = true;
            },

            /**
             * Merges this event object, with another object, in order to include additional data to this event object.
             * You cannot override the default properties.
             * @param other {object} Containing properties to merged in a new event object.
             * @returns {object} The merging result between this event object and another object.
             */
            merge: function (other) {
                var result = Object.create(this);

                for (var key in other)
                    if (other.hasOwnProperty(key) && defaultProps.indexOf(key) < 0)
                        Object.defineProperty(result, key, {value: other[key]});

                return Object.freeze(result);
            },

            /**
             * Triggers an event handler (a function), if preventDefault was not called yet,
             * and returning whether the handler called preventDefault itself.
             * @param eventHandler {Function|String}
             *      Function representing an event handler that will receive the current event object;
             *      Or a string representing a named event, that may be present in a `prop`.
             * @returns {Boolean}
             *      Indicates whether preventDefault was called.
             */
            trigger: function (eventHandler) {
                if (typeof eventHandler == 'string')
                    eventHandler = this.target.props["on" + eventHandler];

                if (!prevDef && typeof eventHandler == 'function')
                    eventHandler(this);

                return prevDef;
            }
        };

        Object.freeze(eventObject);

        if (eventObject.trigger(specificEventName))
            return;

        if (eventObject.trigger(this.props.onAnyChange))
            return;

        var newState = {};
        newState[propName] = newValue;
        this.setState(newState);
    },
    // 'setter' is used to create a function that changes the value of an
    // attribute used by this component in response to a DOM event,
    // raising other events to notify parent components,
    // and with a default behaviour of storing changes
    // in the component internal 'state'
    setter: function (propName, newValue) {
        return (function (e) {
            return this.set(propName, newValue, {domEvent: e});
        }).bind(this);
    }
};

module.exports = gearz;