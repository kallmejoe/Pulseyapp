import React from "react";

export const BottomNavByAnima = (): JSX.Element => {
  // Navigation items data for easy maintenance and mapping
  const navItems = [
    { icon: "🏠", label: "Home" },
    { icon: "📊", label: "Progress" },
    { icon: "🔔", label: "Notifications" },
  ];

  return (
    <nav className="flex w-full items-start bg-white shadow-[0px_0px_6px_#0000001f]">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-1 relative flex-1 grow cursor-pointer"
        >
          <div className="relative w-7 h-7 mt-[-1.00px] text-xl leading-7 [font-family:'Roboto',Helvetica] font-normal text-black text-center tracking-[0] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical]">
            {item.icon}
          </div>

          <div className="relative self-stretch h-3.5 font-normal text-black text-[10px] text-center leading-[14px] whitespace-nowrap overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] [font-family:'Roboto',Helvetica] tracking-[0]">
            {item.label}
          </div>
        </div>
      ))}
    </nav>
  );
};
