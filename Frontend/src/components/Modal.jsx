import React, { Children } from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return;
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen max-h-full overflow-y-auto overflow-x-hidden bg-black/25 bg-opacity-50">{/* pointer-events-none */}
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center" onClick={onClose}>
              <svg
                className="w-3 h-3"
                area-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                strokeWidth={1.5}
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
