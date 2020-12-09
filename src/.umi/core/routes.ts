// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/wangshubin/workspace/suixingpay/react-admin-library/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../../node_modules/@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"*":[{"path":"/","title":"README","meta":{"order":null}},{"title":"Components","path":"/components","meta":{},"children":[{"path":"/components/async-select","title":"异步下拉","meta":{}},{"path":"/components/batch-delete-confirm","title":"删除提示","meta":{}},{"path":"/components/confirm","title":"确认框","meta":{}},{"path":"/components/context-menu","title":"右键菜单","meta":{}},{"path":"/components/copy","title":"复制文本","meta":{}},{"path":"/components/form-element","title":"表单元素","meta":{}},{"path":"/components/icon","title":"图标","meta":{}},{"path":"/components/operator","title":"操作","meta":{}},{"path":"/components/pagination","title":"分页组件","meta":{}},{"path":"/components/query-bar","title":"查询条","meta":{}},{"path":"/components/table-row-draggable","title":"表格行可拖拽","meta":{}},{"path":"/components/tool-bar","title":"工具条","meta":{}},{"path":"/components/user-avatar","title":"用户头像","meta":{}}]},{"title":"Layouts","path":"/layouts","meta":{},"children":[{"path":"/layouts","title":"基础框架","meta":{}}]},{"title":"Redux","path":"/redux","meta":{},"children":[{"path":"/redux","title":"redux 封装","meta":{}}]}]}},"locales":[],"navs":{},"title":"ra-lib","mode":"doc"},
      ...props,
    }),
    "routes": [
      {
        "path": "/",
        "component": require('../../../README.md').default,
        "exact": true,
        "meta": {
          "locale": "en-US",
          "title": "README",
          "order": null
        },
        "title": "README"
      },
      {
        "path": "/components/async-select",
        "component": require('../../components/async-select/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/async-select/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "异步下拉",
              "heading": "异步下拉"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "异步下拉",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "异步下拉"
      },
      {
        "path": "/components/batch-delete-confirm",
        "component": require('../../components/batch-delete-confirm/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/batch-delete-confirm/index.md",
          "updatedTime": 1607505921000,
          "slugs": [
            {
              "depth": 1,
              "value": "删除提示",
              "heading": "删除提示"
            }
          ],
          "title": "删除提示",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "删除提示"
      },
      {
        "path": "/components/confirm",
        "component": require('../../components/confirm/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/confirm/index.md",
          "updatedTime": 1607506640723,
          "slugs": [
            {
              "depth": 1,
              "value": "确认框",
              "heading": "确认框"
            }
          ],
          "title": "确认框",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "确认框"
      },
      {
        "path": "/components/context-menu",
        "component": require('../../components/context-menu/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/context-menu/index.md",
          "updatedTime": 1607508627943,
          "slugs": [
            {
              "depth": 1,
              "value": "右键菜单",
              "heading": "右键菜单"
            }
          ],
          "title": "右键菜单",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "右键菜单"
      },
      {
        "path": "/components/copy",
        "component": require('../../components/copy/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/copy/index.md",
          "updatedTime": 1607508619181,
          "slugs": [
            {
              "depth": 1,
              "value": "复制文本",
              "heading": "复制文本"
            }
          ],
          "title": "复制文本",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "复制文本"
      },
      {
        "path": "/components/form-element",
        "component": require('../../components/form-element/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/form-element/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "表单元素",
              "heading": "表单元素"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "表单元素",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "表单元素"
      },
      {
        "path": "/components/icon",
        "component": require('../../components/icon/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/icon/index.md",
          "updatedTime": 1607505921000,
          "slugs": [
            {
              "depth": 1,
              "value": "图标",
              "heading": "图标"
            },
            {
              "depth": 2,
              "value": "属性",
              "heading": "属性"
            },
            {
              "depth": 2,
              "value": "基础用法",
              "heading": "基础用法"
            },
            {
              "depth": 2,
              "value": "图标选择器",
              "heading": "图标选择器"
            }
          ],
          "title": "图标",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "图标"
      },
      {
        "path": "/components/operator",
        "component": require('../../components/operator/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/operator/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "操作",
              "heading": "操作"
            },
            {
              "depth": 2,
              "value": "何时使用",
              "heading": "何时使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "items项",
              "heading": "items项"
            }
          ],
          "title": "操作",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "操作"
      },
      {
        "path": "/components/pagination",
        "component": require('../../components/pagination/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/pagination/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "分页组件",
              "heading": "分页组件"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "分页组件",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "分页组件"
      },
      {
        "path": "/components/query-bar",
        "component": require('../../components/query-bar/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/query-bar/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "查询条",
              "heading": "查询条"
            },
            {
              "depth": 2,
              "value": "何时使用",
              "heading": "何时使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "查询条",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "查询条"
      },
      {
        "path": "/components/table-row-draggable",
        "component": require('../../components/table-row-draggable/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/table-row-draggable/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "表格行可拖拽",
              "heading": "表格行可拖拽"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 2,
              "value": "调用方式",
              "heading": "调用方式"
            }
          ],
          "title": "表格行可拖拽",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "表格行可拖拽"
      },
      {
        "path": "/components/tool-bar",
        "component": require('../../components/tool-bar/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/tool-bar/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "工具条",
              "heading": "工具条"
            },
            {
              "depth": 2,
              "value": "何时使用",
              "heading": "何时使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            },
            {
              "depth": 3,
              "value": "每一项API",
              "heading": "每一项api"
            }
          ],
          "title": "工具条",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "工具条"
      },
      {
        "path": "/components/user-avatar",
        "component": require('../../components/user-avatar/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/components/user-avatar/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "用户头像",
              "heading": "用户头像"
            },
            {
              "depth": 2,
              "value": "何时使用",
              "heading": "何时使用"
            },
            {
              "depth": 2,
              "value": "API",
              "heading": "api"
            }
          ],
          "title": "用户头像",
          "group": {
            "path": "/components",
            "title": "Components"
          }
        },
        "title": "用户头像"
      },
      {
        "path": "/layouts",
        "component": require('../../layouts/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/layouts/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "基础框架",
              "heading": "基础框架"
            },
            {
              "depth": 2,
              "value": "特性",
              "heading": "特性"
            },
            {
              "depth": 2,
              "value": "导航布局说明",
              "heading": "导航布局说明"
            },
            {
              "depth": 2,
              "value": "页面头部",
              "heading": "页面头部"
            },
            {
              "depth": 2,
              "value": "左侧菜单",
              "heading": "左侧菜单"
            },
            {
              "depth": 3,
              "value": "菜单数据",
              "heading": "菜单数据"
            },
            {
              "depth": 3,
              "value": "相关方法",
              "heading": "相关方法"
            }
          ],
          "title": "基础框架",
          "group": {
            "path": "/layouts",
            "title": "Layouts"
          }
        },
        "title": "基础框架"
      },
      {
        "path": "/redux",
        "component": require('../../redux/README.md').default,
        "exact": true,
        "meta": {
          "filePath": "src/redux/README.md",
          "updatedTime": 1607495946000,
          "slugs": [
            {
              "depth": 1,
              "value": "redux 封装",
              "heading": "redux-封装"
            },
            {
              "depth": 2,
              "value": "构建",
              "heading": "构建"
            },
            {
              "depth": 2,
              "value": "关于redux",
              "heading": "关于redux"
            },
            {
              "depth": 3,
              "value": "异步写法",
              "heading": "异步写法"
            },
            {
              "depth": 4,
              "value": "action异步写法",
              "heading": "action异步写法"
            },
            {
              "depth": 4,
              "value": "reducer 异步写法：",
              "heading": "reducer-异步写法："
            },
            {
              "depth": 3,
              "value": "redux中的异常处理",
              "heading": "redux中的异常处理"
            },
            {
              "depth": 4,
              "value": "异步异常",
              "heading": "异步异常"
            },
            {
              "depth": 4,
              "value": "同步异常",
              "heading": "同步异常"
            },
            {
              "depth": 3,
              "value": "将数据存储到localStorage中",
              "heading": "将数据存储到localstorage中"
            },
            {
              "depth": 3,
              "value": "撤销&重做",
              "heading": "撤销重做"
            }
          ],
          "title": "redux 封装",
          "group": {
            "path": "/redux",
            "title": "Redux"
          }
        },
        "title": "redux 封装"
      },
      {
        "path": "/components",
        "meta": {},
        "exact": true,
        "redirect": "/components/async-select"
      }
    ],
    "title": "ra-lib"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
