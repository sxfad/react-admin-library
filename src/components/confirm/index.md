# 确认框

```jsx
/**
title: 基础用法
desc: 配合 async await 使用 
*/
import React from 'react';
import {Button} from 'antd';

import {confirm} from 'ra-lib';

export default () => {
    async function handleDelete(){
        await confirm({
            title: '温馨提示',
            content: '您确定吗？'
        });
    
        alert('用户确定了！')
    }

    return (<Button danger onClick={handleDelete}>删除</Button>)
}
```
