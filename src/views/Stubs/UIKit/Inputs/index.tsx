"use client";
import { Title } from "@/views/shared/antd/Typography";
import Input from "@/views/shared/antd/Input";

const Inputs = () => {
  return (
    <div className="page__block">
      <header className="mb-32">
        <Title className="page__title" level={3}>
          Form elements
        </Title>
      </header>
      <div className="">
        <div className="d-flex gap-16 mb-16 align-items-center">
          <Title className="page__title" style={{ width: "100px" }} level={4}>
            Input
          </Title>
          <div style={{ width: "200px" }}>default</div>
          <div style={{ width: "200px" }}>Disabled</div>
          <div style={{ width: "200px" }}>Success</div>
          <div style={{ width: "200px" }}>Error</div>
        </div>

        <div className="d-flex gap-16 mb-16 align-items-center">
          <div style={{ width: "100px" }}>Small</div>
          <div style={{ width: "200px" }}>
            <Input title="Title" size="small" />
          </div>
          <div style={{ width: "200px" }}>
            <Input title="Title" size="small" disabled />
          </div>
          <div style={{ width: "200px" }}>
            <Input
              title="Title"
              size="small"
              className="ant-input-status-success"
            />
          </div>
          <div style={{ width: "200px" }}>
            <Input
              title="Title"
              size="small"
              className="ant-input-status-error"
            />
          </div>
        </div>

        <div className="d-flex gap-16 mb-16 align-items-center">
          <div style={{ width: "100px" }}>Middle</div>
          <div style={{ width: "200px" }}>
            <Input title="Title" />
          </div>
          <div style={{ width: "200px" }}>
            <Input title="Title" disabled />
          </div>
          <div style={{ width: "200px" }}>
            <Input title="Title" className="ant-input-status-success" />
          </div>
          <div style={{ width: "200px" }}>
            <Input title="Title" className="ant-input-status-error" />
          </div>
        </div>

        <div className="d-flex gap-16 mb-16 align-items-center">
          <div style={{ width: "100px" }}>Large</div>
          <div style={{ width: "200px" }}>
            <Input title="Title" size="large" />
          </div>
          <div style={{ width: "200px" }}>
            <Input title="Title" size="large" disabled />
          </div>
          <div style={{ width: "200px" }}>
            <Input
              title="Title"
              size="large"
              className="ant-input-status-success"
            />
          </div>
          <div style={{ width: "200px" }}>
            <Input
              title="Title"
              size="large"
              className="ant-input-status-error"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
