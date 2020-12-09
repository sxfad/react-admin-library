import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import hocPubSub from './pub-sub-hoc';
import hocEvent from './dom-event-hoc';
import hocQuery from './query-hoc';
import modalHoc from './modal-hoc';

import { compose } from '../util';


/**
 * 页面配置高阶组件，整合了多个高阶组件
 * @param options
 * @returns {function(*): WithConfig}
 */

export default (
    {
        connect: reduxConnect,
        getLoginUser,
        ajaxHoc,
    },
) => (options = {}) => {
    return WrappedComponent => {
        const {
            path = void 0,          // 页面路由地址，如果存在path配置，会通过脚本抓取，当前组件将会作为路由页面，path将作为路由地址
            // noFrame = false,     // 标记当前页面为不需要导航框架的页面，比如登录页，通过脚本抓取实现
            // noAuth = false,      // 标记当前页面为不需要登录即可访问的页面，通过脚本抓取实现
            // keepAlive,           // 页面内容保持
            title = true,           // true：当前页面显示通过菜单结构自动生成的title；false：当前页面不显示title；string：自定义title；object：{text，icon} text为显示的名称，icon为图标；function(props): 返回值作为title
            breadcrumbs = true,     // true：当前页面显示通过菜单结构自动生成的面包屑；false：当前页面不显示面包屑；object：[{text, ...}]，对象方式；function(props): 返回值作为面包屑
            appendBreadcrumbs = [], // 在当前面包屑基础上添加；function(props): 返回值作为面包屑
            head,                   // 页面头部是否显示
            headFixed,              // 页面头部是否固定
            tabs,                   // 是否显示tabs
            side,                   // 页面左侧是否显示
            sideCollapsed,          // 左侧是否收起
            router = false,         // 是否添加withRouter装饰器，如果设置了path，将自动使用了withRouter，组件内部可以使用history等API
            query = false,          // 是否添加地址查询字符串转换高阶组件，内部可以通过this.props.query访问查询字符串
            ajax = true,            // 是否添加ajax高阶组件，内部可以通过this.props.ajax使用ajax API
            connect = false,        // 是否与redux进行连接，true：只注入了this.props.action相关方法；false：不与redux进行连接；(state) => ({title: state.layout.title})：将函数返回的数据注入this.props
            event = false,          // 是否添加event高阶组件，可以使用this.props.addEventListener添加dom事件，并在组件卸载时会自动清理；通过this.props.removeEventListener移出dom事件
            pubSub = false,         // 是否添加发布订阅高阶组件，可以使用this.props.subscribe(topic, (msg, data) => {...})订阅事件，并在组件卸载时，会自动取消订阅; 通过this.props.publish(topic, data)发布事件
            modal = false,          // 当前组件是否是modal
            convertParams = true,   // 是否把path参数为数字，转换为数字，如果后端使用自增id，是数值类型
            convertQuery = true,    // 是否把query参数转为数字
        } = options;

        const hocFunctions = [];

        // 确保modal在第一个
        if (modal) hocFunctions.push(modalHoc(modal));

        if (event) hocFunctions.push(hocEvent());

        if (pubSub) hocFunctions.push(hocPubSub());

        if (query === true) hocFunctions.push(hocQuery({ convertQuery }));

        if (router === true) hocFunctions.push(withRouter);

        if (ajax === true) hocFunctions.push(ajaxHoc());

        hocFunctions.push(reduxConnect());

        if (connect === true) hocFunctions.push(reduxConnect());

        if (typeof connect === 'function') hocFunctions.push(reduxConnect(connect));

        const higherOrderComponents = compose(hocFunctions);

        const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

        @higherOrderComponents
        class WithConfig extends Component {
            static displayName = `WithConfig(${componentName})`;

            constructor(...args) {
                super(...args);
                this.initFrame();
            }

            componentDidMount() {
                // 如果是数字，转换为数字类型 一般后端如果是自增id，都为数字
                const params = this?.props?.match?.params;
                if (convertParams && params) {
                    Object.entries(params).forEach(([ key, value ]) => {
                        if (key.toLowerCase().endsWith('id') && /^[1-9][0-9]*$/.test(value)) params[key] = Number(value);
                    });
                }
            }

            componentWillUnmount() {
            }

            // 设置框架级的一些数据
            initFrame = () => {
                const { layout } = this.props.action;

                // path 配置存在，说明是路由页面
                const isRoutePage = !!path;

                // 页面标题设置
                if (title === false) {
                    layout.setTitle('');
                }

                if (title && title !== true) {
                    let nextTitle = title;

                    if (typeof title === 'function') {
                        nextTitle = title(this.props);
                    }

                    layout.setTitle(nextTitle);

                    // 刷新时候，由于设置顺序问题，需要timeout
                    setTimeout(() => layout.setCurrentTabTitle(nextTitle));
                }

                // 页面面包屑导航
                if (breadcrumbs === false) {
                    layout.setBreadcrumbs([]);
                }

                if (breadcrumbs && breadcrumbs !== true) {
                    let nextBreadcrumbs = breadcrumbs;

                    if (typeof breadcrumbs === 'function') {
                        nextBreadcrumbs = breadcrumbs(this.props);
                    }

                    layout.setBreadcrumbs(nextBreadcrumbs);
                }

                if (Array.isArray(appendBreadcrumbs) && appendBreadcrumbs.length) {
                    layout.appendBreadcrumbs(appendBreadcrumbs);
                }

                if (typeof appendBreadcrumbs === 'function') {
                    const nextAppendBreadcrumbs = appendBreadcrumbs(this.props);

                    layout.appendBreadcrumbs(nextAppendBreadcrumbs);
                }

                // 页面头部是否显示
                if (head !== undefined) {
                    head ? layout.showHead() : layout.hideHead();
                } else if (isRoutePage) {
                    layout.setShowHeadToDefault();
                }
                // 页面头部是否显示
                if (tabs !== undefined) {
                    layout.showTabs(tabs);
                } else if (isRoutePage) {
                    layout.setShowTabsToDefault();
                }
                // 页面头部是否固定
                if (headFixed !== undefined) {
                    layout.setHeadFixed(headFixed);
                } else if (isRoutePage) {
                    layout.setHeadFixedToDefault();
                }

                // 页面左侧是否显示
                if (side !== undefined) {
                    side ? layout.showSide() : layout.hideSide();
                } else if (isRoutePage) {
                    // 路由页面未指定side，使用默认设置
                    layout.setShowSideToDefault();
                }

                // 页面左侧是否收起
                if (sideCollapsed !== undefined) {
                    layout.setSideCollapsed(sideCollapsed);
                }
            };

            render() {
                const user = getLoginUser() || {};

                const params = this?.props?.match?.params;
                if (convertParams && params) {
                    Object.entries(params).forEach(([ key, value ]) => {
                        if (key.toLowerCase().endsWith('id') && /^[1-9][0-9]*$/.test(value)) params[key] = Number(value);
                    });
                }

                return (
                    <WrappedComponent
                        {...this.props}
                        user={user}
                    />
                );
            }
        }

        return WithConfig;
    };
}
