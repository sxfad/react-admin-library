import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default class HeaderFullScreen extends Component {
    static propTypes = {
        /** Tooltip 提示未知 */
        placement: PropTypes.any,
        /** 需要全屏的dom元素，默认document.documentElement */
        element: PropTypes.any,
        /** 进入全屏 Tooltip 提示 */
        toFullTip: PropTypes.any,
        /** 退出全屏 Tooltip 提示 */
        exitFullTip: PropTypes.any,
        /** 全屏后触发事件 */
        onFull: PropTypes.func,
        /** 退出全屏触发事件 */
        onExit: PropTypes.func,
        /** 是否在框架内全屏 */
        inFrame: PropTypes.bool,

    };
    static defaultProps = {
        element: document.documentElement,
        toFullTip: '全屏',
        exitFullTip: '退出全屏',
        onFull: () => void 0,
        onExit: () => void 0,
        inFrame: false,
        placement: 'bottom',
    };
    state = {
        fullScreen: false,
        toolTipVisible: false,
        prevStyle: {},
    };

    componentDidMount() {
        let fullScreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        this.setState({ fullScreen: !!fullScreen });

        window.document.addEventListener('fullscreenchange', this.handleFullScreenChange);
        window.document.addEventListener('mozfullscreenchange', this.handleFullScreenChange);
        window.document.addEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        window.document.addEventListener('msfullscreenchange', this.handleFullScreenChange);
        window.document.addEventListener('click', () => this.handleToolTipHide(0));
        window.document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.document.removeEventListener('fullscreenchange', this.handleFullScreenChange);
        window.document.removeEventListener('mozfullscreenchange', this.handleFullScreenChange);
        window.document.removeEventListener('webkitfullscreenchange', this.handleFullScreenChange);
        window.document.removeEventListener('msfullscreenchange', this.handleFullScreenChange);
        window.document.removeEventListener('click', () => this.handleToolTipHide(0));
        window.document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        const { keyCode } = e;
        const { element, inFrame, onExit } = this.props;
        const { fullScreen, prevStyle } = this.state;
        if (keyCode === 27 && fullScreen && inFrame) {
            Object.entries(prevStyle).forEach(([ key, value ]) => {
                element.style[key] = value;
            });
            onExit && onExit();
        }
    };

    handleFullScreenClick = () => {
        const { element, inFrame, onFull, onExit } = this.props;
        const { fullScreen, prevStyle } = this.state;
        if (inFrame) {
            if (fullScreen) {
                Object.entries(prevStyle).forEach(([ key, value ]) => {
                    element.style[key] = value;
                });
                onExit && onExit();

                this.setState({ fullScreen: false });

            } else {
                const prevStyle = {};
                [ 'position', 'top', 'right', 'bottom', 'left' ].forEach(key => {
                    prevStyle[key] = element.style[key];
                });
                this.setState({ prevStyle });

                Object.entries({
                    position: 'fixed',
                    top: '50px',
                    right: 0,
                    bottom: 0,
                    left: 0,
                }).forEach(([ key, value ]) => {
                    element.style[key] = value;
                });
                onFull && onFull();
                this.setState({ fullScreen: true });
            }
            return;
        }
        if (fullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        }
    };

    handleFullScreenChange = () => {
        const { onFull, onExit } = this.props;
        const { fullScreen } = this.state;
        !fullScreen ? onFull() : onExit();
        this.setState({ fullScreen: !fullScreen });
    };

    handleToolTipShow = () => {
        if (this.ST) clearTimeout(this.ST);
        this.setState({ toolTipVisible: true });
    };

    handleToolTipHide = (time = 300) => {
        this.ST = setTimeout(() => {
            this.setState({ toolTipVisible: false });
        }, time);
    };

    render() {
        const { className, toFullTip, exitFullTip, placement } = this.props;
        const { fullScreen, toolTipVisible } = this.state;
        return (
            <div
                className={className}
                style={{
                    fontSize: 14,
                }}
                onClick={this.handleFullScreenClick}
                onMouseEnter={this.handleToolTipShow}
                onMouseLeave={() => this.handleToolTipHide()}
            >
                <Tooltip visible={toolTipVisible} placement={placement} title={fullScreen ? exitFullTip : toFullTip}>
                    {fullScreen ? (
                        <FullscreenExitOutlined/>
                    ) : (
                        <FullscreenOutlined/>
                    )}
                </Tooltip>
            </div>
        );
    }
}
