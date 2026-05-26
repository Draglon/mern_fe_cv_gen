"use client";
import { useTranslations } from "next-intl";
import { DownloadOutlined } from "@ant-design/icons";

import { downloadPdf } from "@/utils/downloadPdf";

import Button from "@/views/shared/antd/Button";

const ResumeTemplateNavigation = ({ resumeRef }: any) => {
  const tShared = useTranslations("shared");

  const onDownloadPdf = async () => {
    await downloadPdf(resumeRef);
  };

  return (
    <header className="template__header">
      <nav className="template__nav">
        <Button
          className="btn-download-resume"
          icon={<DownloadOutlined />}
          onClick={onDownloadPdf}
          size="small"
        >
          {tShared("downloadPDF")}
        </Button>
      </nav>
    </header>
  );
};

export default ResumeTemplateNavigation;
