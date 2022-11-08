<script setup lang="ts">
import { getContent, resolveClaimSingle } from "@/apis/api";
import channelTabs from "@/constants/channelTabs";

const router = useRouter();
let channelName = router.currentRoute.value.params?.channel as string;
let channelView = router.currentRoute.value.query?.view;

// Default view to content
if (channelView === undefined) {
  router.push({
    path: router.currentRoute.value.path,
    query: { view: "content" },
  });
  channelView = "content";
}

// console.log(channelName);
// console.log(channelView);

let items = ref();
let channelDetail;
let viewSelected = ref("content");
viewSelected.value = channelView as string;

console.log(viewSelected.value);

let pageNum = 2;

onBeforeMount(async () => {
  try {
    let sourceData = await getContent("channel", "video", channelName, 1);
    let channelData = await resolveClaimSingle(channelName);
    items.value = sourceData?.result?.items;
    channelDetail = channelData.result?.[channelName];
  } catch (err) {
    console.log(err);
  }

  setBGImg();
});

async function infiniteHandler() {
  const sourceData = await getContent("channel", "video", channelName, pageNum);
  const moreItems = sourceData?.result?.items;
  items?.value?.push(...moreItems);
  pageNum += 1;
}

function setBGImg() {
  let ele = document.querySelector("main > div > header") as HTMLElement;

  if (channelDetail.value?.cover?.url === undefined) {
    ele.style.backgroundImage =
      "linear-gradient(to right, #637ad2, #318794 80%)";
  } else {
    ele.style.backgroundImage = `url(${channelDetail.value?.cover?.url})`;
  }

  ele.style.height = "284px";
  ele.style.backgroundPosition = "center";
  ele.style.backgroundSize = "cover";
  ele.style.backgroundRepeat = "no-repeat";
}
</script>

<template>
  <main>
    <div id="content">
      <header class="card"></header>
      <div class="tabs">
        <div v-for="tab in channelTabs" :key="tab">
          <div
            :class="{
              'tab-active': tab.toLocaleLowerCase() == viewSelected,
              'tab-bordered': tab.toLocaleLowerCase() == viewSelected,
            }"
            class="tab"
          >
            {{ tab }}
          </div>
        </div>
      </div>
      <ContentFragment :items="items"></ContentFragment>
    </div>
    <InfiniteScroll :infinite="infiniteHandler"></InfiniteScroll>
  </main>
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
