import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const DivWrapperByAnima = (): JSX.Element => {
  // Workout data for mapping
  const workouts = [
    {
      id: 1,
      category: "Cardio",
      title: "Cardio Workout",
      name: "Cardio Blast",
      duration: "30 mins",
    },
    {
      id: 2,
      category: "Strength",
      title: "Strength Training",
      name: "Muscle Build",
      duration: "45 mins",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-2 px-3 py-0 w-full">
      <header className="flex items-center gap-3 pt-4 pb-0 px-0 w-full">
        <div className="flex flex-col items-start flex-1">
          <h2 className="self-stretch mt-[-1.00px] font-medium text-black text-lg leading-6 [font-family:'Roboto',Helvetica] tracking-[0]">
            Recommended Workouts
          </h2>
        </div>
      </header>

      <div className="flex items-start gap-2 w-full">
        {workouts.map((workout) => (
          <Card
            key={workout.id}
            className="flex flex-col items-center flex-1 rounded-md overflow-hidden border border-solid border-[#0000001a]"
          >
            <div className="flex h-[164px] items-start w-full relative">
              <div className="flex-1 bg-[#0000000d] relative">
                <div className="absolute w-[132px] h-4 top-[73px] left-4 font-normal text-black text-xs text-center leading-4 whitespace-nowrap [font-family:'Roboto',Helvetica] tracking-[0]">
                  {workout.title}
                </div>

                <div className="inline-flex flex-col items-center justify-center p-1 absolute top-0 left-0 bg-[#0000000d] rounded-[6px_0px_6px_0px]">
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Roboto',Helvetica] font-medium text-black text-xs tracking-[0] leading-4 whitespace-nowrap">
                    {workout.category}
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="flex flex-col items-start gap-1 p-2 w-full">
              <p className="self-stretch mt-[-1.00px] font-normal text-black text-xs leading-4 [font-family:'Roboto',Helvetica] tracking-[0]">
                {workout.name}
              </p>
              <p className="self-stretch font-medium text-black text-base leading-6 [font-family:'Roboto',Helvetica] tracking-[0]">
                {workout.duration}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
