import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function ChatApp() {
  const [messages, setMessages] = useState([
    { role: "system", text: "You can ask questions about your SQL data." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;

    const userMessage = { role: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/api/chat", {
        question,
        history: [...messages, userMessage],
      });

      const aiMessage = {
        role: "assistant",
        text: res.data.response || "No response from server.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2 className="sub-heading">SQL Chat Assistant</h2>
      </div>

      <div
        ref={containerRef}
        className="chatbot-conversation-container"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`speech ${
              m.role === "assistant"
                ? "speech-ai"
                : m.role === "user"
                ? "speech-human"
                : ""
            }`}
          >
            {m.text}
          </div>
        ))}

        {loading && <div className="typing-indicator">Thinking...</div>}
      </div>

      <form className="chatbot-input-container" onSubmit={handleSubmit}>
        <input
          aria-label="Type your question"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something like: How many products are there?"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
