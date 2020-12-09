import React from 'react';
import { Modal } from 'antd';
import 'antd/lib/modal/style/index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
