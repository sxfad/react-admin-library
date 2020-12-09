import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../breadcrumb';
import { isMobile } from '../../util';
import styles from './style.module.less';

export default class PageHead extends Component {
    static propTypes = {
        title: PropTypes.any,
        breadcrumbs: PropTypes.array,
    };
    static defaultProps = {
        title: '',
        breadcrumbs: [],
    };

    render() {
        let { title, breadcrumbs } = this.props;

        title = typeof title === 'object' ? title.text : title;

        return (
            <div className={styles.pageHeader}>
                {isMobile ? null : <h1>{title}</h1>}

                <div className={styles.breadcrumb}>
                    <Breadcrumb dataSource={breadcrumbs}/>
                </div>
            </div>
        );
    }
}
