import React, { ReactNode, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

import stopPropagation from "@/utils/stopPropagation";
import Dropdown from "@/views/shared/antd/Dropdown";

type itemProps = {
  key?: string;
  label?: ReactNode;
  icon?: ReactNode;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
};

type DropdownMenuProps = {
  items: itemProps[];
  icon: ReactNode;
  shouldStopPropagation?: boolean;
};

const DropdownMenu = ({
  items,
  icon,
  shouldStopPropagation,
  ...restProps
}: DropdownMenuProps) => {
  const [visible, setVisible] = useState(false);

  const onVisibleChange = (visible: boolean): void => {
    setVisible(visible);
  };

  return (
    <RemoveScroll enabled={visible}>
      <Dropdown
        menu={{ items: items as any }}
        onOpenChange={onVisibleChange}
        open={visible}
        {...restProps}
      >
        <a
          role="button"
          onClick={shouldStopPropagation ? stopPropagation : undefined}
        >
          {icon}
        </a>
      </Dropdown>
    </RemoveScroll>
  );
};

export default DropdownMenu;
