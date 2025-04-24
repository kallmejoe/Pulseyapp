import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  ArrowLeft,
  Send,
  Plus,
  Utensils,
  Calendar,
  MoreVertical,
  ChevronRight,
  Bot,
  User,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMeals } from "../../context/MealContext";
import { useTheme } from "../../context/ThemeContext";

// Message type interface
interface Message {
  id: string;
  type: "assistant" | "user";
  content: string;
  timestamp: Date;
  action?: {
    type: "meal-log" | "water-log" | "workout";
    data?: any;
  };
}

// Quick action type
interface QuickAction {
  id: string;
  label: string;
  prompt: string;
  icon: React.ReactNode;
}

export const AiAssistant = (): JSX.Element => {
  const navigate = useNavigate();
  const { addMeal, updateWaterIntake, waterIntake } = useMeals();
  const { colors, theme } = useTheme();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);

  // Quick actions
  const quickActions: QuickAction[] = [
    {
      id: "breakfast",
      label: "Log Breakfast",
      prompt: "I want to log my breakfast",
      icon: <Utensils className="h-4 w-4" />
    },
    {
      id: "lunch",
      label: "Log Lunch",
      prompt: "I want to log my lunch",
      icon: <Utensils className="h-4 w-4" />
    },
    {
      id: "dinner",
      label: "Log Dinner",
      prompt: "I want to log my dinner",
      icon: <Utensils className="h-4 w-4" />
    },
    {
      id: "water",
      label: "Add Water",
      prompt: "I want to log water intake",
      icon: <Utensils className="h-4 w-4" />
    }
  ];

  // Initialize with welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI nutrition assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);

  // Food suggestions based on meal type
  const foodSuggestions = {
    breakfast: ["Oatmeal", "Eggs", "Toast", "Yogurt", "Fruit"],
    lunch: ["Salad", "Sandwich", "Soup", "Grilled Chicken", "Rice Bowl"],
    dinner: ["Salmon", "Steak", "Pasta", "Stir Fry", "Vegetable Curry"]
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Clear input
    setInput("");

    // Process message
    processUserMessage(input);
  };

  // Handle quick action click
  const handleQuickAction = (action: QuickAction) => {
    setInput(action.prompt);
    setShowActions(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: action.prompt,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Process message
    processUserMessage(action.prompt);
  };

  // Process user message
  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();

    // Detect intent
    if (lowerMessage.includes("breakfast") || lowerMessage.includes("log breakfast")) {
      showMealLoggingInterface("breakfast");
    }
    else if (lowerMessage.includes("lunch") || lowerMessage.includes("log lunch")) {
      showMealLoggingInterface("lunch");
    }
    else if (lowerMessage.includes("dinner") || lowerMessage.includes("log dinner")) {
      showMealLoggingInterface("dinner");
    }
    else if (lowerMessage.includes("water") || lowerMessage.includes("drink")) {
      showWaterLoggingInterface();
    }
    else {
      // General response
      setTimeout(() => {
        const botResponse: Message = {
          id: Date.now().toString(),
          type: "assistant",
          content: "I can help you log meals and track nutrition. Would you like to log breakfast, lunch, dinner or track water intake?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 700);
    }
  };

  // Show meal logging interface
  const showMealLoggingInterface = (mealType: "breakfast" | "lunch" | "dinner") => {
    const mealTimes = {
      breakfast: "8:00 AM",
      lunch: "12:30 PM",
      dinner: "7:00 PM"
    };

    const suggestions = foodSuggestions[mealType];

    // Assistant shows meal logging interface
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `Let's log your ${mealType}. Select from the suggestions below or add your own foods:`,
        timestamp: new Date(),
        action: {
          type: "meal-log",
          data: {
            mealType,
            suggestions,
            time: mealTimes[mealType]
          }
        }
      };
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  // Show water logging interface
  const showWaterLoggingInterface = () => {
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `Your current water intake is ${waterIntake}L. Would you like to add more?`,
        timestamp: new Date(),
        action: {
          type: "water-log",
          data: {
            currentAmount: waterIntake
          }
        }
      };
      setMessages(prev => [...prev, botResponse]);
    }, 700);
  };

  // Log a meal
  const logMeal = (mealType: string, foods: string[], time: string) => {
    // Calculate calories (simplified)
    const calories = foods.length * 100;

    // Add meal to context
    addMeal({
      time,
      name: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      foods,
      calories
    });

    // Confirmation message
    const botResponse: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: `Great! I've logged your ${mealType} with ${calories} calories. Anything else I can help with?`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
  };

  // Add water
  const addWater = (amount: number) => {
    const newAmount = Math.min(waterIntake + amount, 2.5);
    updateWaterIntake(newAmount);

    // Confirmation message
    const botResponse: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: `I've updated your water intake to ${newAmount}L. Great job staying hydrated!`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botResponse]);
  };

  // Render message content
  const renderMessageContent = (message: Message) => {
    if (message.action?.type === "meal-log") {
      const { mealType, suggestions, time } = message.action.data;
      const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
      const [customFood, setCustomFood] = useState("");

      return (
        <div className="mt-2">
          <p className="mb-2">{message.content}</p>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestions.map((food, idx) => (
                <Button
                  key={idx}
                  variant={selectedFoods.includes(food) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedFoods.includes(food)) {
                      setSelectedFoods(prev => prev.filter(f => f !== food));
                    } else {
                      setSelectedFoods(prev => [...prev, food]);
                    }
                  }}
                >
                  {food}
                </Button>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add custom food"
                value={customFood}
                onChange={(e) => setCustomFood(e.target.value)}
                className="flex-1 px-3 py-2 text-sm rounded-md border border-input"
              />
              <Button
                size="sm"
                onClick={() => {
                  if (customFood.trim()) {
                    setSelectedFoods(prev => [...prev, customFood.trim()]);
                    setCustomFood("");
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {selectedFoods.length > 0 && (
              <div className="flex flex-col gap-2 mt-4">
                <Card className="bg-muted">
                  <CardContent className="p-3">
                    <p className="font-medium">{mealType.charAt(0).toUpperCase() + mealType.slice(1)} Summary:</p>
                    <ul className="mt-1 text-sm">
                      {selectedFoods.map((food, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <XCircle
                            className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive"
                            onClick={() => setSelectedFoods(prev => prev.filter(f => f !== food))}
                          />
                          {food}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">Time: {time}</p>
                    <p className="text-sm text-muted-foreground">Est. calories: {selectedFoods.length * 100}</p>
                  </CardContent>
                </Card>

                <Button
                  className="mt-2"
                  onClick={() => logMeal(mealType, selectedFoods, time)}
                >
                  Log {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (message.action?.type === "water-log") {
      return (
        <div className="mt-2">
          <p className="mb-2">{message.content}</p>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button variant="outline" onClick={() => addWater(0.25)}>+ 250ml</Button>
            <Button variant="outline" onClick={() => addWater(0.5)}>+ 500ml</Button>
            <Button variant="outline" onClick={() => addWater(1)}>+ 1L</Button>
          </div>

          <div className="mt-4 bg-muted p-3 rounded-md">
            <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min((waterIntake / 2.5) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-1">{waterIntake}L / 2.5L</p>
          </div>
        </div>
      );
    }

    return message.content;
  };

  return (
    <div className="h-full flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
          </Button>
            <h1 className="text-lg font-semibold">AI Health Assistant</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <AnimatePresence>
          <div className="space-y-4 pb-20">
          {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
                <div className={`flex gap-2 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  {message.type === "assistant" ? (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <Card className={`shadow-sm ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}>
                    <CardContent className="p-3">
                      {renderMessageContent(message)}
                </CardContent>
              </Card>
            </div>
              </motion.div>
          ))}
            <div ref={messagesEndRef} />
        </div>
        </AnimatePresence>
      </main>

      <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t border-border p-4">
        {showActions && (
          <div className="mb-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2"
            >
              {quickActions.map(action => (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => handleQuickAction(action)}
                >
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </motion.div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={() => setShowActions(!showActions)}
            className="shrink-0"
          >
            <Plus className="h-5 w-5" />
          </Button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message AI assistant..."
            className="flex-1 p-3 rounded-full border border-input bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <Button
            type="submit"
            size="icon"
            className="rounded-full shrink-0 bg-primary"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
