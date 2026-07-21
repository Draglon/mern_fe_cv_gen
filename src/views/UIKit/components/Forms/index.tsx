"use client";
import Block from "@/views/UIKit/shared/Block";
import Header from "@/views/UIKit/shared/Header";
import Grid from "@/views/UIKit/shared/Grid";

import InputText from "./InputText";
import InputPassword from "./InputPassword";
import Select from "./Select";

const Forms = () => {
  return (
    <Block>
      <Header title="Form elements" />
      <Grid className="gap-32">
        <InputText />
        <InputPassword />
        <Select />
      </Grid>
    </Block>
  );
};

export default Forms;
