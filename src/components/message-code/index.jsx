import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Input, Button, Spin} from 'antd';
import styles from  './style.module.less';

MessageCode.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    time: PropTypes.number,
    buttonType: PropTypes.string,
    onSend: PropTypes.func, // 返回true 或 promise.resolve(true) 则开始倒计时并按钮不可点击 其他不倒计时
    placeholder: PropTypes.string,
    wrapperProps: PropTypes.object,
    buttonProps: PropTypes.object,
};
MessageCode.defaultProps = {
    time: 60,
    buttonType: 'default',
    wrapperProps: {},
    buttonProps: {},
    placeholder: '请输入短信验证码',
};

export default MessageCode;

function MessageCode(props) {
    const {
        time,
        buttonType,
        onSend,
        wrapperProps,
        buttonProps,
        placeholder,

        ...others
    } = props;
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        try {
            setLoading(true);

            const ok = onSend && await onSend();

            if (ok === true) {
                setCount(time);
            }

        } finally {
            setLoading(false);
        }
    }

    // 开始倒计时
    useEffect(() => {
        const st = setTimeout(() => {
            const nextCount = count - 1;

            if (nextCount < 0) window.clearTimeout(st);

            setCount(nextCount);
        }, 1000);

        return () => clearInterval(st);
    }, [count]);

    // 时间大于 0 发送按钮不可点击
    const disabled = count > 0;

    return (
        <Spin spinning={loading} size="small">
            <div style={{display: 'flex', position: 'relative', ...(wrapperProps.style || {})}} {...wrapperProps}>
                <Input
                    className={buttonType === 'text' ? styles.buttonTextInput : ''}
                    placeholder={placeholder}
                    {...others}
                />
                <Button
                    className={buttonType === 'text' ? styles.buttonText : ''}
                    type={buttonType}
                    disabled={disabled}
                    style={{flex: '0 0 111px', width: 111, marginLeft: 4}}
                    onClick={handleClick}
                    {...buttonProps}
                >
                    {disabled ? `重新发送(${count}s)` : '发送验证码 '}
                </Button>
            </div>
        </Spin>
    );
}
