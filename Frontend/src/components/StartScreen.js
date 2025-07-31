import React from "react";
import { ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

export default function StartScreen({ onStart }) {
  // return (
  //   <div className="bg-white text-gray-900 w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
  //     {/* Top Red Rounded Corner Effect (Optional) */}
  //     <div className="h-2 bg-gradient-to-r from-red-600 to-pink-500 rounded-t-2xl" />

  //     {/* Header */}
  //     <div className="text-center p-6">
  //       <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-300" />
  //       <h1 className="text-2xl font-bold text-gray-800">Hello,</h1>
  //       <p className="text-sm text-gray-500">How may we assist you?</p>
  //     </div>

  //     {/* Divider */}
  //     <div className="text-xs font-medium text-gray-400 px-4">MESSAGES</div>

  //     {/* Empty Message Area */}
  //     <div className="bg-gray-50 p-6 text-center rounded-lg mx-4 mt-2 border border-dashed border-gray-300">
  //       <p className="text-sm font-medium text-gray-500">No previous conversations found.</p>
  //       <p className="text-xs text-gray-400 mt-1">Start a new chat to begin!</p>
  //     </div>

  //     {/* Start New Chat Button */}
  //     <div className="p-4 border-t mt-4">
  //       <button
  //         onClick={onStart}
  //         className="w-full flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-all"
  //       >
  //         Start a New Chat
  //         <ArrowRight />
  //       </button>
  //     </div>

  //     {/* Footer */}
  //     <div className="text-center text-xs text-gray-400 p-2">
  //       Powered by <span className="font-medium text-blue-600">AssistLoop.ai</span>
  //     </div>
  //   </div>
  // );


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
    <div className="bg-white text-gray-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Top Red Rounded Corner Effect */}
      <div className="h-2 bg-gradient-to-r from-red-600 to-pink-500 rounded-t-2xl" />

      {/* Header */}
      <div className="text-center p-6">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 mx-auto mb-2 rounded-full border border-gray-300"
        />
        <h1 className="text-2xl font-bold text-gray-800">Hello,</h1>
        <p className="text-sm text-gray-500">How may we assist you?</p>
      </div>

      {/* Divider */}
      <div className="text-xs font-medium text-gray-400 px-4">MESSAGES</div>

      {/* Empty Message Area */}
      <div className="bg-gray-50 p-6 text-center rounded-lg mx-4 mt-2 border border-dashed border-gray-300">
        <p className="text-sm font-medium text-gray-500">
          No previous conversations found.
        </p>
        <p className="text-xs text-gray-400 mt-1">Start a new chat to begin!</p>
      </div>

      {/* Start New Chat Button */}
      <div className="p-4 border-t mt-4">
        <button
          onClick={onStart}
          className="w-full flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-all"
        >
          Start a New Chat
          <ArrowRight />
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 p-2">
        Powered by{" "}
        <span className="font-medium text-blue-600">AshutoshLogistics</span>
      </div>
    </div>
  </div>
);

}



// admin login page

// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import logo from '../assets/logo.png';

// export default function StartScreen({ onStart, onAdmin }) {
//   return (
//     <div className="bg-gradient-to-b from-gray-800 to-white text-gray-900 w-full max-w-md mx-auto rounded-2xl shadow-lg overflow-hidden">
//       {/* Header */}
//       <div className="bg-white text-center p-6">
//         <img src={logo} alt="Logo" className="w-12 mx-auto mb-2 rounded-full" />
//         <h1 className="text-2xl font-semibold text-gray-800">Hello,</h1>
//         <p className="text-md text-gray-600">How may we assist you?</p>
//       </div>

//       {/* Message History */}
//       <div className="bg-gray-50 p-4">
//         <div className="text-center text-gray-500 py-10">
//           <p className="text-sm font-medium">No previous conversations found.</p>
//           <p className="text-xs text-gray-400 mt-1">Start a new chat to begin!</p>
//         </div>
//       </div>

//       {/* Start New Chat */}
//       <div className="bg-white p-4 border-t">
//         <button
//           onClick={onStart}
//           className="w-full flex items-center justify-between bg-black text-white px-4 py-3 rounded-lg shadow hover:bg-gray-900 mb-2"
//         >
//           Start a New Chat
//           <ArrowRight />
//         </button>
//         <button
//           onClick={onAdmin}
//           className="w-full flex items-center justify-between bg-gray-700 text-white px-4 py-3 rounded-lg shadow hover:bg-gray-800"
//         >
//           Admin Login
//           <ArrowRight />
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="text-center text-sm text-gray-500 p-2">
//         Powered by <span className="font-medium text-blue-600">AssistLoop.ai</span>
//       </div>
//     </div>
//   );
// }
