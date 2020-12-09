import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin, BackTop } from 'antd';
import 'antd/lib/spin/style/index.less';
import 'antd/lib/back-top/style/index.less';

import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import PageHead from '../page-head';
import Header from '../header';
import Side from '../side';
import PageTabs from '../page-tabs';
import { getSelectedMenuByPath } from '../../util';
import { PAGE_FRAME_LAYOUT } from '../model';
import styles from './style.module.less';

let UN_LISTEN;

export default class FrameTopSideMenu extends Component {
    constructor(...props) {
        super(...props);

        const { action: { layout } } = this.props;
        const setMenuStatus = () => {
            layout.getMenuStatus();
            const { isMobile } = this.props.layoutState;

            this.setTitleAndBreadcrumbs();
            if (isMobile) {
                layout.setSideCollapsed(true);
                layout.showSide();
            }
        };

        setMenuStatus();

        if (UN_LISTEN) UN_LISTEN();

        // frame 如果被创建多次，会多次监听
        UN_LISTEN = this.props.history.listen((e) => {
            // 加上timeout之后，tab页切换之后，对应页面就不render了，不知道为什么！
            setMenuStatus();
        });
    }

    static propTypes = {
        layout: PropTypes.string,
        headerRight: PropTypes.any,
        logo: PropTypes.any,
    };

    static defaultProps = {
        layout: PAGE_FRAME_LAYOUT.SIDE_MENU,    // top-menu side-menu
    };

    state = {};

    setTitleAndBreadcrumbs() {
        const { action: { layout } } = this.props;
        const {
            menus,
            title: prevTitle,
            breadcrumbs: prevBreadcrumbs,
        } = this.props.layoutState;

        const selectedMenu = getSelectedMenuByPath(window.location.pathname, menus);
        let breadcrumbs = [];
        let title = '';
        if (selectedMenu) {
            title = {
                text: selectedMenu.text,
            };
            if (selectedMenu.parentNodes) {
                breadcrumbs = selectedMenu.parentNodes.map(item => {
                    return {
                        key: item.key,
                        icon: item.icon,
                        text: item.text,
                        path: item.path,
                    };
                });
            }

            if (selectedMenu.path !== '/') {
                breadcrumbs.unshift({
                    key: 'index',
                    icon: 'home',
                    text: '首页',
                    path: '/',
                });
            }

            breadcrumbs.push({
                key: selectedMenu.key,
                icon: selectedMenu.icon,
                text: selectedMenu.text,
            });
        }

        // 从菜单中没有获取到，有肯能是当前页面设置了，但是没有菜单对应
        if (!breadcrumbs.length && prevBreadcrumbs && prevBreadcrumbs.length) {
            layout.setBreadcrumbs(prevBreadcrumbs);
        } else {
            layout.setBreadcrumbs(breadcrumbs);
        }

        // 从菜单中没有获取到，有肯能是当前页面设置了，但是没有菜单对应
        if (!title && prevTitle) {
            layout.setTitle(prevTitle);
        } else {
            layout.setTitle(title);
        }
    }

    render() {
        let {
            layoutState,
            action,
            headerRight,
            logo,
        } = this.props;

        let {
            theme,
            primaryColor,
            showHead,
            title,
            breadcrumbs,

            sideCurrentWidth,
            sideDragging,

            loading: globalLoading,
            loadingTip: globalLoadingTip,
            pageFrameLayout: layout,
            headFixed,
            showTabs,
            isMobile,
        } = layoutState;

        let transitionDuration = sideDragging ? '0ms' : `300ms`;

        if (isMobile) layout = PAGE_FRAME_LAYOUT.SIDE_MENU;

        window.document.body.style.paddingLeft = `${sideCurrentWidth}px`;

        if (isMobile) {
            showHead = true;
            headFixed = true;
            showTabs = false;
        }

        let pageHead = null;
        if (showHead) {
            pageHead = (
                <PageHead
                    title={title}
                    breadcrumbs={breadcrumbs}
                />
            );

            if (headFixed) {
                pageHead = (
                    <div
                        style={{ left: sideCurrentWidth ? sideCurrentWidth + 1 : 0, transitionDuration }}
                        className={[ 'frame-page-head-fixed', styles.headFixed, showTabs ? styles.withTabs : '' ].join(' ')}
                    >
                        {pageHead}
                    </div>
                );
            }
        }

        const titleText = typeof title === 'object' ? title?.text : title;
        const titleIsString = typeof titleText === 'string';

        const topSpaceClass = [ styles.contentTopSpace ];

        if (showHead && pageHead && headFixed) topSpaceClass.push(styles.withFixedPageHead);
        if (showTabs) topSpaceClass.push(styles.withTabs);

        const windowWidth = window.innerWidth;

        return (
            <div className={[ styles.baseFrame, 'no-print' ].join(' ')}>
                <Helmet title={titleIsString ? titleText : ''}/>
                <Header layout={layout} logo={logo} headerRight={headerRight} action={action} layoutState={layoutState}/>
                <Side layout={layout} theme={theme} action={action} layoutState={layoutState}/>
                <div className={topSpaceClass.join(' ')}/>
                {pageHead}
                {showTabs ? (
                    <div
                        className={styles.pageTabs}
                        id="frame-page-tabs"
                        style={{ left: sideCurrentWidth + 1, width: windowWidth - sideCurrentWidth, transitionDuration }}
                    >
                        <PageTabs
                            action={action}
                            width={windowWidth - sideCurrentWidth}
                            layoutState={layoutState}
                        />
                    </div>
                ) : null}
                <div className={styles.globalLoading} style={{ display: globalLoading ? 'flex' : 'none' }}>
                    <Spin spinning tip={globalLoadingTip}/>
                </div>
                <BackTop style={{ right: 40 }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        lineHeight: '40px',
                        right: 40,
                        background: primaryColor,
                        borderRadius: 4,
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 18,
                    }}>
                        <VerticalAlignTopOutlined/>
                    </div>
                </BackTop>
            </div>
        );
    }
}
