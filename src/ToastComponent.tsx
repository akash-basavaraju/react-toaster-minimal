/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext, useMemo, useEffect, useCallback } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import toastContext from "./toastContext";
import "./ToastComponent.css";

export default function ToastMessageComponent({
  animationTimeInMs = 500,
}: {
  animationTimeInMs?: number;
}) {
  const [{ toastMessages }, dispatch] = useContext(toastContext);

  const handleClickMsgClear = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    if (!(event.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    const { currentTarget: { dataset: { timestamp = "" } = {} } = {} } = event;
    if (timestamp) {
      dispatch({ type: "clearMsg", data: timestamp });
    }
  };

  useEffect(() => {
    const eventListener = (event: any) => {
      const { detail: dispathMessage } = event;
      dispatch(dispathMessage);
    };
    window.addEventListener("react-toaster-minimal-event", eventListener);
    return () => {
      window.removeEventListener("react-toaster-minimal-event", eventListener);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <aside className="toast-container">
      <TransitionGroup>
        {toastMessages.map((message) => {
          return (
            <CSSTransition
              key={message.timestamp}
              classNames="toast"
              timeout={{ enter: animationTimeInMs, exit: animationTimeInMs }}
            >
              <div
                className={`toast-message`}
                style={{
                  color: message.textColor || "black",
                  backgroundColor: message.bgColor || "white",
                  ...(message.compStyle || {}),
                }}
                data-timestamp={message.timestamp}
                onClick={handleClickMsgClear}
                tabIndex={-1}
                role="button"
                onKeyPress={handleClickMsgClear}
              >
                <div>{message.title}</div>
                {message.subTitle && (
                  <div style={{ fontSize: "0.75rem" }}>{message.subTitle}</div>
                )}
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </aside>
  );
}
