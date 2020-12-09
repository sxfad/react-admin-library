import { useState, useEffect } from 'react';
import { getElementTop } from '../util';

export default function useHeight(domRef, otherHeight = 8) {

    const [ height, setHeight ] = useState(document.documentElement.clientHeight - otherHeight);

    // 窗口大小改变事件
    const handleWindowResize = () => {
        const eleTop = domRef.current ? getElementTop(domRef.current) : 0;
        const oHeight = otherHeight + eleTop;
        const windowHeight = document.documentElement.clientHeight;
        const height = windowHeight - oHeight;
        setHeight(height);
    };

    useEffect(() => {
        if (!domRef.current) return;

        handleWindowResize();
    }, [ domRef.current ]);

    // 组件加载完成
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return [ height, setHeight ];
}
