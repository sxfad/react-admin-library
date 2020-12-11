import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import styles from './index.module.less';


let RowElement = SortableElement((props) => {
    return props.children;
});


let BodyContainer = SortableContainer(props => {
    const {
        children,
        ...others
    } = props;
    const children2 = props.children.flat(4).filter(item => !!item);

    return (
        <tbody {...others}>{children2.map((item, index) => {
            const { key } = item;

            return (
                <RowElement
                    key={key}
                    index={index}
                >
                    {item}
                </RowElement>
            );
        })}</tbody>
    );
});

function getCss(element, attr) {
    if (element.currentStyle) {
        return element.currentStyle[attr];
    } else {
        return window.getComputedStyle(element)[attr];
    }
}


export default function DragRow(OriTable) {

    class DragRowTable extends Component {
        static contextType = ConfigProvider.ConfigContext;

        constructor(props) {
            super(props);

            const { helperClass, onSortStart, onSortEnd, components } = this.props;

            const handleSortStart = (...args) => {
                onSortStart && onSortStart(...args);

                // 保持tr样式
                const helperTds = document.querySelectorAll('.helper-element > td');
                const tr = this.body.container.querySelector('tr');
                const tds = tr.querySelectorAll('td');

                tds.forEach((item, index) => {
                    if (!helperTds[index]) return;

                    helperTds[index].style.width = getCss(item, 'width');
                    helperTds[index].style.height = getCss(item, 'height');
                });
            };

            const handleSortEnd = (props) => {
                let { oldIndex, newIndex } = props;
                const prefixCls = this.context.getPrefixCls();
                if (this.body.container.querySelector(`.${prefixCls}-table-measure-row`)) {
                    newIndex = (newIndex - 1) < 0 ? 0 : newIndex - 1;
                    oldIndex = oldIndex - 1;
                }

                onSortEnd({ ...props, oldIndex, newIndex });
            };

            let BodyWrapper = (props) => {
                const injectProps = {
                    onSortEnd: handleSortEnd,
                    onSortStart: handleSortStart,
                    helperClass: classnames(helperClass, 'helper-element'),
                };
                return <BodyContainer ref={node => this.body = node} {...injectProps} {...props}/>;
            };

            const body = components?.body || {};

            this.components = {
                body: {
                    ...body,
                    wrapper: BodyWrapper,
                },
            };
        }

        static propTypes = {
            onSortEnd: PropTypes.func.isRequired,
            helperClass: PropTypes.string,
        };

        render() {
            const {
                className,
                onSortStart,
                onSortEnd,
                helperClass,
                ...others
            } = this.props;
            const classNames = classnames(className, styles.sxTableRowDraggable);

            return (
                <OriTable
                    {...others}
                    className={classNames}
                    components={this.components}
                />
            );
        }
    }

    return DragRowTable;
}

