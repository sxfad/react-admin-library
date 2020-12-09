# 图标

## 属性

## 基础用法
```jsx
import React from 'react';
import Icon from './index';


export default () => {
    return (
        <div>
            <div>直接使用@ant-design/icons 组件名作为type</div>
            <Icon type="AppstoreOutlined" style={{ color: 'red' }}/>
            
            <div>antd3.x type 兼容处理</div>
            <Icon type="appstore"/>            
        </div>
    );
};
```

## 图标选择器

```jsx

import React from 'react';
import IconPicker from '../icon-picker'

export default () => {

    return (
        <IconPicker/>
    );
}
```
