<script setup lang="ts">
import CardItem from "./CardItem.vue";
import { upperFirst } from "lodash-es";
import { parseLBRYURL } from "@/utils/StringUtils";

const props = defineProps({
  icon: String,
  contentLabel: String,
  items: Array<any>, // need to define interface
});

let layout = ref(true);

function changeLayout() {
  // const layout = document.getElementById("layout");
  // layout.style.display = "unset";

  // const cardClaims = document.getElementsByClassName("flex flex-col");
  // for (let cardClaim of cardClaims) {
  //   let cardClaimEle = cardClaim as HTMLElement;
  //   cardClaimEle.style.flexDirection = "row";
  // }

  // const thumbnails = document.getElementsByClassName("card-thumbnail");
  // for (let thumbnail of thumbnails) {
  //   let thumbnailEle = thumbnail as HTMLElement;
  //   thumbnailEle.style.width = "14.5rem";
  //   thumbnailEle.style.height = "calc(14.5rem / 1.7)";
  // }
  layout.value = !layout.value;
  console.log(layout.value);
}
</script>

<template>
  <label class="label justify-start pb-3">
    <span v-html="icon" class="mr-2"></span>
    <span class="label-text text-lg font-bold">
      {{ upperFirst(contentLabel) }}</span
    >
  </label>

  <div class="btn-group flex justify-start">
    <button class="btn" @click="changeLayout()">Change Layout</button>
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
              <!-- <router-link :to="tagRoutes(tag)">
                <div
                  v-if="!isLastTag(tag, item.value.tags.slice(0, 3))"
                  class="badge tag-spacing rounded-md bg-secondary"
                >
                  {{ tag }}
                </div>
                <div v-else class="badge rounded-md bg-secondary">
                  {{ tag }}
                </div>
              </router-link> -->
            </div>
          </div>
        </template>
      </SearchItem>
    </li>
  </ul>
</template>
