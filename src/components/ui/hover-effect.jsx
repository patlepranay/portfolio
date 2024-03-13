/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";

export const HoverEffect = ({ items, className, type = "array" }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid md:grid-cols-3 grid-cols-2  ", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-transparent border-2 border-neutral-700 block "
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          {type === "object" ? (
            <Card className="p-5 flex flex-col justify-between  ">
              <div className="w-full h-[230px] ">
                <img
                  src={item.image}
                  alt="project_image"
                  className="w-full h-full object-contain"
                />
              </div>
              <CardTitle className="text-white font-bold text-[24px] mt-5">
                {item.title}
              </CardTitle>
              <CardDescription className={"mt-4"}>
                {item?.description}
              </CardDescription>
              <div className="flex gap-2 mt-4 flex-wrap">
                {item.tags.map((tag, index) => (
                  <span key={`${index}`} className={`text-[14px]`}>
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <CardTitle>{item}</CardTitle>
              <CardDescription>{item?.description}</CardDescription>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        " h-full w-full overflow-hidden bg-stone-950 border border-neutral-700 dark:border-white    hover:border-transparent transition-all duration-500 ease-in-out	 relative z-20 p-6",
        className
      )}
    >
      <div className="relative z-50">
        <div className="">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return <h4 className={cn("text-white ", className)}>{children}</h4>;
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        " text-zinc-300 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
