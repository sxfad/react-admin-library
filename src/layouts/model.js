import {getSelectedMenuByPath, isMobile} from '../util';
import * as tree from '../util/tree';
import * as util from '../util/index';

export const PAGE_FRAME_LAYOUT = {
    TOP_SIDE_MENU: 'top-side-menu',
    TOP_MENU: 'top-menu',
    SIDE_MENU: 'side-menu',
};

// 进行本地存储同步，syncState中的同步是区分用户的，会导致未登录的页面与登录后的页面有差异
const setItem = (key, value) => window.localStorage.setItem(key, value);

const persistTab = process.env.REACT_APP_PERSIST_TAB !== 'false';

const INIT_WIDTH = 256;

export default {
    initialState: {
        theme: 'default',
        appName: 'React Admin',
        breadcrumbs: [],    // 面包屑数据 [{key, text, path}]
        title: '',          // 页面title {text, icon}
        showHead: false,     // 页面头部是否显示
        headFixed: true,    // 页面头部是否固定
        loading: false,
        loadingTip: '',

        showSide: true,
        sideWidth: INIT_WIDTH,          // 左侧展开时宽度
        sideCurrentWidth: INIT_WIDTH,   // 左侧实际宽度
        sideCollapsedWidth: 80,         // 收起时宽度
        sideCollapsed: false,           // 是否展开/收起
        sideDragging: false,            // 是否正在拖动

        openKeys: [],               // 当前展开菜单keys
        selectedMenu: null,         // 当前选中菜单
        topMenu: [],                // 当前选中菜单的顶级菜单
        keepOtherMenuOpen: true,    // 点击菜单进入页面时，保持其他菜单打开状态
        menus: [],                  // 菜单数据，树状结构
        plainMenus: [],             // 菜单数据，扁平化

        loginUser: void 0,          // 当前登录用户
        permissions: [],            // 当前登录用户权限 [code, code, ...]
        userPaths: [],              // 当前登录用户可用的路由path，用于过滤前端路由，解决页面越权访问。[path, path, ...]
        primaryColor: '#a054d3',    // 主题主颜色
        keepAlive: false,           // 页面切换回去之后，保持内容，通过显示隐藏div实现，不知道会有什么坑！！！性能？各个互相干扰？
        noFrame: false,             // 不需要头部、左侧菜单，一般用于将此项目嵌入到其他项目中
        isMobile,

        pageFrameLayout: isMobile ? PAGE_FRAME_LAYOUT.SIDE_MENU : PAGE_FRAME_LAYOUT.SIDE_MENU,

        tabs: [],                   // 所有的tab配置 {path, text, icon, component, active, scrollTop}
        showTabs: false,

        // 全局设置
        defaultShowSide: true,
        defaultShowHead: false,
        defaultHeadFixed: false,
        defaultShowTabs: false,
    },
    syncStorage: {
        sideWidth: true,
        sideCurrentWidth: true,
        sideCollapsed: true,

        openKeys: true,
        selectedMenu: true,
        topMenu: true,
        keepOtherMenuOpen: true,

        keepAlive: true,
        tabs: persistTab ? [{path: true, text: true, icon: true, active: true, scrollTop: true}] : false,

        pageFrameLayout: true,
        showTabs: true,

        defaultShowSide: true,
        defaultShowHead: true,
        defaultHeadFixed: true,
        defaultShowTabs: true,
    },

    setAntdPrefixCls: antdPrefixCls => ({antdPrefixCls}),

    setDefaultShowSide: defaultShowSide => ({defaultShowSide}),
    setShowSideToDefault: (arg, state) => {
        let sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
        sideCurrentWidth = state.defaultShowSide ? sideCurrentWidth : 0;

        return {showSide: state.defaultShowSide, sideCurrentWidth};
    },

    setDefaultShowHead: defaultShowHead => ({defaultShowHead}),
    setShowHeadToDefault: (arg, state) => {
        return {showHead: state.defaultShowHead};
    },

    setDefaultHeadFixed: defaultHeadFixed => ({defaultHeadFixed}),
    setHeadFixedToDefault: (arg, state) => {
        return {headFixed: state.defaultHeadFixed};
    },

    setDefaultShowTabs: defaultShowTabs => ({defaultShowTabs}),
    setShowTabsToDefault: (arg, state) => {
        return {showTabs: state.defaultShowTabs};
    },

    setHeadFixed: headFixed => ({headFixed}),

    showHead: () => ({showHead: true}),
    hideHead: () => ({showHead: false}),

    setTitle: (title) => ({title}),

    setBreadcrumbs: (breadcrumbs) => ({breadcrumbs}),
    appendBreadcrumbs: (appendBreadcrumbs, state) => {
        let {breadcrumbs = []} = state;
        breadcrumbs = breadcrumbs.concat(appendBreadcrumbs);
        return {breadcrumbs};
    },

    showLoading: (loadingTip) => ({loading: true, loadingTip}),
    hideLoading: () => ({loading: false, loadingTip: ''}),

    setSideDragging: (sideDragging) => ({sideDragging}),
    hideSide: () => {
        // 如果是手机，让隐藏函数失效
        if (isMobile) {
            return {showSide: true};
        }

        return {showSide: false, sideCurrentWidth: 0};
    },
    showSide: (args, state) => {
        const sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;

        return ({showSide: true, sideCurrentWidth});
    },
    setSideWidth: (sideWidth, state) => {
        let sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : sideWidth;
        if (!state.showSide) sideCurrentWidth = 0;

        return {sideWidth, sideCurrentWidth};
    },
    initSideWidth: (args, state) => {
        let sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : INIT_WIDTH;
        if (!state.showSide) sideCurrentWidth = 0;

        return {sideWidth: INIT_WIDTH, sideCurrentWidth};
    },
    setSideCollapsed: (sideCollapsed, state) => {
        let sideCurrentWidth = sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;
        if (!state.showSide) sideCurrentWidth = 0;

        return {sideCollapsed, sideCurrentWidth};
    },

    setKeepOtherMenuOpen: (keepOtherMenuOpen) => ({keepOtherMenuOpen}),
    setOpenKeys: (openKeys) => ({openKeys}),
    setMenus: (menus) => ({menus}),
    setPlainMenus: (plainMenus) => ({plainMenus}),
    getMenuStatus: (arg, state) => {
        const path = window.location.pathname;
        const {keepOtherMenuOpen} = state;

        let openKeys = [...state.openKeys];
        let selectedMenu = getSelectedMenuByPath(path, state.menus);
        let topMenu = {};

        // 如果没有匹配到，使用上一次菜单
        if (!selectedMenu && path !== '/') { // 首页除外
            selectedMenu = state.selectedMenu;
        }

        if (selectedMenu) {
            topMenu = tree.getTopNodeByNode(state.menus, selectedMenu);
            const parentKeys = selectedMenu.parentKeys || [];

            openKeys = keepOtherMenuOpen ? openKeys.concat(parentKeys) : [...parentKeys];

            openKeys = util.uniqueArray(openKeys);
        }

        return {
            topMenu,
            selectedMenu,
            openKeys,
        };
    },

    setKeepPage: keepAlive => ({keepAlive}),

    showTabs: showTabs => ({showTabs}),
    setTabs: tabs => ({tabs}),
    setCurrentTabTitle: (title, state) => {
        const tabs = [...state.tabs];
        const tab = tabs.find(item => item.active);

        if (tab) {
            if (typeof title === 'string') {
                tab.text = title;
            }

            if (typeof title === 'object') {
                tab.text = title?.text || tab.text;
                tab.icon = title?.icon || tab.icon;
            }
        }

        return {tabs};
    },

    setPrimaryColor: (primaryColor) => {
        setItem('primaryColor', primaryColor);

        return {primaryColor};
    },

    setAppName: appName => ({appName}),
    setLoginUser: (loginUser) => ({loginUser}),
    setPermissions: (permissions) => ({permissions}),
    setUserPaths: userPaths => ({userPaths}),
    setPageFrameLayout: (pageFrameLayout, state) => {
        let sideCurrentWidth = state.sideCollapsed ? state.sideCollapsedWidth : state.sideWidth;

        let defaultShowSide = true;
        if (pageFrameLayout === PAGE_FRAME_LAYOUT.TOP_MENU) {
            sideCurrentWidth = 0;
            defaultShowSide = false;
        }

        return {pageFrameLayout, sideCurrentWidth, defaultShowSide};
    },
};
