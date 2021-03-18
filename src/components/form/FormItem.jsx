import React from 'react';
import {Form} from 'antd';
import {getFormElement, getPlaceholder, getRules} from './util';
import PropTypes from 'prop-types';

const {Item} = Form;

FormItem.propTypes = {
    maxLength: PropTypes.number, // 允许输入最大字符数
    minLength: PropTypes.number, // 允许输入最小字符数
    // 类型
    type: PropTypes.string,
    component: PropTypes.any,
    children: PropTypes.any,
    noSpace: PropTypes.bool,

    // Form.Item属性
    colon: PropTypes.any,
    dependencies: PropTypes.any,
    extra: PropTypes.any,
    getValueFromEvent: PropTypes.any,
    getValueProps: PropTypes.any,
    hasFeedback: PropTypes.any,
    help: PropTypes.any,
    hidden: PropTypes.any,
    htmlFor: PropTypes.any,
    initialValue: PropTypes.any,
    label: PropTypes.any,
    labelAlign: PropTypes.any,
    labelCol: PropTypes.any,
    messageVariables: PropTypes.any,
    name: PropTypes.any,
    normalize: PropTypes.any,
    noStyle: PropTypes.any,
    preserve: PropTypes.any,
    required: PropTypes.any,
    rules: PropTypes.any,
    shouldUpdate: PropTypes.any,
    tooltip: PropTypes.any,
    trigger: PropTypes.any,
    validateFirst: PropTypes.any,
    validateStatus: PropTypes.any,
    validateTrigger: PropTypes.any,
    valuePropName: PropTypes.any,
    wrapperCol: PropTypes.any,
    // 其他为Element 属性
    style: PropTypes.object,
    placeholder: PropTypes.any,
    options: PropTypes.array,
    treeData: PropTypes.array,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onCheck: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    autoFocus: PropTypes.bool,
};

FormItem.defaultProps = {
    type: 'input',
    noSpace: false,
};

export default function FormItem(props) {
    let {
        // 类型
        type,
        component,
        children,
        noSpace,

        // Form.Item属性
        colon,
        dependencies,
        extra,
        getValueFromEvent,
        getValueProps,
        hasFeedback,
        help,
        hidden,
        htmlFor,
        initialValue,
        label,
        labelAlign,
        labelCol,
        messageVariables,
        name,
        normalize,
        noStyle,
        preserve,
        required,
        shouldUpdate,
        tooltip,
        trigger,
        validateFirst,
        validateStatus,
        validateTrigger,
        valuePropName,
        wrapperCol,
        // 其他为Element 属性
        style,
        ...others
    } = props;

    // 容错处理，如果编写了options，默认type为select
    if (others.options && type === 'input') type = 'select';

    // 处理样式
    if (!style) style = {};
    if (!('width' in style)) style.width = '100%';

    // 处理 placeholder
    const placeholder = getPlaceholder(props);

    // 处理校验规则
    const rules = getRules({...props, placeholder});

    const element = getFormElement({
        type,
        component,
        children,
        style,
        placeholder,
        ...others,
    });

    return (
        <Item
            colon={colon}
            dependencies={dependencies}
            extra={extra}
            getValueFromEvent={getValueFromEvent}
            getValueProps={getValueProps}
            hasFeedback={hasFeedback}
            help={help}
            hidden={hidden}
            htmlFor={htmlFor}
            initialValue={initialValue}
            label={label}
            labelAlign={labelAlign}
            labelCol={labelCol}
            messageVariables={messageVariables}
            name={name}
            normalize={normalize}
            noStyle={noStyle}
            preserve={preserve}
            required={required}
            rules={rules}
            shouldUpdate={shouldUpdate}
            tooltip={tooltip}
            trigger={trigger}
            validateFirst={validateFirst}
            validateStatus={validateStatus}
            validateTrigger={validateTrigger}
            valuePropName={valuePropName}
            wrapperCol={wrapperCol}
        >
            {element}
        </Item>
    );
}
