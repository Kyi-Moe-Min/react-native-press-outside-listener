import React from 'react';
import {Pressable} from 'react-native';
import {isElementIncludedInParent} from './util';

const {createContext, useContext, useRef} = require('react');

const pressOutsideContext = createContext({
  useAddListener(ref) {
    return listener => () => {};
  },
});

/**
 *
 * @param {{
 * children:any;
 * style?:import('react-native').StyleProp<import('react-native').ViewStyle>
 * }} param0
 * @returns
 */
export function PressOutsideProvider({children, style}) {
  /**
   * @type {import('react').MutableRefObject<{
   * elementRef:import('react').MutableRefObject<any>,
   * listeners:(()=>void)[]
   * }[]>}
   */
  const refs = useRef([]);

  /**
   * @param {import('react-native').GestureResponderEvent} e
   */
  function onTouch(e) {
    refs.current.forEach(ref => {
      // @ts-ignore
      if (!isElementIncludedInParent(e.target, ref.elementRef.current))
        ref.listeners.forEach(callback => callback());
    });
  }

  /**
   *
   * @param {import('react').MutableRefObject<any>} ref
   * @returns add listener function
   */
  function addRef(ref) {
    if (!refs.current.find(r => r.elementRef === ref))
      refs.current.push({elementRef: ref, listeners: []});
    return listener => addListener(listener, ref);
  }

  /**
   *
   * @param {()=>void} listener
   * @param {import('react').MutableRefObject<any>} ref
   * @returns remove listener function
   */
  function addListener(listener, ref) {
    refs.current.find(r => r?.elementRef === ref).listeners.push(listener);
    return () => removeListener(listener, ref);
  }

  /**
   *
   * @param {()=>void} listener
   * @param {import('react').MutableRefObject<any>} ref
   * @returns
   */
  function removeListener(listener, ref) {
    const refIndex = refs.current.findIndex(r => r.elementRef === ref);
    if (refIndex === -1) return;

    if (refs.current[refIndex].listeners.length <= 1) {
      refs.current.splice(refIndex, 1);
    } else {
      const listeners = refs.current[refIndex].listeners;
      const listenerIndex = listeners.findIndex(l => l === listener);
      if (listenerIndex !== -1) listeners.splice(listenerIndex, 1);
    }
  }

  return (
    <pressOutsideContext.Provider
      value={{
        useAddListener: addRef,
      }}>
      <Pressable style={[{flex: 1}, style]} onTouchStart={onTouch}>
        {children}
      </Pressable>
    </pressOutsideContext.Provider>
  );
}

/**
 * @param {import('react').MutableRefObject} ref
 * @returns
 */
export const usePressOutsideListener = ref =>
  useContext(pressOutsideContext).useAddListener(ref);
