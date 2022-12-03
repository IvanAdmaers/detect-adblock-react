# Detect AdBlock React

<div align="center">
  <a href="https://www.npmjs.com/package/detect-adblock-react">
    <img alt="npm version" src="https://img.shields.io/npm/v/detect-adblock-react" />
  </a>
  <a href="https://www.npmjs.com/package/detect-adblock-react">
    <img alt="npm downloads" src="https://img.shields.io/npm/dm/detect-adblock-react" />
  </a>
    <a href="https://www.npmjs.com/package/detect-adblock-react">
    <img alt="license" src="https://img.shields.io/npm/l/detect-adblock-react" />
  </a>
</div>

AdBlock detector for React. Live example - [detect-adblock-react.ivanadmaers.com](https://detect-adblock-react.ivanadmaers.com)

<div align="center">
  <a href="https://detect-adblock-react.ivanadmaers.com">
    <img src="https://i.ibb.co/TvThsZ0/detect-adblock-react.png" alt="Detect AdBlock React Example" />
  </a>
</div>

## Features

- ✅ Ease of use
- 🔧 Well-tested
- 📦 Lightweight
- 📝 MIT license 
- 🎉 NextJS, GatsbyJS and RemixJS support

## Installation

```bash
# Via npm:
npm i detect-adblock-react

# Via yarn:
yarn add detect-adblock-react
```

## Usage

```jsx
import React from 'react';
import { useDetectAdblock } from 'detect-adblock-react';

const App = () => {
  const { adBlockDetected } = useDetectAdblock();

  return (
    <div>
      {adBlockDetected === null && <p>Defining…</p>}
      {adBlockDetected === false && <p>AdBlock was not detected</p>}
      {adBlockDetected === true && <p>AdBlock was detected</p>}
    </div>
  );
};

export default App;
```

## Hook returns

*adBlockDetected* - was AdBlock detected or not. Null only when defining for the first time - null | boolean  

*detect* - call this function if you need to check AdBlock one more time - function  
```jsx
const { adBlockDetected, detect } = useDetectAdblock();

useEffect(() => {
  setTimeout(() => {
    // Check AdBlock again after time
    detect();
  }, 5 * 1000);
}, []);
```

## Local development

1. Clone the project

2. Run

```bash
npm ci i

npm start
```

The last command runs webpack to compile our package to a dist folder

3. cd example/  

4. Run

```bash
npm ci i

npm start
```

The last command runs webpack dev server  

5. Enjoy the magic!  

## License

[MIT](./LICENSE.md)

Copyright (c) 2022-present, Ivan Admaers
