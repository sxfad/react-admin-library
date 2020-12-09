import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.less';

export default class FixBottom extends Component {
    static __FIX_BOTTOM = true;
    static propTypes = {
        /** 内部内容是否居右显示，默认true */
        right: PropTypes.bool,  // 内部内容是否居又显示
    };

    static defaultProps = {
        right: true,
    };

    render() {
        let {
            right,
            sideCurrentWidth,
            style = {},
            styleName = '',
            className = '',
            children,
            action,
            ...others
        } = this.props;

        style = { left: sideCurrentWidth, textAlign: right ? 'right' : 'left', ...style };

        return (
            <div
                {...others}
                className={[ styles.fixBottom, styleName, className ].join(' ')}
                style={style}
            >
                {React.Children.map(children, item => {
                    // 如果子元素是antd button ，自动处理间距
                    if (item && item.type.__ANT_BUTTON) {
                        let style = right ? { marginLeft: '8px' } : { marginRight: '8px' };
                        style = { ...style, ...item.props.style };

                        return cloneElement(item, { style });
                    }
                    return item;
                })}
            </div>
        );
    }
}
