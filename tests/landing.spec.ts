import { test, expect } from "@playwright/test";

const locales = [
  {
    locale: "en",
    title: "Create your professional resume",
    description:
      "Build a professional resume in minutes with our free online resume builder. Customize and download your resume easily.",
    heading: "Build Your Professional Resume",
    subtitle: "Create a professional resume in just 15 minutes.",
    button: "Create resume",
  },
  // {
  //   locale: "ua",
  //   title: "Створіть професійне резюме",
  //   description: "...",
  //   heading: "...",
  //   subtitle: "...",
  //   button: "...",
  // },
  // {
  //   locale: "ru",
  //   title: "Создайте свое профессиональное резюме",
  //   description: "...",
  //   heading: "...",
  //   subtitle: "...",
  //   button: "...",
  // },
];

for (const { locale, title, description, heading, subtitle, button } of locales) {
  test(`home page - ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);

    await expect(page).toHaveTitle(title);

    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      description
    );

    await expect(
      page.getByRole("heading", { level: 2, name: heading })
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 4, name: subtitle })
    ).toBeVisible();

    const createResumeButton = page.getByTestId("btnCreateResume");

    await expect(createResumeButton).toBeVisible();
    await expect(createResumeButton).toHaveText(button);

    await createResumeButton.click();

    await expect(page).toHaveURL(`/${locale}/login`);
  });
}