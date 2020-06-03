/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useContext, useMemo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import toastContext from "./toastContext";
import "./ToastComponent.css";

export default function ToastMessageComponent({
  animationTimeInMs = 500,
}: {
  animationTimeInMs?: number;
}) {
  const [{ toastMessages }, dispatch] = useContext(toastContext);

  const handleClickMsgClear = useMemo(() => {
    return (event: React.MouseEvent | React.KeyboardEvent) => {
      if (!(event.currentTarget instanceof HTMLDivElement)) {
        return;
      }
      const {
        currentTarget: { dataset: { timestamp = "" } = {} } = {},
      } = event;
      if (timestamp) {
        dispatch({ type: "clearMsg", data: timestamp });
      }
    };
  }, [dispatch]);

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
                <div style={{ fontSize: "0.75rem" }}>{message.subTitle}</div>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </aside>
  );
}
