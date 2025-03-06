import React from "react";
import { useToast } from "./use-toast";

export const ToastProvider = () => {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-gray-800 text-white p-4 rounded-md shadow-lg ${
            toast.open ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">{toast.title}</h4>
              <p className="text-sm">{toast.description}</p>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-white hover:text-gray-300 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
