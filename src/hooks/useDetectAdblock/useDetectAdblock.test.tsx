import React from 'react';
import ReactDOM from 'react-dom';
import { screen, waitFor } from '@testing-library/react';

import { useDetectAdblock, initialValue } from '.';

const setupFetchStub = (data: unknown) => {
  return () => {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve({
            data,
          }),
      });
    });
  };
};

describe('useDetectAdblock', () => {
  let container = null;

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(setupFetchStub({}));

    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
    delete global.fetch;

    document.body.removeChild(container);
    container = null;
  });

  it('should have a correct type', () => {
    expect(typeof useDetectAdblock).toBe('function');
  });

  it('should be initializated with its initial value', async () => {
    const Component = () => {
      const { adBlockDetected } = useDetectAdblock();

      return <div data-test>{JSON.stringify(adBlockDetected)}</div>;
    };

    ReactDOM.render(<Component />, container);

    await waitFor(() => {
      expect(screen.getByText(`${initialValue}`));
    });
  });

  it('should return true when fetch throw an error', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject();
      });
    });

    const Component = () => {
      const { adBlockDetected } = useDetectAdblock();

      return <div data-test>{JSON.stringify(adBlockDetected)}</div>;
    };

    ReactDOM.render(<Component />, container);

    await waitFor(() => {
      expect(screen.getByText('true'));
    });
  });

  it('should return false when fetch did not throw an error', async () => {
    const Component = () => {
      const { adBlockDetected } = useDetectAdblock();

      return <div data-test>{JSON.stringify(adBlockDetected)}</div>;
    };

    ReactDOM.render(<Component />, container);

    await waitFor(() => {
      expect(screen.getByText('false'));
    });
  });
});
