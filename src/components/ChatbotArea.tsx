"use client";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import sendMessage from "../utils";

const ChatbotArea = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const output = await sendMessage(message);
      setResponse(output.message.text);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="group relative w-full max-w-2xl mx-auto">
      <div className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 border-2 border-black translate-y-2 translate-x-2 transition-all duration-300 group-hover:translate-y-3 group-hover:translate-x-3" />

      <div className="relative bg-white border-4 border-black p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 animate-pulse" />
            <MessageSquare className="w-6 h-6 relative text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg p-1" />
          </div>
          <h2 className="text-xl font-mono font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">BotBox</h2>
        </div>

        <div className="h-[300px] bg-gradient-to-b from-gray-50 to-white border border-black mb-4 shadow-inner overflow-auto">
          {loading ? (
            <div className="h-full flex justify-center items-center">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                <span className="text-lg font-mono bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text animate-pulse">
                  Analyzing...
                </span>
              </div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500 text-center">{error}</div>
          ) : (
            response && (
              <div className="p-4 animate-fade-in">
                <pre className="whitespace-pre-wrap font-mono text-gray-800">
                  {response}
                </pre>
              </div>
            )
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border-2 border-black rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            disabled={loading}
          />

          <button
            className="group relative transform active:scale-95 transition-all duration-200"
            onClick={handleSend}
            disabled={loading}
          >
            <div className={`absolute h-12 px-6 border-2 border-black translate-y-1 translate-x-1 
              ${loading ? "bg-gray-400" : "bg-gradient-to-r from-purple-600 to-pink-600"} 
              flex items-center justify-center transition-all duration-200`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Send className="w-5 h-5 text-white" />
              )}
            </div>
            <div className={`relative h-12 px-6 border-2 border-black 
              ${loading ? "bg-gray-200" : "bg-white hover:bg-gray-50"} 
              flex items-center justify-center transition-all duration-200`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotArea;
