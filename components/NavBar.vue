<template>
  <nav id="navbar" class="navbar fixed justify-between shadow z-50 bg-neutral">
    <div class="navbar-start">
      <label for="my-drawer" class="mr-6" id="sidebar-menu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <div id="lbry-logo" class="mr-4 h-6" @click="navigateTo('home')">
        <img
          class="h-full w-full"
          alt="Lbry logo"
          src="~/assets/imgs/lbrygen_logo.png"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
#lbry-logo {
  cursor: pointer;
  width: 40px;
  height: 40px;
}

#sidebar-menu {
  cursor: pointer;
}
</style>
