import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import * as util from '../../util/index';
import SideMenu from './side-menu';
import { PAGE_FRAME_LAYOUT } from '../model';
import DragBar from './DragBar';
import styles from './style.module.less';

const scrollBarWidth = util.getScrollBarWidth();

export default class Side extends Component {
    static contextType = ConfigProvider.ConfigContext;

    static propTypes = {
        layoutState: PropTypes.object,
        action: PropTypes.object,
        layout: PropTypes.string,
        theme: PropTypes.string,
    };

    static defaultProps = {
        layout: PAGE_FRAME_LAYOUT.SIDE_MENU, // top-menu side-menu
    };

    componentDidMount() {
        this.scrollMenu();
    }

    // componentDidUpdate(prevProps) {
    //     this.scrollMenu(prevProps);
    // }

    scrollMenu = (prevProps = {}) => {
        const prefixCls = this.context.getPrefixCls();
        // 等待当前菜单选中
        setTimeout(() => {
            const { selectedMenu } = this.props.layoutState;
            const { selectedMenu: prevSelectedMenu } = prevProps;
            if (selectedMenu && prevSelectedMenu && selectedMenu.key === prevSelectedMenu.key) {
                return;
            }
            const selectedMenuNode = this.inner?.querySelector(`.${prefixCls}-menu-item-selected`);
            if (!selectedMenuNode) return;

            const innerHeight = this.inner.clientHeight;
            const innerScrollTop = this.inner.scrollTop;
            const selectedMenuTop = selectedMenuNode.offsetTop;
            const selectedMenuHeight = selectedMenuNode.offsetHeight;

            // 选中的菜单在非可视范围内，滚动到中间位置
            if (selectedMenuTop < innerScrollTop || (selectedMenuTop + selectedMenuHeight) > (innerScrollTop + innerHeight)) {
                this.inner.scrollTop = selectedMenuTop - selectedMenuHeight - (innerHeight - selectedMenuHeight) / 2;
            }
        }, 300);
    };


    handleMenuOpenChange = (openKeys) => {
        const { sideCollapsed } = this.props.layoutState;
        if (!sideCollapsed) this.props.action.layout.setOpenKeys(openKeys);
    };

    handleSideResizeStart = () => {
        this.props.action.layout.setSideDragging(true);
    };

    handleSideResize = ({ clientX }) => {
        this.props.action.layout.setSideWidth(clientX + 5);
    };

    handleSideResizeStop = () => {
        this.props.action.layout.setSideDragging(false);
    };

    handleMaskClick = () => {
        this.props.action.layout.setSideCollapsed(true);
    };

    render() {
        let {
            theme,
            layout,
        } = this.props;

        let {
            menus,          // 所有的菜单数据
            openKeys,       // 当前菜单打开keys
            topMenu,        // 当前页面选中菜单的顶级菜单
            selectedMenu,   // 当前选中菜单

            showSide,
            sideCollapsed,
            sideCollapsedWidth,
            sideWidth,
            sideDragging,
            style,
        } = this.props.layoutState;

        sideWidth = sideCollapsed ? sideCollapsedWidth : sideWidth;
        const sideInnerWidth = sideWidth + scrollBarWidth;
        const outerOverFlow = sideCollapsed ? 'visible' : 'hidden';
        const innerOverFlow = sideCollapsed ? 'visible' : '';
        let transitionDuration = sideDragging ? '0ms' : `0.3s`;

        const isTopSideMenu = layout === PAGE_FRAME_LAYOUT.TOP_SIDE_MENU;
        const isSideMenu = layout === PAGE_FRAME_LAYOUT.SIDE_MENU;
        const hasSide = isTopSideMenu || isSideMenu;

        // 左侧菜单数据，与顶部菜单配合显示顶部菜单的子菜单；
        let sideMenus = menus;
        if (isTopSideMenu) {
            sideMenus = topMenu && topMenu.children;
        }
        if (isSideMenu) {
            sideMenus = menus;
        }

        if (hasSide) return (
            <div
                className={[ sideCollapsed ? 'frame-side-collapsed' : 'frame-side-extended', styles.side ].join(' ')}
                style={{ width: sideWidth, display: showSide ? 'block' : 'none', transitionDuration, ...style }}
            >
                <div className="frame-side-mask" onClick={this.handleMaskClick}/>
                {sideCollapsed ? null : (
                    <DragBar
                        className={styles.dragBar}
                        onDragStart={this.handleSideResizeStart}
                        onDragging={this.handleSideResize}
                        onDragEnd={this.handleSideResizeStop}
                    />
                )}

                <div className={`${styles.outer} sx-side-outer`}
                     style={{
                         overflow: outerOverFlow,
                         transitionDuration,
                         background: theme === 'dark' ? '#001529' : '#fff',
                     }}
                >
                    <div
                        className={`${styles.inner} sx-side-inner`}
                        ref={node => this.inner = node}
                        style={{
                            width: sideInnerWidth,
                            overflow: innerOverFlow,
                            transitionDuration,
                        }}
                    >
                        <SideMenu
                            theme={theme}
                            dataSource={sideMenus}
                            collapsed={sideCollapsed}
                            openKeys={openKeys}
                            selectedKeys={[ selectedMenu && selectedMenu.key ]}
                            onOpenChange={this.handleMenuOpenChange}
                        />
                    </div>
                </div>
            </div>
        );
        return null;
    }
}
