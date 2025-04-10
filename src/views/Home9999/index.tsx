"use client";
import { useTranslations } from "next-intl";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  incremented,
  decremented,
  incrementByAmount,
} from "@/store/counter/actions";
import { showModal as showModalAction } from "@/store/modal/actions";
import { counterSelector } from "@/store/counter/selectors";
import { UserOutlined } from "@ant-design/icons";
import Button from "@/views/shared/antd/Button";
import Avatar from "@/views/shared/antd/Avatar";

const Login = () => {
  const t = useTranslations("Home");
  const dispatch = useAppDispatch();
  const counterValue = useAppSelector(counterSelector);

  const incrementByAmountHandle = (value: number) => () => {
    dispatch(incrementByAmount(value));
  };

  const incrementedHandle = () => {
    dispatch(incremented());
  };

  const decrementedHandle = () => {
    dispatch(decremented());
  };

  const showModal = () => {
    dispatch(
      showModalAction({
        modalType: "CONFIRM_MODAL",
        modalProps: {
          title: "Title",
          content: "Content",
        },
      })
    );
  };

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <h1>{counterValue}</h1>
      <Button onClick={incrementedHandle}>Increment</Button>
      <br />
      <Button onClick={decrementedHandle}>Decrement</Button>
      <br />
      <Button onClick={incrementByAmountHandle(5)}>incrementByAmount</Button>
      <br />
      <Avatar shape="square" icon={<UserOutlined />} />
      <input type="search" />
      <br />
      <Button onClick={showModal}>showModal</Button>
    </div>
  );
};

export default Login;
