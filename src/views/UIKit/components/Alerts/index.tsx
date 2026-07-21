"use client";
import Block from "@/views/UIKit/shared/Block";
import Header from "@/views/UIKit/shared/Header";
import Grid from "@/views/UIKit/shared/Grid";
import GridItem from "@/views/UIKit/shared/GridItem";

import Alert from "@/views/shared/antd/Alert";
import { Text } from "@/views/shared/antd/Typography";

const Alerts = () => {
  return (
    <Block className="mb-32">
      <Header title="Alert" />
      <Grid>
        <Grid className="grid-cols-4">
          <GridItem>
            <Text className="page__text" strong>
              Info
            </Text>
          </GridItem>
          <GridItem>
            <Text className="page__text" strong>
              Success
            </Text>
          </GridItem>
          <GridItem>
            <Text className="page__text" strong>
              Warning
            </Text>
          </GridItem>
          <GridItem>
            <Text className="page__text" strong>
              Error
            </Text>
          </GridItem>
        </Grid>
        <Grid className="grid-cols-4">
          <Alert title="Title" type="info" />
          <Alert title="Title" type="success" />
          <Alert title="Title" type="warning" />
          <Alert title="Title" type="error" />
        </Grid>
      </Grid>
    </Block>
  );
};

export default Alerts;
