import React from "react";
import { Button } from "../../../../components/ui/button";

export const ButtonByAnima = (): JSX.Element => {
  // Define button data for mapping
  const buttons = [
    { text: "Log Meal", variant: "outline" },
    { text: "Create Plan", variant: "outline" },
    { text: "Log Workout", variant: "default" },
  ];

  return (
    <div className="flex flex-col items-start gap-2 px-3 py-0 w-full">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant as "outline" | "default"}
          className={`w-full font-medium text-base leading-[22px] [font-family:'Roboto',Helvetica] ${
            button.variant === "outline"
              ? "bg-white text-black border-black"
              : "bg-black text-white"
          }`}
        >
          {button.text}
        </Button>
      ))}
    </div>
  );
};
