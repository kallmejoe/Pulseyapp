import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Send } from "lucide-react";

export const AiAssistant = (): JSX.Element => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const messages = [
    {
      type: "assistant",
      content: "Hello! I'm your AI nutrition assistant. How can I help you today?"
    },
    {
      type: "user",
      content: "Can you suggest a healthy breakfast?"
    },
    {
      type: "assistant",
      content: "Here's a nutritious breakfast idea: Overnight oats with Greek yogurt, chia seeds, and mixed berries. It's high in protein, fiber, and antioxidants!"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">AI Assistant</h1>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card className={`max-w-[80%] ${
                message.type === "user" ? "bg-blue-500" : "bg-white"
              }`}>
                <CardContent className={`p-3 ${
                  message.type === "user" ? "text-white" : "text-black"
                }`}>
                  {message.content}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>

      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about nutrition or diet plans..."
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button size="icon" className="rounded-full">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};