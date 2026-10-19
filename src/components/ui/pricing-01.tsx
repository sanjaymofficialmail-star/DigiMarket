"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";

export type PricingPlan = {
  plan_bg_color: string;
  plan_name: string;
  plan_tag?: string;
  plan_descp: string;
  plan_price: string;
  original_price: string;
  discount_badge: string;
  popular?: boolean;
  enroll_url: string;
  plan_feature: string[];
};

const pricingData: PricingPlan[] = [
  {
    plan_bg_color: "bg-primary/5 dark:bg-primary/10 border border-primary/25 shadow-md",
    plan_name: "Online Batch",
    plan_tag: "Flexible Live Sessions",
    plan_descp: "Live practical classes with hands-on projects & mentor feedback.",
    plan_price: "\u20B94,999",
    original_price: "\u20B910,000",
    discount_badge: "50% OFF",
    enroll_url: "#application/forms",
    plan_feature: [
      "8 Weeks Live Sessions",
      "100+ Live Guided Hours",
      "Hands-on AI SEO Labs",
      "Google & Meta Paid Ads",
      "GA4 Web Analytics",
      "PGI Industry Certificate",
      "Interview & Resume Prep",
    ],
  },
  {
    plan_bg_color: "bg-accent/15 dark:bg-accent/20 border-2 border-primary/50 shadow-xl relative",
    plan_name: "Offline Classroom",
    plan_tag: "Most Popular \u00B7 Placement",
    plan_descp: "In-person campus learning with live clients & placement drive.",
    plan_price: "\u20B914,999",
    original_price: "\u20B950,000",
    discount_badge: "70% OFF",
    popular: true,
    enroll_url: "#application/forms",
    plan_feature: [
      "Everything in Online Batch",
      "In-Person Chennai Mentorship",
      "100% Placement Guarantee",
      "Live Client Ad Budgets",
      "1-on-1 Portfolio Reviews",
      "Agency Workflow Labs",
      "Lifetime Lab & Community",
    ],
  },
];

export interface PricingProps {
  onEnroll?: (mode: "Online" | "Offline") => void;
}

const Pricing = ({ onEnroll }: PricingProps = {}) => {
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section id="pricing" className="bg-background py-8 sm:py-12 lg:py-14 border-t border-border/40 scroll-mt-6 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 md:gap-8 justify-center items-center w-full">
          {/* Header */}
          <div className="flex flex-col gap-2 justify-center items-center text-center max-w-xl">
            <Badge
              variant="outline"
              className="py-0.5 px-3 text-[11px] font-semibold uppercase tracking-wider border-primary/40 text-primary bg-primary/5"
            >
              Course Fees & Plans
            </Badge>
            <h2 className="text-foreground text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
              Choose Your Learning Pathway
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-md">
              Compare our Online and Offline classroom programs side by side.
            </p>
          </div>

          {/* Pricing Plans Grid */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full max-w-5xl">
            {pricingData.map((item: PricingPlan, index: number) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                custom={index}
                className="w-full flex"
              >
                <Card
                  className={cn(
                    item.plan_bg_color,
                    "p-5 sm:p-6 lg:p-7 rounded-2xl w-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5",
                  )}
                >
                  {item.popular && (
                    <div className="absolute -top-3 right-5 flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                      <Sparkles size={12} className="text-accent" />
                      Recommended
                    </div>
                  )}

                  <CardContent className="flex flex-col sm:flex-row gap-5 md:gap-6 items-start px-0 pb-0 h-full w-full">
                    {/* Left details & price */}
                    <div className="flex flex-col justify-between items-start gap-4 w-full sm:w-[42%] shrink-0">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <Badge className="py-0.5 px-2.5 text-xs font-semibold bg-primary text-primary-foreground">
                            {item.plan_name}
                          </Badge>
                          <span className="text-[10px] font-bold text-accent px-2 py-0.5 rounded-full bg-accent/20">
                            {item.discount_badge}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-primary">
                          {item.plan_tag}
                        </p>
                        <p className="text-xs text-muted-foreground leading-snug">
                          {item.plan_descp}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 w-full">
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs text-muted-foreground line-through opacity-70">
                              {item.original_price}
                            </span>
                            <span className="text-[10px] font-bold uppercase text-primary tracking-wide">
                              Limited Seats
                            </span>
                          </div>
                          <p className="text-3xl sm:text-4xl font-serif font-bold text-card-foreground flex items-baseline gap-1.5">
                            {item.plan_price}
                            <span className="text-xs font-sans font-normal text-muted-foreground">
                              / full course
                            </span>
                          </p>
                        </div>

                        {onEnroll ? (
                          <div
                            onClick={() => onEnroll(item.plan_name.includes("Offline") ? "Offline" : "Online")}
                            className="w-full sm:w-fit cursor-pointer"
                          >
                            <Button className="relative bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full h-10 px-4 pe-11 group transition-all duration-300 hover:pe-4 hover:ps-11 w-full sm:w-fit overflow-hidden cursor-pointer shadow-sm">
                              <span className="relative z-10 transition-all duration-300">
                                Enroll Now
                              </span>
                              <div className="absolute right-1 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 shadow-sm">
                                <ArrowUpRight size={14} />
                              </div>
                            </Button>
                          </div>
                        ) : (
                          <a
                            href={item.enroll_url}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full sm:w-fit"
                          >
                            <Button className="relative bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full h-10 px-4 pe-11 group transition-all duration-300 hover:pe-4 hover:ps-11 w-full sm:w-fit overflow-hidden cursor-pointer shadow-sm">
                              <span className="relative z-10 transition-all duration-300">
                                Enroll Now
                              </span>
                              <div className="absolute right-1 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center transition-all duration-300 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 shadow-sm">
                                <ArrowUpRight size={14} />
                              </div>
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Separators */}
                    <Separator
                      orientation="vertical"
                      className="hidden sm:block min-h-[190px]"
                    />
                    <Separator
                      orientation="horizontal"
                      className="sm:hidden block w-full"
                    />

                    {/* Right features column: 1-line clean comparison without multi-line wrapping */}
                    <div className="flex flex-col items-start gap-2 grow w-full sm:w-[58%]">
                      <p className="text-card-foreground text-xs sm:text-sm font-semibold tracking-tight mb-0.5">
                        What's Included:
                      </p>
                      <ul className="flex flex-col items-start gap-1.5 w-full">
                        {item.plan_feature.map((feature: string, fIndex: number) => (
                          <li
                            key={fIndex}
                            className="flex items-center gap-2 text-card-foreground text-xs sm:text-[13px] leading-tight whitespace-nowrap"
                          >
                            <div className="rounded-full bg-primary/15 p-0.5 shrink-0 text-primary">
                              <Check size={12} strokeWidth={2.5} />
                            </div>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
