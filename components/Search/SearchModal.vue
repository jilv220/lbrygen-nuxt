<script setup>
function closeModal() {
  document.getElementsByClassName("modal-toggle")[0].checked = false;
}
</script>

<template>
  <BaseModal modalID="search-modal">
    <template v-slot:modal-btn-icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </template>
    <template v-slot:modal-content>
      <div id="search-bar-wrapper" @keyup.enter="closeModal()">
        <SearchBar></SearchBar>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss">
#search-modal-wrapper {
  .modal {
    align-items: flex-start;
    .modal-box {
      margin-top: 0.75rem;
    }
  }
}
#search-bar-wrapper {
  .mr-3 {
    @apply mr-0;
  }
}
</style>
