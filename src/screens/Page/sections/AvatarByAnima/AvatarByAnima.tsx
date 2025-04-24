import React from "react";
import { Avatar, AvatarFallback } from "../../../../components/ui/avatar";

export const AvatarByAnima = (): JSX.Element => {
  return (
    <div className="flex items-center gap-3 py-4 px-3 w-full">
      <Avatar className="h-10 w-10 bg-muted">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start flex-1">
        <div className="font-medium text-base leading-6 font-['Roboto',Helvetica]">
          John Doe
        </div>

        <div className="font-normal text-muted-foreground text-xs leading-4 font-['Roboto',Helvetica]">
          Fitness Enthusiast
        </div>
      </div>
    </div>
  );
};
