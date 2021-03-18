import {Modal} from 'antd';

/**
 * 确认框，promise方式，可以配合 async await 使用
 * @param props
 * @returns {Promise<unknown>}
 * @constructor
 */
export default function modalConfirm(props) {
    let options = {};
    if (!props) options = {title: '您确定吗？'};
    if (typeof props === 'string') options = {content: props};
    if (typeof props === 'object') options = props;

    return new Promise((resolve, reject) => {
        Modal.confirm({
            title: '温馨提示',
            onOk: () => resolve(true),
            onCancel: () => reject('user cancel confirm'),
            ...options,
        });
    });
}
