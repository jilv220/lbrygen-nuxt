<script setup lang="ts">
let searchContent = ref("");
let router = useRouter();

function navigateToSearchPage() {
  router.replace({ path: "/$/search", query: { q: searchContent.value } });
}

function resetSearchContent() {
  searchContent.value = "";
}
</script>

<template>
  <div class="relative flex items-center mr-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 absolute ml-3 pointer-events-none"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>

    <input
      tabindex="0"
      id="input-bar"
      class="input w-full pl-8 focus:outline-green"
      type="text"
      v-model="searchContent"
      placeholder="Search some contents..."
      autocomplete="off"
      @keyup.enter="
        navigateToSearchPage();
        ($event.target as HTMLElement).blur();
        resetSearchContent();
      "
    />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 absolute right-3 lg:hidden"
      viewBox="0 0 20 20"
      fill="currentColor"
      @click="resetSearchContent()"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</template>

<style lang="scss">
.input {
  height: 2.5rem !important;
  min-height: auto !important;
}
#input-bar {
  @apply bg-secondary;
  @apply input-bordered;
  @apply border-black;
  @apply rounded-2xl;
}
</style>
