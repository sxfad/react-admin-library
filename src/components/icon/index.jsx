import React from 'react';
import PropTypes from 'prop-types';
import * as allIcons from '@ant-design/icons/es/icons';
import AntdIcon, { createFromIconfontCN, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import { withThemeSuffix, removeTypeTheme, getThemeFromTypeName, alias } from './utils';
import warning from './warning';

const iconsMap = allIcons;

function LegacyTypeIcon(props) {
    const type = props.type;
    const theme = props.theme;

    // 直接使用 AppstoreOutlined 字符串作为type
    let targetIconComponent = iconsMap[type];
    if (targetIconComponent) {
        return targetIconComponent ? React.createElement(targetIconComponent, props) : null;
    }

    if (theme) {
        const themeInName = getThemeFromTypeName(type);
        warning(!themeInName || theme === themeInName, 'Icon', 'The icon name \''.concat(type, '\' already specify a theme \'').concat(themeInName, '\',') + ' the \'theme\' prop \''.concat(theme, '\' will be ignored.'));
    }

    // antd 3 时兼容处理，type: appstore
    const computedType = withThemeSuffix(removeTypeTheme(alias(type)), theme || 'outlined');
    targetIconComponent = iconsMap[computedType];
    warning(targetIconComponent, 'Icon', 'The icon name \''.concat(type, '\'').concat(theme ? 'with '.concat(theme) : '', ' doesn\'t exist, please check it at https://ant.design/components/icon'));
    return targetIconComponent ? React.createElement(targetIconComponent, props) : null;
}

function Icon(props) {
    const { type, component, children } = props;

    warning(Boolean(type || component || children), 'Icon', 'Should have `type` prop or `component` prop or `children`.');

    if (component || children) {
        return React.createElement(AntdIcon, Object.assign({}, props));
    }

    if (typeof type === 'string') {
        return React.createElement(LegacyTypeIcon, Object.assign({}, props, {
            type: type,
        }));
    }

    return React.createElement(AntdIcon, null);
}

Icon.propTypes = {
    /** 注释啥的 */
    type: PropTypes.string.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
};

Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
export default Icon;
