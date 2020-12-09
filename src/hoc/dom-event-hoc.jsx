import React, { Component } from 'react';
import { addEventListener, removeEventListener } from '../util';

export default function domEvent({ addPropName = 'addEventListener', removePropName = 'removeEventListener' } = {}) {
    return function(WrappedComponent) {
        class WithDomEvent extends Component {
            constructor(props) {
                super(props);
                this[addPropName] = (element, type, handler) => {
                    this._addedEvents.push({
                        element,
                        type,
                        handler,
                    });
                    addEventListener(element, type, handler);
                };
                this[removePropName] = (element, type, handler) => {
                    removeEventListener(element, type, handler);
                };
            }

            _addedEvents = [];
            static displayName = `WithDomEvent(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

            componentWillUnmount() {
                // 当前组件卸载，卸载当前组件绑定过得事件
                this._addedEvents.forEach(item => {
                    const { element, type, handler } = item;
                    removeEventListener(element, type, handler);
                });
            }

            render() {
                const injectProps = {
                    [addPropName]: this[addPropName],
                    [removePropName]: this[removePropName],
                };
                return <WrappedComponent {...injectProps} {...this.props}/>;
            }
        }

        return WithDomEvent;
    };
}
