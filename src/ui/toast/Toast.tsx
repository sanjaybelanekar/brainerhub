import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastProps {
  autoClose?: number;
}

export const Toast: React.FunctionComponent<IToastProps> = ({ autoClose }) => {
  return (
    <>
      <ToastContainer
        autoClose={autoClose ? autoClose : 8000}
        theme="colored"
      />
    </>
  );
};

const toastOptionObj = (autoClose?: number, theme?: any) => {
  return {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: autoClose ? autoClose : 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme ? theme : "colored",
  };
};

export const successToast = (message: string, autoClose?: number) => {
  const newOpt = toastOptionObj(autoClose);
  toast.success(message, { ...newOpt });
};

export const errorToast = (message: string, autoClose?: number) => {
  const newOpt = toastOptionObj(autoClose);
  toast.error(message, { ...newOpt });
};

export const warningToast = (message: string, autoClose?: number) => {
  const newOpt = toastOptionObj(autoClose);
  toast.warning(message, { ...newOpt });
};

export const promiseToast = (
  promise: Promise<any>,
  messageObj: { pending?: string; success?: string; error?: string }
) => toast.promise(promise, messageObj);
