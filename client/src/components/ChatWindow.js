// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { ArrowLeft } from 'lucide-react';
// import logo from '../assets/logo.png';

// const GOOGLE_FORM_LINK = "https://forms.gle/ycHSVzKBi5SRqi18A";

// export default function ChatWindow({ onBack }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const timeoutRef = useRef(null);
//   const [formSent, setFormSent] = useState(false);

//   // Format message text: make URLs clickable
//   const formatMessage = (text) => {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     return text.replace(urlRegex, (url) => {
//       return `<a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>`;
//     });
//   };

//   // ✅ Use useCallback to fix warning
//   const resetInactivityTimer = useCallback(() => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     if (formSent) return;

//     timeoutRef.current = setTimeout(() => {
//       setMessages(prev => [
//         ...prev,
//         {
//           from: 'bot',
//           text: `It seems you’re inactive. Please fill this form: ${GOOGLE_FORM_LINK}`
//         }
//       ]);
//       setFormSent(true);
//     }, 40000);
//   }, [formSent]);

//   useEffect(() => {
//     resetInactivityTimer();
//     return () => clearTimeout(timeoutRef.current);
//   }, [messages, resetInactivityTimer]); // ✅ fixed dependency array

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { from: 'user', text: input };
//     setMessages(prev => [...prev, userMsg]);
//     setInput("");
//     resetInactivityTimer();

//     try {
//       const res = await fetch("http://localhost:5000/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       const data = await res.json();
//       const botMsg = { from: 'bot', text: data.reply };
//       setMessages(prev => [...prev, botMsg]);
//     } catch {
//       setMessages(prev => [
//         ...prev,
//         { from: 'bot', text: "Something went wrong. Try again." }
//       ]);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto rounded-2xl shadow-lg bg-white overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center p-4 border-b">
//         <ArrowLeft onClick={onBack} className="cursor-pointer mr-3" />
//         <img src={logo} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
//         <h2 className="text-lg font-semibold">Raghu</h2>
//       </div>

//       {/* Chat Messages */}
//       <div className="p-4 h-96 overflow-y-auto bg-gray-50">
//         {messages.map((msg, i) => (
//           <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
//               msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
//             }`}>
//               <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Box */}
//       <div className="flex p-3 border-t bg-white">
//         <input
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           className="flex-1 border rounded-l-lg px-4 py-2 outline-none text-sm"
//           placeholder="Type your message here..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-black text-white px-4 py-2 rounded-r-lg text-sm"
//         >
//           Send
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="text-center text-xs text-gray-500 py-2">
//         Powered by <span className="font-medium text-blue-600">AssistLoop.ai</span>
//       </div>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';

const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdUvdAncK_O_vf2ozBfQAijInJPURDQOsC6zHt0B-OLiBNtTQ/viewform?usp=header";

export default function ChatWindow({ onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const timeoutRef = useRef(null);
  const [formSent, setFormSent] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  // Make URLs clickable
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>`;
    });
  };

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (formSent) return;

    timeoutRef.current = setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text: `We noticed you’ve been inactive. Please fill this form so we can assist you: ${GOOGLE_FORM_LINK}`
        }
      ]);
      setFormSent(true);
    }, 30000); // 30 seconds
  }, [formSent]);

  useEffect(() => {
    resetInactivityTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [messages, resetInactivityTimer]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setMessageCount(prev => prev + 1);
    resetInactivityTimer();

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { from: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: "Something went wrong. Try again." }
      ]);
    }

    // Send form after 5 messages
    if (messageCount + 1 >= 5 && !formSent) {
      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text: `Are you interested in our services? Please fill this short form: ${GOOGLE_FORM_LINK}`
        }
      ]);
      setFormSent(true);
    }
  };

  // return (
  //   <div className="w-full max-w-md mx-auto rounded-2xl shadow-lg bg-white overflow-hidden">
  //     {/* Header */}
  //     <div className="flex items-center p-4 border-b">
  //       <ArrowLeft onClick={onBack} className="cursor-pointer mr-3" />
  //       <img src={logo} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
  //       <h2 className="text-lg font-semibold">Raghu</h2>
  //     </div>

  //     {/* Chat Messages */}
  //     <div className="p-4 h-96 overflow-y-auto bg-gray-50">
  //       {messages.map((msg, i) => (
  //         <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
  //           <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
  //             msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
  //           }`}>
  //             <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Input Box */}
  //     <div className="flex p-3 border-t bg-white">
  //       <input
  //         value={input}
  //         onChange={e => setInput(e.target.value)}
  //         className="flex-1 border rounded-l-lg px-4 py-2 outline-none text-sm"
  //         placeholder="Type your message here..."
  //       />
  //       <button
  //         onClick={sendMessage}
  //         className="bg-black text-white px-4 py-2 rounded-r-lg text-sm"
  //       >
  //         Send
  //       </button>
  //     </div>

  //     {/* Footer */}
  //     <div className="text-center text-xs text-gray-500 py-2">
  //       Powered by <span className="font-medium text-blue-600">AssistLoop.ai</span>
  //     </div>
  //   </div>
  // );


  return (
  <div className="w-full max-w-md mx-auto rounded-2xl shadow-lg bg-white overflow-hidden h-[90vh] flex flex-col">
    {/* Header */}
    <div className="flex items-center p-4 border-b">
      <ArrowLeft onClick={onBack} className="cursor-pointer mr-3" />
      <img src={logo} alt="Logo" className="w-8 h-8 rounded-full mr-2" />
      <h2 className="text-lg font-semibold">Raghu</h2>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg, i) => (
        <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
            msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}>
            <span dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
          </div>
        </div>
      ))}
    </div>

    {/* Input Box */}
    <div className="flex p-3 border-t bg-white">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 border rounded-l-lg px-4 py-2 outline-none text-sm"
        placeholder="Type your message here..."
      />
      <button
        onClick={sendMessage}
        className="bg-black text-white px-4 py-2 rounded-r-lg text-sm"
      >
        Send
      </button>
    </div>

    {/* Footer */}
    <div className="text-center text-xs text-gray-500 py-2">
      Powered by <span className="font-medium text-blue-600">AssistLoop.ai</span>
    </div>
  </div>
);

}
