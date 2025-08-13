import "@/assets/css/vendors/toastify.css";
import { useRef, createRef, useEffect } from "react";
import { init, reInit } from "./notification";
import Toastify, { Options } from "toastify-js";
import clsx from "clsx";

export interface NotificationElement extends HTMLDivElement {
  toastify: ReturnType<typeof Toastify>;
  showToast: () => void;
  hideToast: () => void;
}

export interface NotificationProps
  extends React.PropsWithChildren,
    React.ComponentPropsWithoutRef<"div"> {
  options?: Options;
  getRef?: (el: NotificationElement) => void;
}

function Notification({
  className = "",
  options = {},
  getRef = () => {},
  children,
  ...computedProps
}: NotificationProps) {
  const props = {
    className: className,
    options: options,
    getRef: getRef,
  };
  const initialRender = useRef(true);
  const toastifyRef = createRef<NotificationElement>();

  useEffect(() => {
    if (toastifyRef.current) {
      if (initialRender.current) {
        props.getRef(toastifyRef.current);
        init(toastifyRef.current, props);
        initialRender.current = false;
      } else {
        reInit(toastifyRef.current);
      }
    }
  }, [props.options, children]);

  return (
    <div
      {...computedProps}
      className={clsx([
        "py-5 pl-5 pr-14 bg-white border border-slate-200/60 rounded-lg shadow-xl dark:bg-darkmode-600 dark:text-slate-300 dark:border-darkmode-600 hidden",
        props.className,
      ])}
      ref={toastifyRef}
    >
      {children}
    </div>
  );
}

export default Notification;
