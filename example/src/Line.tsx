import React, { useState, FC, useEffect } from 'react';

import './Line.css';

interface ILineProps {
  intervalInMs: number;
}

export const Line: FC<ILineProps> = ({ intervalInMs }: ILineProps) => {
  const [persents, setPersents] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPersents((prevState) => {
        if (prevState === 100) {
          return 1;
        }

        return prevState + 1;
      });
    }, intervalInMs / 100);

    return () => {
      clearInterval(interval);
    };
  }, [intervalInMs]);

  return <div style={{ width: `${persents}%` }} className="line" />;
};
