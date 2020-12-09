import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../components/icon';
import { Breadcrumb } from 'antd';
import styles from './style.module.less';

const Item = Breadcrumb.Item;

export default class BreadcrumbComponent extends Component {
    static propTypes = {
        dataSource: PropTypes.array, // 数据源
    };

    static defaultProps = {
        dataSource: [],
    };

    renderItems() {
        const { dataSource } = this.props;
        const iconStyle = { marginRight: 4 };
        if (dataSource && dataSource.length) {
            return dataSource.map(({ key, icon, text, path }) => {
                if (path) {
                    return (
                        <Item key={key}>
                            <Link to={path}>
                                {icon ? <Icon type={icon} style={iconStyle}/> : null}
                                {text}
                            </Link>
                        </Item>
                    );
                }
                return (
                    <Item key={key}>
                        {icon ? <Icon type={icon} style={iconStyle}/> : null}
                        {text}
                    </Item>
                );
            });
        }
        return null;
    }

    render() {
        const { theme } = this.props;
        return (
            <div className={[ styles.breadcrumb, `system-breadcrumb-${theme}` ].join(' ')}>
                <Breadcrumb>
                    {this.renderItems()}
                </Breadcrumb>
            </div>
        );
    }
}
