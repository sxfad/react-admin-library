# 删除提示

```jsx
/**
title: 基础用法
desc: 狗蛋 
*/
import React from 'react';
import {Button} from 'antd';

import {batchDeleteConfirm} from 'ra-lib';

export default () => {
    async function handleDelete(){
        await batchDeleteConfirm(8);
    
        alert('用户确定了！')
    }

    return (<Button danger onClick={handleDelete}>删除</Button>)
}
```
