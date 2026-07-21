"use client";
import Grid from "@/views/UIKit/shared/Grid";
import GridItem from "@/views/UIKit/shared/GridItem";

import { Text } from "@/views/shared/antd/Typography";
import AntdSelect from "@/views/shared/antd/Select";

const Select = () => {
  return (
    <Grid>
      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text" strong>
            Select
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
          <AntdSelect title="Title" size="small" />
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" size="small" disabled />
        </GridItem>
        <GridItem>
          <AntdSelect
            className="ant-select-status-success"
            title="Title"
            size="small"
          />
        </GridItem>
        <GridItem>
          <AntdSelect
            className="ant-select-status-error"
            title="Title"
            size="small"
          />
        </GridItem>
      </Grid>

      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text">Middle</Text>
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" />
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" disabled />
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" className="ant-select-status-success" />
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" className="ant-select-status-error" />
        </GridItem>
      </Grid>

      <Grid className="grid-sidebar-150-cols-4 align-items-center">
        <GridItem>
          <Text className="page__text">Large</Text>
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" size="large" />
        </GridItem>
        <GridItem>
          <AntdSelect title="Title" size="large" disabled />
        </GridItem>
        <GridItem>
          <AntdSelect
            title="Title"
            size="large"
            className="ant-select-status-success"
          />
        </GridItem>
        <GridItem>
          <AntdSelect
            title="Title"
            size="large"
            className="ant-select-status-error"
          />
        </GridItem>
      </Grid>
    </Grid>
  );
};

export default Select;
