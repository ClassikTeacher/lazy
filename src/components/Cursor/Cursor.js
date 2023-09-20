import React, { useEffect, useRef, useState } from 'react'
import * as styles from './Cursor.module.css'
import { defaultState } from '../../context/GlobalContext';

const hoverSelector =
    'a, button, input, label, [role="slider"], [role="link"], [role="button"], .js-custom-hoverable, .react-select__control';

const Cursor = (props)=>{
    const el = useRef(null)
    
    const rAF = useRef(0);
    const mouse = useRef({
        x: typeof window === 'undefined' ? 0 : defaultState.cursorX,
        y: typeof window === 'undefined' ? 0 : defaultState.cursorY,
    });

    const scale = useRef(1);

    useEffect(() => {
        function getMouseCoords(event) {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
            defaultState.cursorX = event.clientX
            defaultState.cursorY = event.clientY

        }

        document.addEventListener('mousemove', getMouseCoords);

        return () => {
            document.removeEventListener('mousemove', getMouseCoords);
        };
    }, []);

    useEffect(() => {
        el.current.style.display = 'none'
        function render() {

            if (el.current) {
                el.current.style.transform = `translate3d(${mouse.current.x}px, ${ mouse.current.y}px, 0)`;  
            }
        }

        function animate() {
            render();
            rAF.current = requestAnimationFrame(animate);
        }

        rAF.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rAF.current);
        };
    }, []);

    useEffect(() => {
        let handleHoverMouseEnterDelegation;
        let handleHoverMouseLeaveDelegation;

        if (typeof window !== 'undefined') {
            import('delegate').then(({ default: delegate }) => {
                const handleHoverMouseEnter = () => {
                    el.current.style.display = 'block'
                };
                
                const handleHoverMouseLeave = (event) => {
                    if (!event.toElement?.closest(hoverSelector)) {
                        el.current.style.display = 'none'
                    }
                };



                handleHoverMouseEnterDelegation = delegate(hoverSelector, 'mouseenter', handleHoverMouseEnter, true);
                handleHoverMouseLeaveDelegation = delegate(hoverSelector, 'mouseleave', handleHoverMouseLeave, true);
            });
        }

        return () => {
            handleHoverMouseEnterDelegation?.destroy();
            handleHoverMouseLeaveDelegation?.destroy();
 
        };
    }, []);

    return(
        <div
            ref={el}
            className={`${styles.cursor}`}
        >

        </div>
    )
}
export default Cursor