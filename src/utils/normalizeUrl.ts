import isBase64 from "@/utils/isBase64";
import getBase64Url from "@/utils/getBase64Url";

export const normalizeUrl = async (files?: any): Promise<string> => {
  const file = files?.[0];

  if (!file) return "";

  if (isBase64(file)) return file;

  return await getBase64Url(file);
};
