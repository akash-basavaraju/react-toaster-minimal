# `react-toaster-minimal`

This is a package for showing the Toast Message in a React Project. It is Compatible with `Typescript`.

## How to Use

First install the package with npm

`$ npm i react-toaster-minimal --save`

Import the ToastProvider and wrap it with your main App Component.

```js
import ToastProvider from "react-toaster-minimal";
import App from "./App.js";

function main() {
  return (
    <>
      <ToastProvider>
        <App />
      </ToastProvider>
    </>
  );
}
```

Then inside the App Component, you can use the Toaster.

import useToast Hook and then call it to get the showToast method. Call the showToast method to trigger the toast.

```js
import { useToast } from "react-toaster-minimal";

function ChildComponent() {
  const showToast = useToast();

  return (
    <button
      onClick={() => {
        showToast({ title: "ButtonClicked" });
      }}
    >
      Show Toast
    </button>
  );
}
```

## API

### ToastProvider

`<ToastProvider/>` Component has an optional prop called `animationTimeInMs`, here you can pass the number in milli seconds. By default, it will be `500`;

`showToast({})` method takes a JS Object, which has the following interface.
|Key|Value Type|Is Optional|Info|
|---|----------|-----------|-|
|title|string|No|
|subTitle|string|Yes|will be displayed in small font size, below the title|
|textColor|string|Yes|same as CSS `font-color`|
|bgColor|string|Yes|same as CSS `background-color`|
|closeTimeInMs|number|Yes|specifies the time after which, toast has to close|
|compStyle|{key: string;}|Yes|same as React Style Object for the toast `div`|

#### Raising Issues and PRs are heartly welcomed.

##### with :heart: by [Akash Basavaraju](https://github.com/akash-basavaraju)

```

```
