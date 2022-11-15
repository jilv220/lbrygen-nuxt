import { NOCHANNEL } from "@/constants/strings";

export function parseLBRYURL(claimURL: string) {
  // URL undefined
  if (claimURL === undefined) {
    return [NOCHANNEL];
  }

  let trimLBRY = claimURL.slice(7).replaceAll("#", ":");
  let res = trimLBRY.split("/");

  // Fix URL without channel
  if (res[0][0] !== "@" && res[1] === undefined) {
    res[1] = res[0];
    res[0] = NOCHANNEL;
  }

  return res;
}
