export const getNotificationMessages = async (
  locale: string,
  domain: string,
  action: string
) => {
  const normalizedLocale = locale.split("-")[0];
  const messages = (await import(`@/messages/${normalizedLocale}/index`)).default;

  const t = (key: string) =>
    key.split(".").reduce((acc, part) => acc?.[part], messages) ?? key;

  return {
    success: t(`notifications.${domain}.${action}.success`),
    error: t(`notifications.${domain}.${action}.error`),
  };
};
