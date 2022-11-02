<script setup>
import "@/assets/styles/util.css";
import "plyr/dist/plyr.css";

onBeforeMount(() => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.documentElement.setAttribute("data-theme", "mydark");
    window.localStorage.setItem("theme", "dark");
  } else if (window.localStorage.getItem("theme") == "light") {
    document.documentElement.setAttribute("data-theme", "mylight");
    window.localStorage.setItem("theme", "light");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.documentElement.setAttribute("data-theme", "mydark");
  }
});
</script>

<template>
  <NuxtLayout>
    <NavBar />
    <div class="drawer h-full">
      <input id="my-drawer" class="drawer-toggle" type="checkbox" />

      <!-- Drawer Content -->
      <div class="drawer-content overflow-hidden">
        <NuxtPage />
      </div>

      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay"></label>
        <nav id="drawer-sidebar" class="bg-neutral relative">
          <SideBar></SideBar>
        </nav>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --plyr-color-main: #2f9176;
  @apply text-primary;
}

#drawer-sidebar {
  @apply menu block text-base-content w-72 h-screen pt-4-25 px-2 pb-2 sm:w-56;

  div > li > div {
    @apply active:bg-green h-11;
  }
}
</style>
