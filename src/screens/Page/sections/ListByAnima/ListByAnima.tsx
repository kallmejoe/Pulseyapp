import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ListByAnima = (): JSX.Element => {
  // Define fitness metrics data for mapping
  const fitnessMetrics = [
    {
      label: "Steps",
      value: "10,000",
      change: "+500",
    },
    {
      label: "Calories Burned",
      value: "500",
      change: "-50",
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full py-0 px-3">
      <div className="flex items-center gap-3 pt-4 pb-0 w-full">
        <div className="flex flex-col items-start flex-1">
          <h2 className="text-lg font-medium leading-6 text-black [font-family:'Roboto',Helvetica]">
            Fitness Progress
          </h2>
        </div>
      </div>

      <div className="flex items-start gap-2 w-full">
        {fitnessMetrics.map((metric, index) => (
          <Card
            key={index}
            className="flex-1 border border-solid border-[#0000001a] rounded-md overflow-hidden"
          >
            <CardContent className="flex flex-col items-start gap-1 p-3">
              <div className="self-stretch font-normal text-sm leading-5 text-[#00000080] [font-family:'Roboto',Helvetica]">
                {metric.label}
              </div>
              <div className="w-fit font-medium text-xl leading-7 text-black [font-family:'Roboto',Helvetica] whitespace-nowrap">
                {metric.value}
              </div>
              <div className="w-fit font-normal text-sm leading-5 text-black [font-family:'Roboto',Helvetica] whitespace-nowrap">
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
