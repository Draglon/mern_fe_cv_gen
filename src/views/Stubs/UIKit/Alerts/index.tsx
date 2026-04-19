"use client";
import { Title } from "@/views/shared/antd/Typography";
import Alert from "@/views/shared/antd/Alert";

const Alerts = () => {
  return (
    <div className="page__block mb-32">
      <Title className="page__title" level={4}>
        Alert
      </Title>
      <div
        className="d-grid gap-16 mb-16"
        style={{ gridTemplateColumns: "repeat(4, calc(25% - 12px))" }}
      >
        <div>Info</div>
        <div>Success</div>
        <div>Warning</div>
        <div>Error</div>
      </div>
      <div
        className="d-grid gap-16"
        style={{ gridTemplateColumns: "repeat(4, calc(25% - 12px))" }}
      >
        <Alert title="Title" type="info" />
        <Alert title="Title" type="success" />
        <Alert title="Title" type="warning" />
        <Alert title="Title" type="error" />
      </div>
    </div>
  );
};

export default Alerts;
