import React, { useState, useRef, useEffect, useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import logo from "../assets/logo.png"

const GOOGLE_FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSdUvdAncK_O_vf2ozBfQAijInJPURDQOsC6zHt0B-OLiBNtTQ/viewform?usp=header"

export default function ChatWindow({ onBack }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const timeoutRef = useRef(null)
  const [formSent, setFormSent] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [userName, setUserName] = useState("")
  const [isNameSet, setIsNameSet] = useState(false)
  const [userId, setUserId] = useState("")

  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-600 underline break-all">${url}</a>`
    })
  }

  const resetInactivityTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (formSent) return

    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `We noticed you’ve been inactive. Please fill this form so we can assist you: ${GOOGLE_FORM_LINK}`,
        },
      ])
      setFormSent(true)
    }, 50000)
  }, [formSent])

  useEffect(() => {
    resetInactivityTimer()
    return () => clearTimeout(timeoutRef.current)
  }, [messages, resetInactivityTimer])

  if (!isNameSet) {
    const handleStartChat = (e) => {
      e.preventDefault()
      if (userName.trim()) {
        setUserId(userName.trim())
        setIsNameSet(true)
      }
    }

    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">👋 Welcome!</h2>
        <p className="mb-2">Before we start, please enter your name:</p>
        <form
          onSubmit={handleStartChat}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="border px-4 py-2 rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start Chat
          </button>
        </form>
      </div>
    )
  }

  const sendMessage = async () => {
    const messageToSend = input.trim()
    if (!messageToSend) return

    const userMsg = { from: "user", text: messageToSend }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setMessageCount((prev) => prev + 1)
    resetInactivityTimer()

    try {
      const res = await fetch(
        "https://chatbot-backend-mymw.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input, userId: userId }),
        }
      )

      const data = await res.json()
      const botMsg = { from: "bot", text: data.reply }
      setMessages((prev) => [...prev, botMsg])
    } catch (error) {
      console.error("❌ Chat API failed:", error)
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Try again." },
      ])
    }

    if (messageCount + 1 >= 5 && !formSent) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `Are you interested in our services? Please fill this short form: ${GOOGLE_FORM_LINK}`,
        },
      ])
      setFormSent(true)
    }
  }

  return (
    <div
      className="w-full h-full max-w-md mx-auto rounded-2xl shadow-lg bg-white flex flex-col"
      style={{ height: "100%", maxHeight: "100%", overflow: "hidden" }}
    >
      {/* Header */}
      <div className="flex items-center p-2 border-b" style={{ height: 60 }}>
        <ArrowLeft onClick={onBack} className="cursor-pointer mr-2" />
        <img src={logo} alt="Logo" className="w-7 h-7 rounded-full mr-2" />
        <h2 className="text-lg font-semibold">Raghu</h2>
      </div>

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto bg-gray-50"
        style={{ minHeight: 0 }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-1 rounded-lg text-sm max-w-xs ${
                msg.from === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }}
        className="flex p-2 border-t bg-white"
        style={{ height: 50 }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-l-lg px-3 py-1 outline-none text-sm"
          placeholder="Type your message here..."
        />
        <button
          type="submit"
          className="bg-black text-white px-3 py-1 rounded-r-lg text-sm"
        >
          Send
        </button>
      </form>

      {/* Footer */}
      <div
        className="text-center text-xs text-gray-500"
        style={{ height: 30 }}
      >
        Powered by <span className="font-medium text-blue-600">ALPL</span>
      </div>
    </div>
  )
}
