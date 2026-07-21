"use client";
import Grid from "@/views/UIKit/shared/Grid";
import GridItem from "@/views/UIKit/shared/GridItem";

import { Text } from "@/views/shared/antd/Typography";
import Input from "@/views/shared/antd/Input";

const InputPassword = () => {
  return (
    <Grid>
      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text" strong>
            Input password
          </Text>
        </GridItem>
        <GridItem>
          <Text className="page__text" strong>
            default
          </Text>
        </GridItem>
        <GridItem>
          <Text className="page__text" strong>
            Disabled
          </Text>
        </GridItem>
        <GridItem>
          <Text className="page__text" strong>
            Success
          </Text>
        </GridItem>
        <GridItem>
          <Text className="page__text" strong>
            Error
          </Text>
        </GridItem>
      </Grid>

      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text">Small</Text>
        </GridItem>
        <GridItem>
          <Input title="Title" size="small" type="password" />
        </GridItem>
        <GridItem>
          <Input title="Title" size="small" type="password" disabled />
        </GridItem>
        <GridItem>
          <Input
            className="ant-input-status-success"
            title="Title"
            size="small"
            type="password"
          />
        </GridItem>
        <GridItem>
          <Input
            className="ant-input-status-error"
            title="Title"
            size="small"
            type="password"
          />
        </GridItem>
      </Grid>

      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text">Middle</Text>
        </GridItem>
        <GridItem>
          <Input title="Title" type="password" />
        </GridItem>
        <GridItem>
          <Input title="Title" type="password" disabled />
        </GridItem>
        <GridItem>
          <Input
            title="Title"
            type="password"
            className="ant-input-status-success"
          />
        </GridItem>
        <GridItem>
          <Input
            title="Title"
            type="password"
            className="ant-input-status-error"
          />
        </GridItem>
      </Grid>

      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text">Large</Text>
        </GridItem>
        <GridItem>
          <Input title="Title" size="large" type="password" />
        </GridItem>
        <GridItem>
          <Input title="Title" size="large" type="password" disabled />
        </GridItem>
        <GridItem>
          <Input
            title="Title"
            size="large"
            type="password"
            className="ant-input-status-success"
          />
        </GridItem>
        <GridItem>
          <Input
            title="Title"
            size="large"
            type="password"
            className="ant-input-status-error"
          />
        </GridItem>
      </Grid>
    </Grid>
  );
};

export default InputPassword;
