import React, { useState, useRef, useEffect } from "react";

const Card = ({ title, description, date, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-sm transition relative cursor-pointer flex flex-col">
      
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded"
          >
            ⋮
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-20">
              <button
                onClick={() => {
                  onEdit();
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
       
      <p className="mt-2 text-sm text-gray-600 leading-6 line-clamp-3">
        {description}
      </p>

      
      <div className="border-t border-gray-200 mt-4 mb-3"></div>

      
      <p className="text-xs text-gray-500">
        Created On: <span className="font-medium text-gray-700">{date}</span>
      </p>
    </div>
  );
};

export default Card;
