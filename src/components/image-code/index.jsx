import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Input, Spin} from 'antd';
import imageError from './imageError.jpg';
import styles from './style.module.less';

ImageCode.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    // src: string类型时，直接作为图片的src input value 为 string
    //      func  类型时，返回值如果是string，直接作为图片src input value 为 string
    //                  返回值如果是[id, url]，数组第一个元素作为验证码id，第二个元素作为图片src input value 为 [id, code]
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    placeholder: PropTypes.string,
    errorImage: PropTypes.string,
};
ImageCode.defaultProps = {
    placeholder: '请输入图片验证码',
};

export default ImageCode;

function ImageCode(props) {
    const {
        src,
        placeholder,
        onChange,
        value,
        errorImage,
        ...others
    } = props;

    const imgRef = useRef(null);

    const [url, setUrl] = useState('');
    const [id, setId] = useState(null);
    const [code, setCode] = useState(undefined);
    const [loading, setLoading] = useState(false);

    async function handleClick() {

        // 后端地址可直接作为src的情况
        if (typeof src === 'string') {
            setUrl(`${src}?t=${Date.now()}`);
        }

        // ajax请求之后两种情况，一种 [id, url] 一种 url
        if (typeof src === 'function') {
            setLoading(true);
            try {
                const result = await src();

                if (typeof result === 'string') setUrl(result);

                if (Array.isArray(result)) {
                    setId(result[0]);
                    setUrl(result[1]);
                }
            } finally {
                setLoading(false);
            }
        }
    }

    function handleChange(e) {
        const code = e.target.value;

        if (id) {
            onChange([id, code]);
        } else {
            onChange(code);
        }
    }

    function handleError() {
        setUrl(errorImage || imageError);
    }

    useEffect(() => {
        if (typeof value === 'string') setCode(value);

        if (Array.isArray(value)) {
            setCode(value[1]);
        }

    }, [value]);

    useEffect(() => {
        (async () => {
            await handleClick();
        })();
    }, []);
    return (
        <Spin spinning={loading} size="small">
            <div style={{display: 'flex', position: 'relative'}}>
                <Input
                    className={styles.input}
                    placeholder={placeholder}
                    value={code}
                    onChange={handleChange}
                    {...others}
                />
                <img
                    ref={imgRef}
                    className={styles.img}
                    src={url}
                    alt="图片验证码"
                    onClick={handleClick}
                    onError={handleError}
                />
            </div>
        </Spin>
    );
}
