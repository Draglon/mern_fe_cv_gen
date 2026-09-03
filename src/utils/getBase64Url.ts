import type { GetProp, UploadFile, UploadProps } from "antd";

import getBase64 from "./getBase64";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getUrl = async (file: UploadFile) => file.url || await getBase64(file.originFileObj as FileType);

export default getUrl;