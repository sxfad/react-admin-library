# 右键菜单

```jsx
/**
title: 基础用法
desc: 右击弹出菜单 
*/
import React from 'react';
import {Button, Menu} from 'antd';

import {ContextMenu} from 'ra-lib';

export default () => {
    function handleMenuClick(key) {
        alert(key);
    }
    return (
        <div>
            <ContextMenu
                content={(
                    <Menu
                        selectable={false}
                        onClick={({ key }) => handleMenuClick(key)}
                    >
                        <Menu.Item key="close">
                            关闭
                        </Menu.Item>
                        <Menu.Item key="closeAll">
                            关闭全部
                        </Menu.Item>
                    </Menu>
                )}
            >
                <Button>右键试试</Button>
            </ContextMenu>
        </div>
    );
}
```
