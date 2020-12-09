import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import 'antd/lib/tooltip/style/index.less';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Copy = props => {
    const [ copyTip, setCopyTip ] = useState('复制');
    const { text, style = {}, ...others } = props;

    return (
        <CopyToClipboard
            text={text}
            onCopy={() => {
                setCopyTip('复制成功！🎉');
            }}>
            <Tooltip title={copyTip}>
                <CopyOutlined
                    style={{ margin: '0 8px', ...style }}
                    onBlur={() => {
                        setCopyTip('复制');
                    }}
                    {...others}
                />
            </Tooltip>
        </CopyToClipboard>
    );
};

Copy.propTypes = {
    text: PropTypes.string,
};

export default Copy;
