import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const ListWrapperByAnima = (): JSX.Element => {
  // Data for meal items
  const meals = [
    {
      emoji: "🥗",
      name: "Salad",
      type: "Lunch",
      calories: "400 cal",
    },
    {
      emoji: "🍳",
      name: "Eggs",
      type: "Breakfast",
      calories: "250 cal",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center px-3 py-0 relative self-stretch w-full">
      <div className="flex items-center gap-3 pt-4 pb-0 px-0 relative self-stretch w-full">
        <div className="flex flex-col items-start relative flex-1 grow">
          <h2 className="relative self-stretch mt-[-1.00px] font-medium text-black text-lg leading-6 [font-family:'Roboto',Helvetica] tracking-[0]">
            My Meals
          </h2>
        </div>
      </div>

      <Card className="w-full border-none shadow-none">
        <CardContent className="p-0">
          {meals.map((meal, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-center gap-2 px-0 py-3 relative self-stretch w-full">
                <div className="relative w-8 h-8 bg-[#0000000d] rounded-2xl">
                  <div className="absolute w-8 h-8 -top-px left-0 text-xl leading-8 [font-family:'Roboto',Helvetica] font-normal text-black text-center tracking-[0] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
                    {meal.emoji}
                  </div>
                </div>

                <div className="flex flex-col items-start relative flex-1 grow">
                  <div className="relative self-stretch mt-[-1.00px] font-normal text-black text-sm leading-5 [font-family:'Roboto',Helvetica] tracking-[0]">
                    {meal.name}
                  </div>

                  <div className="self-stretch font-normal text-[#00000080] text-xs leading-4 relative [font-family:'Roboto',Helvetica] tracking-[0]">
                    {meal.type}
                  </div>
                </div>

                <div className="w-fit font-medium text-black text-sm text-right leading-5 whitespace-nowrap relative [font-family:'Roboto',Helvetica] tracking-[0]">
                  {meal.calories}
                </div>
              </div>
              {index < meals.length - 1 && (
                <Separator className="w-full h-px" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
