"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { dec, equals } from "ramda";

import Button from "@/views/shared/antd/Button";
import Steps from "@/views/shared/antd/Steps";

type StepsProps = {
  steps: { title: string; content: ReactNode }[];
  current?: number;
  withButtons?: boolean;
  direction?: "horizontal" | "vertical";
  onNext?: () => void;
  onPrev?: () => void;
};

const StepsComponent = ({
  steps,
  current = 0,
  withButtons = false,
  direction = "horizontal",
  onNext,
  onPrev,
}: StepsProps) => {
  const isVertical = equals(direction, "vertical");

  return (
    <div className={clsx("steps", { "d-flex": isVertical })}>
      <div className={clsx("steps__steps", { "w-quarter": isVertical })}>
        <Steps steps={steps} current={current} direction={direction} />
      </div>
      <div
        className={clsx("steps__content", { "w-three-quarters": isVertical })}
      >
        {steps[current].content}
      </div>
      {withButtons && (
        <div className="steps__buttons">
          {current > 0 && <Button onClick={onPrev}>Previous</Button>}
          {current < dec(steps.length) && (
            <Button className="" type="primary" onClick={onNext}>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StepsComponent;
