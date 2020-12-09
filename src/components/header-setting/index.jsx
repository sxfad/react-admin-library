import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import SettingModal from './SettingModal';
import styles from './style.module.less';


const HeaderSetting = props => {
    const [ visible, setVisible ] = useState(false);

    return (
        <>
            <div className={styles.root} onClick={() => setVisible(true)}>
                <SettingOutlined/>
            </div>
            <SettingModal
                {...props}
                visible={visible}
                onOk={() => {
                    setVisible(false);

                    // 刷新页面
                    window.location.reload();
                }}
                onCancel={() => setVisible(false)}
            />
        </>
    );
};

HeaderSetting.propTypes = {
    action: PropTypes.object,
    layoutState: PropTypes.object,
};

export default HeaderSetting;
