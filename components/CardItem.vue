<script setup>
import { THUMBNAIL_OPTIMIZE } from "@/constants/env";

const props = defineProps({
  thumbnail: Object,
  avatar: Object,
  timestamp: Number,
  curl: String,
  showAvatar: {
    default: true,
    type: Boolean,
  },
});

let backupThumbnail = ref("");
let optimizedThumbnail = ref("");

onBeforeMount(() => {
  if (props.thumbnail?.url) {
    optimizedThumbnail.value = THUMBNAIL_OPTIMIZE + props.thumbnail.url;
    backupThumbnail.value = props.thumbnail.url;
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="avatar inline-block">
      <!-- <NuxtLink :to="{ name: 'stream', query: { curl: curl } }"> -->
      <div id="card-thumbnail" class="rounded">
        <TriFallbackImg
          v-if="thumbnail"
          :originURI="optimizedThumbnail"
          :backupURI="backupThumbnail"
          fallbackURI="spaceman.png"
        >
        </TriFallbackImg>
        <img v-else src="@/assets/imgs/spaceman.png" />
      </div>
      <!-- </NuxtLink> -->
    </div>

    <div id="card-claim-info" class="flex-1 grid">
      <label id="card-title">
        <slot name="center"></slot>
      </label>

      <div id="card-avatar-label">
        <LGAvatarLabel
          :showAvatar="showAvatar"
          :avatar="avatar"
          :timestamp="timestamp"
        >
        </LGAvatarLabel>
      </div>
    </div>

    <div id="search-result-rear" class="self-end">
      <slot name="rear"></slot>
    </div>
  </div>
</template>

<style lang="scss">
#search-result-rear {
  align-content: center;
}
#card-claim-info {
  width: 300px;
  text-align: start;
  align-self: flex-start;
  #card-title {
    font-size: 14px;
    font-weight: 600;
  }
  #channel-title {
    font-size: 12px;
    font-weight: 700;
  }
}
#card-claim-info .flex-x-start {
  .avatar {
    width: 2.1rem;
    height: 2.1rem;
    cursor: pointer;
  }
  #channel-title {
    cursor: pointer;
  }
}
#card-title {
  cursor: pointer;
  /* Standard way to clamp */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-left: 0px;
  padding-right: 16px;
  padding-top: 12px;
  @apply text-sm font-semibold;
}
#card-thumbnail {
  width: 100%;
  height: 100%;
  aspect-ratio: 16/9;
}
/* md screen */
@media (max-width: 960px) {
  #search-result-rear {
    display: none;
  }
}
@media (max-width: 960px) {
  #content > .grid {
    display: unset;
  }
  #content > div > .grid {
    display: unset;
  }
  #content {
    margin-right: 1rem;
    margin-left: 1rem;
  }
  #card-claim-info {
    width: auto;
  }
  #card-title {
    -webkit-line-clamp: 2;
  }
  #card-avatar-label {
    #base-label {
      @apply line-clamp-1;
    }
  }
}
</style>
