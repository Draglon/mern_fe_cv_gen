import base64ToFile from "@/utils/base64ToFile";

function convertBase64ToFile(fileList: any) {
  const base64ImageString = fileList[0];
  const fileName = 'user.jpeg';
  const mimeType = 'image/jpeg';
  const initialFileObject = base64ToFile(base64ImageString, fileName, mimeType);

  return [
    {
      uid: "-1",
      name: fileName,
      status: "done",
      url: base64ImageString,
      originFileObj: initialFileObject,
    },
  ];
}

export default convertBase64ToFile;
