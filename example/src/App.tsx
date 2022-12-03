import React, { FC, useEffect } from 'react';
import { useDetectAdblock } from 'detect-adblock-react';

import { Line } from './Line';

import './App.css';

const getAdBlockText = (status: null | boolean) => {
  switch (status) {
    case null:
      return 'defining…';

    case true:
      return 'yes, got you';

    case false:
      return 'no, you are a legend';

    default:
      return '¯_(ツ)_/¯';
  }
};

const checkEvery = 10 * 1000; // in ms

export const App: FC = () => {
  const { adBlockDetected, detect } = useDetectAdblock();

  useEffect(() => {
    const interval = setInterval(() => {
      detect();
    }, checkEvery);

    return () => {
      clearInterval(interval);
    };
  }, [detect]);

  return (
    <div>
      <Line intervalInMs={checkEvery} />
      <header>
        <h1 className="header-title">Detect Adblock React</h1>
        <div className="header-links-list">
          <a
            className="header-link"
            rel="noopener noreferrer"
            href="https://github.com/IvanAdmaers/detect-adblock-react"
          >
            GitHub
          </a>
          <a
            className="header-link"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/package/detect-adblock-react"
          >
            npm
          </a>
        </div>
      </header>
      <section className="content">
        <p>Do you have AdBlock: {getAdBlockText(adBlockDetected)}</p>
        <p className="info">Checking every {checkEvery / 1000} seconds</p>
      </section>
    </div>
  );
};
