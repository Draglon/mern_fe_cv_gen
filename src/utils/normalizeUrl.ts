import getBase64 from "@/utils/getBase64";

export const normalizeUrl = async (files?: any): Promise<string> => {
  const file = files?.[0];

  if (!file) return "";

  return await getBase64(file);
};
