import { useState, useEffect, useCallback } from 'react';

export const initialValue = null;
// URL from https://github.com/gorhill/uBlock/blob/master/docs/tests/hostname-pool.js
const url = 'https://googlesyndication.com/';

export const useDetectAdblock = () => {
  const [startDetect, setStartDetect] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState<null | boolean>(
    initialValue,
  );

  useEffect(() => {
    // For NextJS coz initially window is not defined
    setStartDetect(true);
  }, []);

  useEffect(() => {
    if (startDetect !== true) {
      return;
    }

    const doDetectBlock = async () => {
      try {
        await fetch(url, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        });

        setAdBlockDetected(false);
      } catch (error) {
        setAdBlockDetected(true);
      } finally {
        setStartDetect(false);
      }
    };

    doDetectBlock();
  }, [startDetect]);

  const detect = useCallback(() => {
    setStartDetect(true);
  }, []);

  return { adBlockDetected, detect };
};
