const base64ToFile = async (base64String: string, filename: string, mimeType: string) => {
  const response = await fetch(base64String)
  const blob = await response.blob();
  const file = new File([blob], filename, { type: mimeType });

  return file
}

export default base64ToFile;
