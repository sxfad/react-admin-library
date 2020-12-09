import React, { Component } from 'react';
import {
    CloseCircleOutlined,
    CloseOutlined,
    CloseSquareOutlined,
    VerticalLeftOutlined,
    VerticalRightOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import queryString from 'qs';
import Icon from '../../components/icon';
import DraggableTabsBar from '../../components/draggable-tabs-bar';
import ContextMenu from './ContextMenu';
import styles from './style.module.less';

let UN_LISTEN;

@withRouter
export default class PageTabs extends Component {
    constructor(props) {
        super(props);

        // 第一次进入页面
        setTimeout(() => this.setTabs());

        if (UN_LISTEN) UN_LISTEN();

        UN_LISTEN = this.props.history.listen((e) => {
            this.setTabs();
        });
    }

    state = {
        contextVisible: false,
        contextEvent: null,
        contextMenu: '',
    };

    setTabs() {
        const { action } = this.props;
        const { selectedMenu, tabs } = this.props.layoutState;
        const { pathname, search } = this.props.location;
        const query = queryString.parse(search, { ignoreQueryPrefix: true });
        const tabTitle = query?.tabTitle;

        const text = tabTitle || selectedMenu?.text;
        const icon = selectedMenu?.icon;
        const path = pathname + search;

        const exitTab = tabs.find(item => item.path === path);

        tabs.forEach(item => item.active = false);

        if (exitTab) {
            exitTab.text = exitTab.text || text;
            exitTab.icon = exitTab.icon || icon;
            exitTab.active = true;
        } else {
            tabs.push({
                path,
                text,
                icon,
                active: true,
            });
        }
        action.layout.setTabs([ ...tabs ]);
    }

    handleClose = (targetPath) => {
        const { action: { layout }, layoutState: { tabs } } = this.props;
        const activeTabIndex = tabs.findIndex(item => item.active);

        const activeTab = tabs[activeTabIndex];

        // 关闭的是当前tab
        if (activeTab.path === targetPath) {
            const nextIndex = activeTabIndex === 0 ? activeTabIndex + 1 : activeTabIndex - 1;
            const nextTab = tabs[nextIndex];
            this.props.history.push(nextTab.path);
        }

        const nextTabs = tabs.filter(item => item.path !== targetPath);
        layout.setTabs(nextTabs);
    };

    handleSortEnd = ({ oldIndex, newIndex }) => {
        const dataSource = [ ...this.props.layoutState.tabs ];

        // 元素移动
        dataSource.splice(newIndex, 0, dataSource.splice(oldIndex, 1)[0]);

        this.props.action.layout.setTabs(dataSource);
    };

    handleClick = (item) => {
        const separator = '/iframe_page_/';
        let path = item.path;
        if (path.indexOf(separator) !== -1) {
            const url = window.encodeURIComponent(path.split(separator)[1]);
            path = `${separator}${url}`;
        }
        this.props.history.push(path);
    };


    handleRightClick = (e, tab) => {
        e.preventDefault();

        const contextMenu = this.renderContextMenu(tab);

        this.setState({
            contextVisible: true,
            contextEvent: { clientX: e.clientX, clientY: e.clientY },
            contextMenu,
        });
    };

    renderContextMenu = (tab) => {
        const { layoutState } = this.props;
        const dataSource = layoutState.tabs;
        const disabledClose = dataSource.length === 1;
        const tabIndex = dataSource.findIndex(item => item.path === tab.path);
        const disabledCloseLeft = tabIndex === 0;
        const disabledCloseRight = tabIndex === dataSource.length - 1;

        return (
            <Menu
                selectable={false}
                onClick={({ key: action }) => this.handleMenuClick(action, tab.path)}
            >
                <Menu.Item key="close" disabled={disabledClose}>
                    <CloseOutlined/> 关闭
                </Menu.Item>
                <Menu.Item key="closeOthers" disabled={disabledClose}>
                    <CloseCircleOutlined/> 关闭其他
                </Menu.Item>
                <Menu.Item key="closeAll" disabled={disabledClose}>
                    <CloseSquareOutlined/> 关闭所有
                </Menu.Item>
                <Menu.Item key="closeLeft" disabled={disabledCloseLeft}>
                    <VerticalLeftOutlined/> 关闭左侧
                </Menu.Item>
                <Menu.Item key="closeRight" disabled={disabledCloseRight}>
                    <VerticalRightOutlined/> 关闭右侧
                </Menu.Item>
            </Menu>
        );
    };

    handleMenuClick = (action, targetPath) => {
        const { action: { layout }, layoutState: { tabs } } = this.props;

        if (action === 'close') this.handleClose(targetPath);

        if (action === 'closeOthers') {
            const tab = tabs.find(item => item.path = targetPath);
            const prevActiveTab = tabs.find(item => item.active);
            tab.active = true;

            if (targetPath !== prevActiveTab.path) {
                this.props.history.push(targetPath);
            }

            layout.setTabs([ tab ]);
        }
        if (action === 'closeAll') {
            layout.setTabs([]);

            this.props.history.push('/');
        }
        if (action === 'closeLeft') {
            const targetIndex = tabs.findIndex(item => item.path === targetPath);
            const targetTab = tabs[targetIndex];
            const nextTabs = tabs.filter((item, index) => index >= targetIndex);

            if (!nextTabs.some(item => item.active)) {
                targetTab.active = true;
                this.props.history.push(targetTab.path);
            }

            layout.setTabs(nextTabs);
        }
        if (action === 'closeRight') {
            const targetIndex = tabs.findIndex(item => item.path === targetPath);
            const targetTab = tabs[targetIndex];
            const nextTabs = tabs.filter((item, index) => index <= targetIndex);

            if (!nextTabs.some(item => item.active)) {
                targetTab.active = true;
                this.props.history.push(targetTab.path);
            }

            layout.setTabs(nextTabs);
        }
    };

    render() {
        const { layoutState, width } = this.props;
        const dataSource = layoutState.tabs;
        const { contextVisible, contextEvent, contextMenu } = this.state;
        const currentTab = dataSource.find(item => item.active);

        const tabsBarDataSource = dataSource.map(item => {
            let { text: tabTitle, path, icon } = item;
            let title = tabTitle;

            if (typeof tabTitle === 'object' && tabTitle.text) title = tabTitle.text;

            if (tabTitle?.icon) icon = tabTitle.icon;

            if (icon) title = <div style={{ flex: 1, textAlign: 'center' }}><Icon type={icon} style={{ marginRight: 4 }}/>{title}</div>;

            return {
                key: path,
                title,
                closable: true,
                ...item,
            };
        });

        return (
            <div className={styles.root}>
                <ContextMenu
                    visible={contextVisible}
                    onChange={(contextVisible) => this.setState({ contextVisible })}
                    event={contextEvent}
                    content={contextMenu}
                />
                <DraggableTabsBar
                    dataSource={tabsBarDataSource}
                    itemWrapper={(itemJsx, item, wrapperClassName) => {
                        return (
                            <div
                                className={wrapperClassName}
                                onContextMenu={(e) => this.handleRightClick(e, item)}
                            >
                                {itemJsx}
                            </div>
                        );
                    }}
                    onSortEnd={this.handleSortEnd}
                    onClose={({ path }) => this.handleClose(path)}
                    onClick={this.handleClick}
                    activeKey={currentTab?.path}
                    parentWidth={width}
                />
            </div>
        );
    }
}
