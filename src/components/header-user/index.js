import React, { Component } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import 'antd/lib/dropdown/style/index.less';
import 'antd/lib/menu/style/index.less';
import UserLink from '../user-link';
import styles from './style.module.less';

const Item = Menu.Item;

export default class HeaderUser extends Component {
    static defaultProps = {
        theme: 'default',
        loginUser: {},
    };

    state = {};

    render() {
        const user = this.props.loginUser || {};

        const { className, menus, theme } = this.props;

        const menu = (
            <Menu className={styles.menu} theme={theme} selectedKeys={[]}>
                {menus.map((item, index) => {
                    const { text, onClick } = item;
                    if (text === 'Divider') return <Menu.Divider/>;

                    return <Item key={index} onClick={onClick}>{text}</Item>;
                })}
            </Menu>
        );

        return (
            <div className={styles.userMenu} ref={node => this.userMenu = node}>
                <Dropdown trigger="click" overlay={menu} getPopupContainer={() => (this.userMenu || document.body)}>
                    <span className={[ styles.account, className ].join(' ')}>
                        <span className={styles.userName}>
                            <UserLink user={user} link={false}/>
                        </span>
                        <CaretDownOutlined/>
                    </span>
                </Dropdown>
            </div>
        );
    }
}
