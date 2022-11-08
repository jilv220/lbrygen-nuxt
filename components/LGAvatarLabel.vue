<script setup>
import { AVATAR_OPTIMIZE } from "@/constants/env";
import { DateTime } from "luxon";
import { parseLBRYURL } from "@/utils/StringUtils";

const props = defineProps({
  avatar: Object,
  timestamp: Number,
  showAvatar: {
    default: true,
    type: Boolean,
  },
  showRear: {
    default: false,
    type: Boolean,
  },
  showName: {
    default: false,
    type: Boolean,
  },
});

let backupTitle = ref("");
let backupThumbnail = ref("");
let optimizedThumbnail = ref("");
let relativeDT = ref("");

onBeforeMount(() => {
  if (props.avatar?.name) {
    backupTitle.value = props.avatar.name.split("").join("");
  }
  if (props.avatar?.value?.thumbnail) {
    optimizedThumbnail.value =
      AVATAR_OPTIMIZE + props.avatar.value.thumbnail.url;
    backupThumbnail.value = props.avatar.value.thumbnail.url;
  }
  if (props.timestamp) {
    relativeDT.value = DateTime.fromSeconds(props.timestamp).toRelative();
  }
});
</script>

<template>
  <BaseAvatarLabel :showAvatar="showAvatar" :showRear="showRear">
    <template v-slot:avatar>
      <NuxtLink :to="`/${parseLBRYURL(props.avatar?.short_url)[0]}`">
        <div v-if="avatar?.value?.thumbnail" id="channel-avatar">
          <TriFallbackImg
            :originURI="optimizedThumbnail"
            :backupURI="backupThumbnail"
            fallbackURI="spaceman.png"
          >
          </TriFallbackImg>
        </div>
        <img v-else src="@/assets/imgs/spaceman.png" />
      </NuxtLink>
    </template>
    <template v-slot:label>
      <NuxtLink :to="`/${parseLBRYURL(props.avatar?.short_url)[0]}`">
        <div id="channel-title">
          <div v-if="avatar?.value?.title">
            {{ avatar.value.title }}
          </div>
          <div v-else-if="backupTitle">
            {{ backupTitle.replace("@", "") }}
          </div>
          <div v-else>Anonymous</div>
          <div id="channel-name" v-if="showName">
            {{ avatar?.name }}
          </div>
        </div>
      </NuxtLink>
      <div class="text-sm">
        {{ relativeDT }}
      </div>
    </template>
    <template v-slot:rear>
      <div v-if="showRear">
        <slot name="rear"></slot>
      </div>
      <div v-else></div>
    </template>
  </BaseAvatarLabel>
</template>

<style>
#channel-avatar {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
#channel-title {
  font-size: 0.78rem;
  font-weight: 300;
  cursor: pointer;
}
</style>
