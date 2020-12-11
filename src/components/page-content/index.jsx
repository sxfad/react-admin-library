import React, { Component } from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import Footer from '../footer';
import { getElementTop } from '../../util';
import styles from './style.module.less';

/**
 * 页面内容 容器
 * 1. 添加统一padding、background等样式
 * 1. 自动判断是否含有FixBottom，并为之腾出空间
 * 1. 是否含有公共footer
 */
export default class PageContent extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        loadingTip: PropTypes.any,
        footer: PropTypes.bool,
        fitHeight: PropTypes.bool,
        otherHeight: PropTypes.number,
    };

    static defaultProps = {
        footer: false,
        otherHeight: 0,
    };

    state = {
        height: 'auto',
    };

    componentWillUnmount() {
        this.props.fitHeight && window.removeEventListener('resize', this.setHeight);
    }

    componentDidMount() {
        if (this.props.fitHeight) {
            this.setHeight();
            window.addEventListener('resize', this.setHeight);
        }
    }

    setHeight = () => {
        if (!this.contentDom) return;
        const { otherHeight } = this.props;
        const offsetTop = getElementTop(this.contentDom);
        const windowHeight = document.documentElement.clientHeight;
        const marginBottom = window.parseInt(window.getComputedStyle(this.contentDom)?.marginBottom, 10) || 0;

        const height = windowHeight - offsetTop - marginBottom - otherHeight;
        this.setState({ height });
    };

    render() {
        const {
            footer,
            loading,
            loadingTip,
            children,
            action,
            className,
            fitHeight,
            style,
            ...others
        } = this.props;

        const { height } = this.state;

        let hasFixBottom = false;
        React.Children.map(children, item => {
            if (item && item.type && item.type.__FIX_BOTTOM) hasFixBottom = true;
        }, null);

        const rootStyle = {};
        if (hasFixBottom) {
            rootStyle.marginBottom = '66px';
        }

        let contentStyle = {};
        if (fitHeight) {
            contentStyle = {
                flex: `0 0 ${height}px`,
                height: height,
                overflowY: 'auto',
            };
        }


        return (
            <div ref={node => this.root = node} style={rootStyle} className={styles.pageContentRoot}>
                <div
                    className={styles.pageLoading}
                    style={{
                        display: loading ? 'block' : 'none',
                    }}
                >
                    <Spin spinning tip={loadingTip}/>
                </div>
                <div
                    ref={node => this.contentDom = node}
                    style={{ ...contentStyle, ...style }}
                    className={`${className} ${styles.pageContent}`}
                    {...others}
                >
                    {children}
                </div>
                {footer ? <div className={styles.footer}><Footer/></div> : null}
            </div>
        );
    }
}
