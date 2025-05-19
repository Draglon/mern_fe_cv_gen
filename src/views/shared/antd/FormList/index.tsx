"use client";
import { Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import FormItem from "@/views/shared/antd/FormItem";
import Button from "@/views/shared/antd/Button";

type FormListType = {
  name: string;
  append: any;
  children: React.ReactNode;
};

const FormList = ({ name, append, children }: FormListType) => {
  return (
    <Form.List name={name}>
      {() => (
        <>
          {children}
          <FormItem className="form__item--button-add" name="addButton">
            <Button onClick={() => append()} icon={<PlusOutlined />}>
              Add field
            </Button>
          </FormItem>
        </>
      )}
    </Form.List>
  );
};

export default FormList;
