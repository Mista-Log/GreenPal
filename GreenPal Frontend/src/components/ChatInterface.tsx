"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { chatWithNvidiaAction } from "@/app/actions/ai-actions";

type Message = {
  role: "user" | "assistant";
  content: string;
  image?: string;
};

export default function ChatInterface() {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load chat history or handle search query
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");

    if (initialQuery) {
      const userMsg: Message = { role: "user", content: initialQuery };
      setMessages([userMsg]);
      (async () => {
        setIsLoading(true);
        try {
          const response = await chatWithNvidiaAction([userMsg]);
          setMessages([userMsg, response as Message]);
        } catch {
          setMessages([
            userMsg,
            {
              role: "assistant",
              content:
                "I'm sorry, I'm having trouble connecting to the network. Please try again soon.",
            },
          ]);
        } finally {
          setIsLoading(false);
        }
      })();
      return;
    }

    const saved = localStorage.getItem("gs_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        console.error("Failed to parse chat history");
      }
    } else {
      // Language-aware initial greeting
      const greetings: Record<string, string> = {
        en: "Hello! I am your Greenpal AI Assistant. How can I help you with your farm operations today? I can give you advice on crops, soil, or troubleshooting farm issues.",
        ha: "Sannu! Ni na shi Greenpal AI Assistant. Ta yaya zan iya taimaka maka da gonarku a yau? Zan iya ba da shawara game da amfanin gona, ƙasa, ko warware matsalolin gona.",
        yo: "Mo ki o! Emi ni Greenpal AI Assistant. Bawo ni emi se le ran o lowo lori oko re loni? Emi le fun o ni imoran lori ogbin, ile, tabi yiyanju awon isoro oko.",
        ig: "Nnoo! Mu bu Greenpal AI Assistant. Kedu ka mu ga-esi nyere gi aka na ugbo gi taa? Mu ga-enye gi ndumodu banyere ihe ọkụkụ, ala, ma obu idozi nsogbu ugbo.",
        pcm: "How far! I be your Greenpal AI Assistant. How I fit help you with your farm work today? I fit give you advice for crops, soil, or how to fix farm problems.",
      };
      setMessages([
        {
          role: "assistant",
          content: greetings[i18n.language] || greetings.en,
        },
      ]);
    }
  }, [i18n.language]);

  // Save chat history & Scroll management
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("gs_chat_history", JSON.stringify(messages));
      
      // Only scroll to bottom for new messages, not on initial load
      if (messages.length > 1) {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image under 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      role: "user",
      content: input,
      image: selectedImage || undefined,
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    handleRemoveImage();
    setIsLoading(true);

    try {
      const response = await chatWithNvidiaAction(newMessages, i18n.language);
      setMessages((prev) => [...prev, response as Message]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting to the network. Please try again soon.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-primary text-on-primary rounded-tr-none"
                    : "bg-surface-container-high text-on-surface rounded-tl-none"
                }`}
              >
                {msg.image && (
                  <div className="mb-2 rounded-lg overflow-hidden">
                    <img
                      src={msg.image}
                      alt="Uploaded image"
                      className="max-w-full h-auto max-h-64 object-contain bg-surface-container-highest rounded-lg"
                    />
                  </div>
                )}
                {msg.content && (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-surface-container-high text-on-surface rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce"></span>
                </span>
                <span className="text-xs font-medium text-on-surface-variant italic">
                  Greenpal is thinking...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={scrollRef} />
      </div>

      {/* Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="px-4 pb-2"
          >
            <div className="inline-flex items-center gap-2 bg-surface-container-high rounded-2xl p-2 pr-3 shadow-sm">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="h-16 w-16 object-cover rounded-xl"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-error text-on-error rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="material-symbols-rounded text-xs">
                    close
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - M3 Design */}
      <div className="p-3 bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          {/* Text Input Container */}
          <div className="flex-1 flex items-end gap-2 bg-surface-container-high rounded-[28px] px-4 py-2.5 ring-1 ring-inset ring-outline/20 focus-within:ring-2 focus-within:ring-primary transition-all">
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything about your farm..."
              className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-hidden resize-none overflow-y-auto max-h-30 py-1"
            />
          </div>

          {/* Image Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors"
            title="Upload Image"
          >
            <span className="material-symbols-rounded text-xl">
              add_photo_alternate
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full transition-all active:scale-95 shadow-sm ${
              (input.trim() || selectedImage) && !isLoading
                ? "bg-primary text-on-primary hover:shadow-md hover:bg-primary/90"
                : "bg-surface-container-highest text-on-surface-variant/40 cursor-not-allowed"
            }`}
          >
            <span className="material-symbols-rounded">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
