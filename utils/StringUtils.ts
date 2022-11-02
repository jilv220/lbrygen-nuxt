export function parseLBRYURL(claimURL: string) {
  let trimLBRY = claimURL.slice(7);
  let res = trimLBRY.split("/");
  return res;
}
