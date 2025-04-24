import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const TabGroupByAnima = (): JSX.Element => {
  // Define tab data for easier mapping
  const tabs = [
    { emoji: "🍔", label: "Meals" },
    { emoji: "🏋", label: "Workouts" },
    { emoji: "📅", label: "Plans" },
  ];

  return (
    <div className="flex items-start gap-2 px-3 py-0 w-full">
      {tabs.map((tab, index) => (
        <Card
          key={index}
          className="flex flex-col items-center gap-1 p-1 flex-1 rounded-md border border-solid border-[#0000001a] hover:bg-slate-50 cursor-pointer"
        >
          <CardContent className="p-0 flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-[#0000000d] rounded-3xl flex items-center justify-center">
              <span className="text-3xl leading-[48px] font-normal text-black text-center tracking-[0] whitespace-nowrap overflow-hidden text-ellipsis [font-family:'Roboto',Helvetica]">
                {tab.emoji}
              </span>
            </div>
            <div className="self-stretch h-7 font-normal text-black text-[10px] text-center leading-[14px] overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] [font-family:'Roboto',Helvetica] tracking-[0]">
              {tab.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
