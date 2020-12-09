# 复制文本

```jsx
/**
title: 基础用法
desc: 点击图标，复制内容 
*/
import React from 'react';
import {Copy} from 'ra-lib';

export default () => {
    const content = '点击图标进行复制';

    return (
        <div>
            {content}:
            <Copy text={content}/> 
        </div>
    );
}
```
