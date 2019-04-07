// @flow
import { useEffect, useRef } from 'react';
import initSimpleImg from './initSimpleImg';

export default function useImg() {
  const imgRefs = useRef(new Map());
  const register = (ref, { src, sizes, srcSet, animationDuration }) => {
    const { observer } = window.__REACT_SIMPLE_IMG__;
    observer.observe(ref);
    imgRefs.set(ref, {
      ref,
      src,
      sizes,
      srcSet,
      animationDuration,
    });
  };

  const setDocumentLoaded = () => {};

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.__REACT_SIMPLE_IMG__) {
      initSimpleImg();
    }

    return () => {
      const { observer } = window.__REACT_SIMPLE_IMG__;
      window.removeEventListener('load', setDocumentLoaded);

      imgRefs.forEach(ref => {
        observer.unobserve(ref);
      });

      imgRefs.current = null;
    };
  }, []);

  return {
    register,
  };
}
