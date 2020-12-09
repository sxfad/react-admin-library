import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from './logo';
import HeaderMenu from './header-menu';
import { PAGE_FRAME_LAYOUT } from '../model';
import Breadcrumb from '../breadcrumb';
import styles from './style.module.less';

export default class Header extends Component {
    static propTypes = {
        layout: PropTypes.string,
        theme: PropTypes.string,
        logo: PropTypes.any,
        action: PropTypes.object,
        layoutState: PropTypes.object,
    };

    static defaultProps = {
        layout: PAGE_FRAME_LAYOUT.SIDE_MENU,    // top-side-menu top-menu side-menu
        theme: 'default',                       // default dark
    };

    handleToggle = () => {
        const { sideCollapsed } = this.props.layoutState;
        this.props.action.layout.setSideCollapsed(!sideCollapsed);
    };

    renderToggle = (showToggle, sideCollapsed, theme) => {
        if (!showToggle) return null;

        const props = {
            onClick: this.handleToggle,
            style: theme === 'dark' ? { color: '#fff', backgroundColor: '#222' } : null,
        };

        return sideCollapsed ? <MenuUnfoldOutlined {...props} className={styles.trigger}/> : <MenuFoldOutlined {...props} className={styles.trigger}/>;
    };

    render() {
        let {
            children,
            headerRight,
            layoutState,
            logo,
            layout,
        } = this.props;

        let {
            menus,
            topMenu,
            selectedMenu,
            appName,

            sideWidth,
            sideCollapsed,
            sideCollapsedWidth,
            sideDragging,

            primaryColor,

            breadcrumbs,
        } = layoutState;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;

        const isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
        const isTopMenu = layout === PAGE_FRAME_LAYOUT.TOP_MENU;
        const isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
        const showToggle = isTopSideMenu || isSideMenu;
        const showMenu = isTopSideMenu || isTopMenu;

        let topMenus = menus;
        if (isTopSideMenu) {
            topMenus = menus && menus.map(item => ({ key: item.key, text: item.text, path: item.path, icon: item.icon }));
        }
        if (isTopMenu) {
            topMenus = menus;
        }

        let transitionDuration = sideDragging ? '0ms' : '300ms';

        const theme = this.props.theme || ((isTopSideMenu || isSideMenu) ? 'default' : 'dark');

        return (
            <div
                id="header"
                className={styles.header}
                data-theme={theme}
                style={{ backgroundColor: primaryColor }}
            >
                <div
                    className={styles.logoContainer}
                    id="logo-container"
                    style={{
                        flex: `0 0 ${sideWidth}px`,
                        transitionDuration,
                        backgroundColor: primaryColor,
                    }}
                >
                    <Link to="/">
                        <Logo
                            min={sideCollapsed}
                            title={appName}
                            logo={logo}
                        />
                    </Link>
                </div>
                {this.renderToggle(showToggle, sideCollapsed, theme)}
                {children ? (
                    <div className={styles.center}>{children}</div>
                ) : (
                    <div className={styles.center}>
                        {showMenu ? (
                            <HeaderMenu
                                theme={theme}
                                dataSource={topMenus}
                                selectedKeys={[ topMenu?.key, selectedMenu?.key ]}
                            />
                        ) : null}
                        {isSideMenu ? (
                            <div style={{ marginLeft: 16 }}>
                                <Breadcrumb theme={theme} dataSource={breadcrumbs}/>
                            </div>
                        ) : null}
                    </div>
                )}
                <div className={styles.right}>
                    {headerRight}
                </div>
            </div>
        );
    }
}
