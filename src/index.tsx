import React, { useContext, useReducer } from "react";
import toastContext from "./toastContext";
import { IToastMessage, IState } from "./types";
import ToastComponent from "./ToastComponent";

const DEFAULT_TOAST_MESSAGE_TIME_MS = 5000;

export const useToast = () => {
  const [, dispatch] = useContext(toastContext);

  const showToast = (message: IToastMessage) => {
    const timestamp = Date.now();
    dispatch({
      type: "toastMsgs",
      data: {
        timestamp,
        ...message,
      },
    });
    setTimeout(() => {
      dispatch({ type: "clearMsg", data: timestamp });
    }, message.closeTimeInMs || DEFAULT_TOAST_MESSAGE_TIME_MS);
  };
  return showToast;
};

export const showToast = (message: IToastMessage) => {
  const timestamp = Date.now();
  const toastEvent = new CustomEvent("react-toaster-minimal-event", {
    detail: {
      type: "toastMsgs",
      data: {
        timestamp,
        ...message,
      },
    },
  });
  window.dispatchEvent(toastEvent);
  setTimeout(() => {
    const tEvent = new CustomEvent("react-toaster-minimal-event", {
      detail: { type: "clearMsg", data: timestamp },
    });
    window.dispatchEvent(tEvent);
  }, message.closeTimeInMs || DEFAULT_TOAST_MESSAGE_TIME_MS);
};

const reducer = (state: IState, action: { type: string; data: any }) => {
  switch (action.type) {
    case "toastMsgs": {
      return {
        toastMessages: [action.data, ...state.toastMessages],
      };
    }
    case "clearMsg": {
      const remaingToastMsgs = state.toastMessages.filter(
        (message) => message.timestamp !== +action.data
      );
      return { toastMessages: remaingToastMsgs };
    }
    // no default
  }
  return state;
};

function ToastProvider({
  children = null,
  animationTimeInMs,
}: {
  children?: React.ReactNode;
  animationTimeInMs?: number;
}) {
  const context = useReducer<
    React.Reducer<IState, { type: string; data: any }>
  >(reducer, { toastMessages: [] });
  const { Provider } = toastContext;

  return (
    <>
      <Provider value={context}>
        <ToastComponent animationTimeInMs={animationTimeInMs} />
        {children}
      </Provider>
    </>
  );
}

export { ToastProvider as default };
