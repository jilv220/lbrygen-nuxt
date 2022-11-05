<script setup lang="ts">
import categories from "@/constants/categories";
import ContentFragment from "@/components/ContentFragment.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchCategoryData, getContent } from "@/apis/api";
import { upperFirst } from "lodash-es";

let items = ref();
let isSearch = false;

const router = useRouter();
let categoryName = router.currentRoute.value.params?.category as string;

let currRoute = "$/" + categoryName;
let currIcon;

if (categoryName !== "search") {
  currIcon = categories.filter((category) => category.link === currRoute)[0]
    .icon;
} else {
  isSearch = true;
}

let pageNum = isSearch ? 2 : 6;
let searchContent = isSearch ? router.currentRoute.value.query?.q : undefined;

// Setup metadata
useHead({
  title: upperFirst(categoryName),
});

onBeforeMount(async () => {
  try {
    let sourceData = await fetchSearchOrCategoryData();
    items.value = sourceData?.result?.items;
  } catch (err) {
    console.log(err);
  }
});

watch(
  () => router.currentRoute.value.query.q,
  async (value) => {
    searchContent = value;
    let sourceData = await fetchSearchOrCategoryData();
    items.value = sourceData?.result?.items;
    window.scrollTo({ top: 0, left: 0 });
  }
);

async function fetchSearchOrCategoryData(pageNum: number = 1) {
  return isSearch
    ? await getContent("text", "video", searchContent, pageNum)
    : await fetchCategoryData(categoryName, "y", pageNum);
}

async function infiniteHandler() {
  const sourceData = await fetchSearchOrCategoryData(pageNum);
  const moreItems = sourceData?.result?.items;
  items?.value?.push(...moreItems);
  pageNum += 1;
}
</script>

<template>
  <div>
    <div id="content">
      <ContentFragment
        :icon="currIcon"
        :content-label="categoryName"
        :items="items"
      ></ContentFragment>
    </div>
    <InfiniteScroll :infinite="infiniteHandler"></InfiniteScroll>
  </div>
</template>

<style lang="scss">
#card-avatar-label .flex .flex {
  .avatar {
    width: 2.1rem;
    height: 2.1rem;
    cursor: pointer;
  }
  #channel-title {
    cursor: pointer;
  }
}
.label > span {
  svg {
    height: 16px;
    width: 16px;
  }
}
</style>
