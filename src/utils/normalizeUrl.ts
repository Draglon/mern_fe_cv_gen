import isBase64 from "@/utils/isBase64";
import getBase64 from "@/utils/getBase64";

export const normalizeUrl = async (files?: any): Promise<string> => {
  const file = files?.[0];

  if (!file) return "";

  if (isBase64(file)) return file;

  return await getBase64(file);
};
