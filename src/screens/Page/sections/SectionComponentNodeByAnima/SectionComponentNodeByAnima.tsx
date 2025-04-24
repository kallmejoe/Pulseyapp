import React from "react";
import { Avatar } from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";

export const SectionComponentNodeByAnima = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-2 px-3 py-0 w-full">
      <header className="flex items-center gap-3 pt-4 pb-0 px-0 w-full">
        <div className="flex flex-col items-start flex-1">
          <h2 className="font-medium text-black text-lg leading-6 [font-family:'Roboto',Helvetica] tracking-[0] w-full">
            New Workout Plan
          </h2>
        </div>
      </header>

      <Card className="w-full border-none shadow-none">
        <CardContent className="flex items-start gap-3 p-2 w-full">
          <div className="w-20 h-20 flex-shrink-0">
            <div className="w-full h-full bg-[#0000000d]" />
          </div>

          <div className="flex flex-col items-start flex-1">
            <h3 className="font-medium text-black text-base leading-5 [font-family:'Roboto',Helvetica] tracking-[0] w-full">
              Full Body Burn
            </h3>

            <p className="font-normal text-black text-xs leading-5 [font-family:'Roboto',Helvetica] tracking-[0] w-full">
              Get ready to sweat with this intense full-body workout plan!
            </p>

            <div className="flex items-center gap-2 py-1 w-full">
              <div className="flex items-center gap-2 flex-1">
                <Avatar className="w-5 h-5 bg-[#0000001a] rounded-[20px]" />
                <div className="flex flex-col items-start flex-1">
                  <span className="font-medium text-black text-xs leading-4 [font-family:'Roboto',Helvetica] tracking-[0] w-full">
                    FitCoach
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Separator className="w-full" />
    </section>
  );
};
