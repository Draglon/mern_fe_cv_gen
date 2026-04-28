"use client";
import { useTranslations } from "next-intl";
import { Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Button from "@/views/shared/antd/Button";

type FormListType = {
  name: string;
  prepend?: any;
  append?: any;
  fieldValues?: any;
  children: React.ReactNode;
};

const FormList = ({
  name,
  append,
  prepend,
  fieldValues,
  children,
}: FormListType) => {
  const tShared = useTranslations("shared");

  const onPrepend = (add: any) => () => {
    prepend(add(fieldValues));
  };

  const onAppend = () => {
    append();
  };

  return (
    <Form.List name={name}>
      {(_, { add }) => (
        <>
          {prepend && (
            <Button
              onClick={onPrepend(add)}
              icon={<PlusOutlined />}
              size="small"
            >
              {tShared("addField")}
            </Button>
          )}
          {children}
          {append && (
            <Button onClick={onAppend} icon={<PlusOutlined />} size="small">
              {tShared("addField")}
            </Button>
          )}
        </>
      )}
    </Form.List>
  );
};

export default FormList;
