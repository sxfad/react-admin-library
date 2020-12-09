import React from 'react';
import { Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

/**
 * confirm 封装
 * @param title 标题
 * @param content 内容
 * @returns {Promise<unknown>}
 */
export default async ({ title, content }) => {
    return new Promise((resolve, reject) => {
        Modal.confirm({
            icon: <QuestionCircleOutlined/>,
            title,
            content: <div style={{ marginTop: 8, fontSize: 14, color: 'red' }}>{content}</div>,
            okText: '确定',
            cancelText: '取消',
            onOk: () => resolve(),
            onCancel: () => reject('取消确认'),
        });
    });
}
