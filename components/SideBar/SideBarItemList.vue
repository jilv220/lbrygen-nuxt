<script setup="props" lang="ts">
import { ISideBarItem } from "@/types/SideBarTypes";
import { upperFirst } from "lodash-es";

const props = defineProps({
  items: Array<ISideBarItem>,
});
</script>

<template>
  <div v-for="item in props.items" :key="item.label">
    <SideBarItem :link="item.link">
      <template v-slot:item-icon>
        <span v-html="item.icon"></span>
      </template>
      <template v-slot:item-label>
        {{ upperFirst(item.label) }}
      </template>
    </SideBarItem>
  </div>
</template>
