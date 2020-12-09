import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';

export default function(props) {
    const { style = {}, ...others } = props;
    return (
        <div style={{ textAlign: 'center', ...style }} {...others}>
            Copyright <CopyrightOutlined/> xxx 2019
        </div>
    );
}
