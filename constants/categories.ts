import svgs from "./svgs";
import { ISideBarItem } from "./interfaces";

const featured = {
  link: "$/featured",
  icon: svgs.featuredIcon,
  label: "featured",
};
const education = {
  link: "$/education",
  icon: svgs.educationIcon,
  label: "education",
};
const gaming = {
  link: "$/gaming",
  icon: svgs.gamingIcon,
  label: "gaming",
};
const tech = {
  link: "$/tech",
  icon: svgs.chipIcon,
  label: "tech",
};
const news = {
  link: "$/news",
  icon: svgs.newsIcon,
  label: "news",
};

const lbry = {
  link: "lbry",
  icon: svgs.newsIcon,
  label: "lbry",
};
const vtuber = {
  link: "vtuber",
  icon: svgs.homeIcon,
  label: "vtuber",
};

const categories: Array<ISideBarItem> = [
  featured,
  education,
  gaming,
  tech,
  news,
];

export default categories;
