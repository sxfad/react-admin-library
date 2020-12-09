import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

/**
 * 批量删除提示
 * @param count 需要删除的记录个数
 * @returns {Promise<unknown>}
 */
export default function batchDeleteConfirm(count) {
    const content = (
        <div>
            您确定删除
            <span style={{ padding: '0 5px', color: 'red', fontSize: 18 }}>
                {count}
            </span>
            条记录吗？
        </div>
    );
    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: '温馨提示',
            content,
            icon: <ExclamationCircleOutlined/>,
            okType: 'danger',
            okText: '确定',
            cancelText: '取消',
            onOk: () => resolve(true),
            onCancel: () => reject('user cancel confirm'),
        });
    });
}
