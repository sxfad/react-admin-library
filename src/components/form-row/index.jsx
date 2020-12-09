import React from 'react';
import styles from './style.module.less';

export default function(props) {
    return (<div className={styles.formRowRoot} {...props}/>);
}
