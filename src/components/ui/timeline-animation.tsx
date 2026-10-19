import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p" | "a" | "button" | "figure" | "section" | "article";
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLDivElement | HTMLElement | null>;
  customVariants?: Variants;
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}

export function TimelineContent({
  as = "div",
  animationNum = 0,
  timelineRef: _timelineRef,
  customVariants,
  className,
  children,
  ...props
}: TimelineContentProps) {
  const Component = (motion[as as keyof typeof motion] || motion.div) as any;

  return (
    <Component
      variants={customVariants}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-30px" }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}
