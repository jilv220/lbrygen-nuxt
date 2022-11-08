<script setup lang="ts">
import CardItem from "./CardItem.vue";
import { upperFirst, last } from "lodash-es";
import { parseLBRYURL } from "@/utils/StringUtils";

const props = defineProps({
  icon: String,
  contentLabel: String,
  items: Array<any>, // need to define interface
});

// Default ListLayout for searches
let layout = props.contentLabel === "search" ? ref(false) : ref(true);

const noLabelContent = ["search", undefined];
const noLayoutTogglePath = ["/", "/$/search"];

// onBeforeMount(() => {
//   console.log(props.contentLabel);
// });

function changeLayout() {
  layout.value = !layout.value;
}

function isLastTag(tag, tags) {
  return tag === last(tags);
}
</script>

<template>
  <div>
    <label
      v-if="!noLabelContent.includes(contentLabel)"
      class="label justify-start pb-3"
    >
      <span v-html="icon" class="mr-2"></span>
      <span class="label-text text-lg font-bold">
        {{ upperFirst(contentLabel) }}</span
      >
    </label>

    <div
      v-if="!noLayoutTogglePath.includes($router.currentRoute.value.path)"
      class="btn-group flex justify-start mb-8"
    >
      <button class="btn" @click="changeLayout()">Change Layout</button>
    </div>
  </div>

  <!-- GridLayout -->
  <ul v-if="layout === true" id="layout" class="grid grid-cols-4 gap-4">
    <li v-for="item in items" :key="item" class="pb-8">
      <CardItem
        :thumbnail="item.value.thumbnail"
        :avatar="item.signing_channel"
        :curl="item.canonical_url"
        :timestamp="item.timestamp"
      >
        <template v-slot:center>
          <NuxtLink
            :to="{
              name: 'channel-stream',
              params: {
                channel: parseLBRYURL(item.canonical_url)[0],
                stream: parseLBRYURL(item.canonical_url)[1],
              },
            }"
          >
            <div v-if="item.value.title">
              {{ item.value.title }}
            </div>

            <div v-else>
              {{ item.name }}
            </div>
          </NuxtLink>
        </template>
      </CardItem>
    </li>
  </ul>

  <!-- ListLayout -->
  <ul v-else>
    <li v-for="item in items" :key="item">
      <SearchItem
        :thumbnail="item.value.thumbnail"
        :avatar="item.signing_channel"
        :timestamp="item.timestamp"
      >
        <template v-slot:center>
          <NuxtLink
            :to="{
              name: 'channel-stream',
              params: {
                channel: parseLBRYURL(item.canonical_url)[0],
                stream: parseLBRYURL(item.canonical_url)[1],
              },
            }"
          >
            <div v-if="item.value.title">
              {{ item.value.title }}
            </div>
            <div v-else>
              {{ item.name }}
            </div>
          </NuxtLink>
        </template>
        <template v-slot:rear>
          <div v-if="item.value.tags" id="tag-group" class="flex">
            <div v-for="tag in item.value.tags.slice(0, 3)" :key="tag">
              <NuxtLink
                :to="{ path: '/$/search', query: { q: tag }, force: true }"
              >
                <div
                  :class="{
                    'tag-spacing': !isLastTag(tag, item.value.tags.slice(0, 3)),
                  }"
                  class="badge tag-spacing rounded-md bg-secondary"
                >
                  {{ tag }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </template>
      </SearchItem>
    </li>
  </ul>
</template>

<style lang="scss">
.tag-spacing {
  margin: 0 6.4px 0 0;
}

.badge {
  @apply hover:bg-green;
  @apply border-0;
  cursor: pointer;
}
</style>
