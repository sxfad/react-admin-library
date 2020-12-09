import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../../components/icon';
import { Menu } from 'antd';
import 'antd/lib/menu/style/index.less';
import * as tree from '../../../util/tree';

import styles from './style.module.less';

const SubMenu = Menu.SubMenu;

export default class SideMenu extends Component {
    static propTypes = {
        dataSource: PropTypes.array,    // 菜单数据
        theme: PropTypes.string,        // 主题
        collapsed: PropTypes.bool,      // 是否收起
        openKeys: PropTypes.array,      // 打开菜单keys
        selectedKeys: PropTypes.array,  // 选中菜单keys
        onOpenChange: PropTypes.func,   // 菜单打开关闭时触发
    };

    static defaultProps = {
        dataSource: [],
        theme: 'dark',
        collapsed: false,
        openKeys: [],
        selectedKeys: [],
        onOpenChange: () => true,
    };

    handleOpenChange = (openKeys) => {
        this.props.onOpenChange(openKeys);
    };

    renderMenus() {
        const { dataSource, collapsed } = this.props;

        if (dataSource && dataSource.length) {
            return tree.renderNode(dataSource, (item, children) => {
                const {
                    key,
                    path,
                    text,
                    icon,
                    target,
                    url,
                } = item;

                const title = (
                    <span>
                        {icon ? <Icon type={icon}/> : <span className="anticon">{collapsed ? text[0] : ''}</span>}
                        <span>{text}</span>
                    </span>
                );

                if (children) {
                    return (
                        <SubMenu key={key} title={title}>
                            {children}
                        </SubMenu>
                    );
                }

                return (
                    <Menu.Item key={key}>
                        {target ? (
                            <a href={url} target={target}>
                                {title}
                            </a>
                        ) : (
                            <Link to={{
                                pathname: path,
                                state: { from: 'menu' },
                            }}>
                                {title}
                            </Link>
                        )}
                    </Menu.Item>
                );
            });
        }
        return null;
    }

    render() {
        let { theme, collapsed, openKeys, selectedKeys } = this.props;
        const menuProps = collapsed ? {} : {
            openKeys,
        };

        return (
            <div className={styles.sideMenu}>
                <Menu
                    {...menuProps}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    theme={theme}
                    inlineCollapsed={collapsed}
                    onOpenChange={this.handleOpenChange}
                >
                    {this.renderMenus()}
                </Menu>
            </div>
        );
    }
}
