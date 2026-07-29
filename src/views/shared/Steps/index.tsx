"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { dec, equals } from "ramda";
import { useTranslations } from "next-intl";

import Button from "@/views/shared/antd/Button";
import Steps from "@/views/shared/antd/Steps";

export type StepsProps = {
  steps: { title: string; content: ReactNode }[];
  current?: number;
  withButtons?: boolean;
  orientation?: "horizontal" | "vertical";
  onNext?: () => void;
  onPrev?: () => void;
};

const StepsComponent = ({
  steps,
  current = 0,
  withButtons = false,
  orientation = "horizontal",
  onNext,
  onPrev,
}: StepsProps) => {
  const tShared = useTranslations("shared");
  const isVertical = equals(orientation, "vertical");

  return (
    <div className={clsx("steps", { "d-flex": isVertical })}>
      <div className={clsx("steps__steps", { "w-quarter": isVertical })}>
        <Steps steps={steps} current={current} orientation={orientation} />
      </div>
      <div
        className={clsx("steps__content", { "w-three-quarters": isVertical })}
        data-testid="steps-content"
      >
        {steps[current].content}
      </div>
      {withButtons && (
        <div className="steps__buttons">
          {current > 0 && (
            <Button onClick={onPrev} dataTestId="btn-previous">
              {tShared("previous")}
            </Button>
          )}
          {current < dec(steps.length) && (
            <Button type="primary" onClick={onNext} dataTestId="btn-next">
              {tShared("next")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default StepsComponent;
