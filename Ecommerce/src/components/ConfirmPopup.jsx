// 📁 components/common/ConfirmPopup.jsx
import React from 'react';

const ConfirmPopup = ({
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white p-6 rounded-xl shadow-xxl w-xl max-w-xl text-center">
        <p className="mb-4 text-lg font-medium">{message}</p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
  

};

export default ConfirmPopup;


/*
<ConfirmPopup
  message="Delete this product permanently?"
  confirmText="Yes, Delete"
  cancelText="No"
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
/>
componrnt to use popup

*/