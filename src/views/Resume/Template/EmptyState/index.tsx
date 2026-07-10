"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

import emptyStateImg from "@/assets/images/template/empty-state.png";
import Button from "@/views/shared/antd/Button";
import NavigationLink from "@/views/shared/NavigationLink";
import { Title, Paragraph } from "@/views/shared/antd/Typography";

const ResumeTemplateEmptyState = () => {
  const t = useTranslations("Template");

  return (
    <div className="template-empty-state">
      <Image
        className="template-empty-state__image"
        src={emptyStateImg}
        alt={t("emptyState.alt")}
      />
      <Title
        className="template-empty-state__title page__title mb-16"
        level={1}
      >
        {t("emptyState.title")}
      </Title>
      <Paragraph className="template-empty-state__description page__text mb-16">
        {t("emptyState.description")}
      </Paragraph>
      <NavigationLink href="/resume_create">
        <Button type="primary" size="large">
          {t("emptyState.button")}
        </Button>
      </NavigationLink>
    </div>
  );
};

export default ResumeTemplateEmptyState;
