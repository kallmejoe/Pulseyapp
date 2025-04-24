import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

export const DietPlans = (): JSX.Element => {
  const navigate = useNavigate();
  
  const plans = [
    {
      title: "Balanced Nutrition",
      description: "Perfect balance of proteins, carbs, and healthy fats",
      duration: "30 days",
      meals: 5,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Weight Loss Plan",
      description: "Calorie-controlled meals with high protein content",
      duration: "60 days",
      meals: 6,
      image: "https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Diet Plans</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        {plans.map((plan, index) => (
          <Card key={index} className="overflow-hidden">
            <img src={plan.image} alt={plan.title} className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{plan.title}</h2>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-gray-600 mt-2">{plan.description}</p>
              <div className="flex gap-4 mt-4">
                <div className="text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="ml-1 font-medium">{plan.duration}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Meals/day:</span>
                  <span className="ml-1 font-medium">{plan.meals}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate(`/meal-logger?plan=${plan.title}`)}
              >
                Start Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
};