import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ContextMenu extends Component {
    static propTypes = {
        content: PropTypes.any,     // 右键内容
    };

    state = {
        left: 0,
        top: 0,
        contentResult: '',
        visible: false,
        event: null,
    };

    componentDidMount() {
        document.addEventListener('click', this.hideRightContent);
        document.addEventListener('scroll', this.hideRightContent);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.hideRightContent, false);
        document.removeEventListener('scroll', this.hideRightContent, false);
    }

    hideRightContent = () => {
        this.setState({ visible: false });
    };

    setContentPosition = () => {
        if (!this.container) return;

        const { event } = this.state;

        if (!event) return;

        const winWidth = document.documentElement.clientWidth || document.body.clientWidth;
        const winHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const contentWidth = this.container.offsetWidth;
        const contentHeight = this.container.offsetHeight;

        let left = event.clientX;
        let top = event.clientY;

        if (left >= (winWidth - contentWidth)) {
            left = winWidth - contentWidth;
        }

        if (top > winHeight - contentHeight) {
            top = winHeight - contentHeight;
        }

        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    };

    handleContextMenu = (e) => {
        e.persist();
        e.preventDefault();
        this.setState({ visible: true, event: e });
    };

    render() {
        let { content, children } = this.props;
        const { left, top, visible } = this.state;

        if (visible) {
            // 内容未加载完成时，先进行一次大致定位
            this.setContentPosition();

            // 等待内容加载完成，才能获取到 contentWidth
            setTimeout(this.setContentPosition);
        }

        children = children ? React.cloneElement(children, { onContextMenu: this.handleContextMenu }) : null;

        return (
            <>
                <div
                    style={{
                        display: visible ? 'block' : 'none',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        zIndex: 99999,
                        width: 0,
                        height: 0,
                    }}
                >
                    <div
                        ref={node => this.container = node}
                        style={{
                            left,
                            top,
                            position: 'absolute',
                            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        {content}
                    </div>
                </div>
                {children}
            </>
        );
    }
}
