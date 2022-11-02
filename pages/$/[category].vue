<script setup lang="ts">
import categories from "@/constants/categories";
import ContentFragment from "@/components/ContentFragment.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchCategoryData } from "@/apis/api";

let items = ref();
let pageNum = 6;

const router = useRouter();
let categoryName = router.currentRoute.value.params?.category as string;
let currRoute = "$/" + categoryName;
let currIcon = categories.filter((category) => category.link === currRoute)[0]
  .icon;

async function infiniteHandler() {
  const sourceData = await fetchCategoryData(categoryName, "y", pageNum);
  const moreItems = sourceData?.result?.items;
  items?.value?.push(...moreItems);
  pageNum += 1;
}

onBeforeMount(async () => {
  try {
    let sourceData = await fetchCategoryData(categoryName);
    items.value = sourceData?.result?.items;
  } catch (err) {
    console.log(err);
  }
});
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
