import Logger from "@/utils/Logger";
import { API_PROD } from "@/constants/env";

const logger = new Logger("api");

export async function getStreamByUrl(url: string) {
  const res = await $fetch(`${API_PROD}/getStream`, {
    method: "get",
    query: { url: url },
  });
  return res as Promise<any>;
}

export async function getContent(
  type: any,
  streamType: any,
  queryContent: string | string[],
  pageNum = 1,
  pageSize = 20,
  order = "release_time"
) {
  const params: any = {
    p: pageNum,
    ps: pageSize,
    st: streamType,
    o: order,
    t: undefined,
    q: undefined,
    c: undefined,
    chs: undefined,
  };

  let queryType = "";
  switch (type) {
    case "tag":
      queryType = "t";
      break;
    case "text":
      queryType = "q";
      break;
    case "channel":
      queryType = "c";
      break;
    case "channelIds":
      queryType = "chs";
      break;
  }

  if (queryType === "t" && Array.isArray(queryContent)) {
    queryContent = queryContent.slice(0, 5);
  }
  params[queryType] = queryContent;

  // Insert some kind of trending algorithm
  logger.log(params);
  const res = await $fetch(`${API_PROD}/search`, {
    method: "get",
    query: Object.keys(params)
      .filter((k) => params[k] != undefined)
      .reduce((a, k) => ({ ...a, [k]: params[k] }), {}),
  });

  return res as Promise<any>;
}

export async function fetchCategoryData(
  category: string,
  isFetchNext: string = "n",
  pageNum: number = 1
) {
  const res = $fetch(`${API_PROD}/fetch`, {
    method: "get",
    query: { ctgy: category, n: isFetchNext, p: pageNum },
  });
  return res as Promise<any>;
}

export async function resolveClaimSingle(curl: string) {
  const res = $fetch(`${API_PROD}/resolveSingle`, {
    method: "get",
    query: { baseURL: API_PROD, curl: curl },
  });
  return res as Promise<any>;
}
