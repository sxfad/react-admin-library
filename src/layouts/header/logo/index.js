import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.png';
import styles from './style.module.less';

export default class Logo extends Component {
    static propTypes = {
        min: PropTypes.bool,
    };
    static defaultProps = {
        logo: logo,
        title: 'React Web',
        min: false,
    };

    render() {
        const { min, title, logo, ...others } = this.props;
        return (
            <div className={styles.logo}>
                <img src={logo} alt="logo"/>
                <h1 {...others} className={min ? styles.titleHide : ''}>{title}</h1>
            </div>
        );
    }
}
