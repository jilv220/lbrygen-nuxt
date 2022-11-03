<script setup lang="ts">
import primaryNav from "@/constants/primaryNavigation";
import categories from "@/constants/categories";
import { fetchCategoryData } from "@/apis/api";

import { onBeforeMount, ref } from "vue";
import { viewMoreIcon } from "@/constants/svgs";

// let subscriptions: string[]
const contentCollection = ref();
onBeforeMount(async () => {
  // subscriptions = await getAllSubscriptions()
  // contentCollection.value = []
  // Don't show following if no subscription
  // if (subscriptions.length !== 0) {
  //     const sourceData = await EventService.getContent('channelIds', 'video', subscriptions)
  //     const items = sourceData?.result?.items
  //     contentCollection.value = [{category: primaryNav[1], items: items.slice(0, 12)}]
  // }
  contentCollection.value = [];
  for (const i in categories) {
    const sourceData = await fetchCategoryData(categories[i].label);
    const items = sourceData?.result?.items;
    contentCollection.value.push({
      category: categories[i],
      items: items.slice(0, 12),
    });
  }
});
</script>

<template>
  <div id="content">
    <div v-for="content in contentCollection" key="item">
      <ContentFragment
        :icon="content.category.icon"
        :content-label="content.category.label"
        :items="content.items"
      >
      </ContentFragment>
      <NuxtLink :to="{ path: `/${content.category.link}` }">
        <label
          class="label flex flex-row justify-end mb-8 text-green cursor-pointer"
        >
          <span> View More </span>
          <span class="ml-2" v-html="viewMoreIcon"></span>
        </label>
      </NuxtLink>
    </div>
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
