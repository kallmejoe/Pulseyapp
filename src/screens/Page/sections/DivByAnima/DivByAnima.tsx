import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

export const DivByAnima = (): JSX.Element => {
  // Data for community posts to enable mapping
  const communityPosts = [
    {
      id: 1,
      imageLabel: "Workout Selfie",
      description: "Great workout session today!",
      tag: "Fitness",
      username: "FitnessFanatic",
    },
    {
      id: 2,
      imageLabel: "Healthy Meal",
      description: "Delicious and nutritious meal prep!",
      tag: "Nutrition",
      username: "HealthyEater",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-2 px-3 py-0 w-full">
      <header className="flex items-center gap-3 pt-4 pb-0 px-0 w-full">
        <div className="flex flex-col items-start flex-1">
          <h2 className="font-medium text-black text-lg leading-6 [font-family:'Roboto',Helvetica]">
            Fitness Community
          </h2>
        </div>
      </header>

      <div className="flex items-start gap-2 w-full">
        {communityPosts.map((post) => (
          <Card
            key={post.id}
            className="flex-1 overflow-hidden border border-solid border-[#0000001a] rounded-md"
          >
            <div className="flex h-[164px] items-start w-full">
              <div className="flex-1 bg-[#0000000d] relative">
                <div className="absolute w-[132px] h-4 top-[73px] left-4 font-normal text-black text-xs text-center leading-4 whitespace-nowrap [font-family:'Roboto',Helvetica]">
                  {post.imageLabel}
                </div>

                <div className="absolute top-[152px] left-[60px] inline-flex items-center justify-center gap-1">
                  <div className="w-5 bg-white h-1 rounded-[100px]" />
                  <div className="w-1 bg-[#0000004c] h-1 rounded-[100px]" />
                  <div className="w-1 bg-[#0000004c] h-1 rounded-[100px]" />
                  <div className="w-1 bg-[#0000004c] h-1 rounded-[100px]" />
                </div>
              </div>
            </div>

            <CardContent className="flex flex-col items-start gap-2 p-2">
              <p className="font-normal text-black text-xs leading-4 [font-family:'Roboto',Helvetica]">
                {post.description}
              </p>

              <div className="flex items-center gap-1.5 w-full">
                <Badge
                  variant="outline"
                  className="px-1 py-0.5 bg-[#0000000d] rounded-sm border-[0.5px] border-[#0000001a]"
                >
                  <span className="font-normal text-black text-xs [font-family:'Roboto',Helvetica] leading-4">
                    {post.tag}
                  </span>
                </Badge>
              </div>

              <div className="flex items-center gap-2 w-full">
                <div className="w-5 h-5 bg-[#0000001a] rounded-[20px]" />
                <div className="flex flex-col items-start flex-1">
                  <span className="font-medium text-black text-xs leading-4 [font-family:'Roboto',Helvetica]">
                    {post.username}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
