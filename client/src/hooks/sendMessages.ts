import { executeMessages } from "@/api";

export const sendMesssage = async (
  code: any,
  inputData: string,
  languageName: string
): Promise<string> => {
  const apiEndpoint = `${process.env.BACKEND_URL}/sendmessages`;

  return executeMessages(apiEndpoint, { code, inputData });
};
