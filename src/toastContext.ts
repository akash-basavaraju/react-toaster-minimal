import React from "react";
import { IState } from "./types";

const toastContext = React.createContext<
  [IState, React.Dispatch<{ type: string; data: any }>]
>([{ toastMessages: [] }, () => []]);

export default toastContext;
