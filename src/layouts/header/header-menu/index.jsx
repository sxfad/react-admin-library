import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../../components/icon';
import { Menu } from 'antd';
import 'antd/lib/menu/style/index.less';
import * as tree from '../../../util/tree';
import styles from './style.module.less';

const SubMenu = Menu.SubMenu;

export default class HeaderMenu extends Component {
    static propTypes = {
        dataSource: PropTypes.array,    // 菜单数据
        theme: PropTypes.string,        // 主题
        selectedKeys: PropTypes.array,  // 选中菜单keys
    };

    static defaultProps = {
        dataSource: [],
        theme: 'default',
        selectedKeys: [],
    };

    renderMenus() {
        const { dataSource } = this.props;

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

                let title = <span>{text}</span>;
                if (icon) title = (
                    <span>
                        <Icon type={icon}/>
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
        const {
            theme,
            selectedKeys,
        } = this.props;
        return (
            <div className={styles.headerMenu}>
                <Menu
                    selectedKeys={selectedKeys}
                    mode="horizontal"
                    theme={theme}
                >
                    {this.renderMenus()}
                </Menu>
            </div>
        );
    }
}
