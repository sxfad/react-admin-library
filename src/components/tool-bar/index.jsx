import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.css';

export default class ToolBar extends Component {
    static propTypes = {
        right: PropTypes.bool,
    };

    static defaultProps = {
        right: false,
    };

    render() {
        const {style = {}, right, children, className, ...others} = this.props;

        if (right && !style.justifyContent) {
            style.justifyContent = 'flex-end';
        }

        const cls = classNames('tool-bar-root', className);

        return (
            <div className={cls} style={style} {...others}>
                {children}
            </div>
        );
    }
}
