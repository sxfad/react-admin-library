import React from 'react';
import { Button, Card, Checkbox, Radio, Alert } from 'antd';
import 'antd/lib/button/style/index.less';
import 'antd/lib/card/style/index.less';
import 'antd/lib/checkbox/style/index.less';
import 'antd/lib/radio/style/index.less';
import 'antd/lib/alert/style/index.less';
import model from '../../hoc/modal-hoc';
import ModalContent from '../../hoc/modal-hoc/ModalContent';
import { PAGE_FRAME_LAYOUT } from '../../layouts/model';

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const cardStyle = {
    margin: 16,
    flex: 1,
};
const contentStyle = {
    display: 'flex',
};

export default model({
    title: '系统设置',
    width: 800,
})(function SettingModal(props) {
    const {
        onCancel,
        layoutState: {
            defaultShowHead,
            defaultHeadFixed,
            keepOtherMenuOpen,
            pageFrameLayout,
            defaultShowTabs,
        },
        action: { layout },
    } = props;

    function handlePageFrameLayoutChange(e) {
        const { value } = e.target;
        if (value === PAGE_FRAME_LAYOUT.TOP_MENU) {
            layout.initSideWidth();
            layout.setSideCollapsed(false);
        }
        layout.setPageFrameLayout(value);
    }

    return (
        <ModalContent
            footer={<Button onClick={onCancel}>关闭</Button>}
        >
            <div style={contentStyle}>
                <Card title="页头设置" style={cardStyle}>
                    <Checkbox
                        onChange={e => {
                            const { checked } = e.target;
                            layout.setDefaultShowHead(checked);
                            checked ? layout.showHead() : layout.hideHead();
                        }}
                        checked={defaultShowHead}
                    >显示头部</Checkbox>

                    {defaultShowHead ? (
                        <Checkbox
                            onChange={e => {
                                const { checked } = e.target;
                                layout.setDefaultHeadFixed(checked);
                                layout.setHeadFixed(checked);
                            }}
                            checked={defaultHeadFixed}
                        >头部固定</Checkbox>
                    ) : null}

                    {/*<div style={{ marginTop: 8 }}>*/}
                    {/*    <Checkbox*/}
                    {/*        onChange={this.handleKeepPageChange}*/}
                    {/*        checked={keepAlive}*/}
                    {/*    >*/}
                    {/*        页面保持*/}
                    {/*        <span style={{ color: 'red' }}>(Beta)</span>*/}
                    {/*    </Checkbox>*/}
                    {/*</div>*/}

                    <div style={{ marginTop: 8 }}>
                        <Checkbox
                            onChange={e => {
                                const { checked } = e.target;
                                layout.setDefaultShowTabs(checked);
                                layout.showTabs(checked);
                            }}
                            checked={defaultShowTabs}
                        >
                            显示Tab页
                        </Checkbox>
                    </div>
                </Card>

                <Card title="菜单设置" style={cardStyle}>
                    <div style={{ borderBottom: '1px solid #d9d9d9', paddingBottom: 8, marginBottom: 8 }}>
                        <Checkbox
                            onChange={e => layout.setKeepOtherMenuOpen(e.target.checked)}
                            checked={keepOtherMenuOpen}
                        >保持菜单展开</Checkbox>
                    </div>
                    <div>
                        <Radio.Group onChange={handlePageFrameLayoutChange} value={pageFrameLayout}>
                            <Radio style={radioStyle} value={PAGE_FRAME_LAYOUT.TOP_SIDE_MENU}>头部+左侧菜单</Radio>
                            <Radio style={radioStyle} value={PAGE_FRAME_LAYOUT.TOP_MENU}>头部菜单</Radio>
                            <Radio style={radioStyle} value={PAGE_FRAME_LAYOUT.SIDE_MENU}>左侧菜单</Radio>
                        </Radio.Group>
                    </div>
                </Card>
            </div>
            <Alert style={{ margin: '0 16px' }} type="error" message="如果调整设置之后，页面布局有问题，请刷新浏览器~"/>
        </ModalContent>
    );
});
