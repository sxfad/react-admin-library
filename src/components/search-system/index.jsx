import React, { Component } from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import Icon from '../icon';
import { AppstoreOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import styles from './style.module.less';

// 页面顶部 系统 搜索框 及 下拉菜单
export default class HeaderSys extends Component {
    state = {
        visible: false,
        oriDataSource: [],
        dataSource: [],
    };

    static defaultProps = {
        dataSource: [],
    };

    handleMouseEnter = () => {
        this.setState({ visible: true });
    };

    handleMouseLeave = () => {
        this.setState({ visible: false });
    };

    handleSearchChange = debounce(e => {
        const { value } = e.target;
        const { oriDataSource } = this.state;

        if (!value) return this.setState({ dataSource: oriDataSource });

        const nextDataSource = oriDataSource.filter(item => item?.text?.includes(value));

        this.setState({ dataSource: nextDataSource });
    }, 200);

    static getDerivedStateFromProps(nextProps, prevState) {
        const { dataSource } = nextProps;

        if (prevState.oriDataSource !== dataSource) return { oriDataSource: dataSource, dataSource };

        return null;
    }

    render() {
        const { sideWidth, selectedKeys } = this.props;
        const { visible, dataSource } = this.state;
        return (
            <div
                className={styles.sys}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {/*<AppstoreOutlined/>*/}
                {/*所有系统*/}
                <Input
                    style={{ width: 200 }}
                    prefix={<AppstoreOutlined className={styles.searchIcon}/>}
                    placeholder="搜索系统"
                    allowClear
                    onChange={e => {
                        e.persist();
                        this.handleSearchChange(e);
                    }}
                />
                <div
                    className={styles.menuPane}
                    style={{
                        left: sideWidth - 1,
                        transform: visible ? 'scaleY(1)' : 'scaleY(0)',
                    }}
                >

                    <div
                        className={styles.close}
                        onClick={() => this.setState({ visible: false })}
                    >
                        <CloseCircleOutlined/>
                    </div>

                    {dataSource.map(item => {
                        const { key, path, text, icon } = item;

                        const isActive = selectedKeys?.includes(key);

                        return (
                            <div
                                key={key}
                                className={[ styles.menuItem, isActive ? styles.active : '' ].join(' ')}
                            >
                                <Link key={key} to={path}>{icon && <Icon type={icon}/>}{text}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
