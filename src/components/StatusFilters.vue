<script setup>
import { useWishlistStore } from '@/stores/wishlistStore'
import CloseIcon from './icons/CloseIcon.vue'

const store = useWishlistStore()
</script>

<template>
  <div class="filters">
    <div>
      <p>Filter by status</p>
      <div class="badges">
        <div
          class="badge"
          @click="store.setFilter('todo')"
          :class="{ selected: store.filterBy === 'todo' }"
        >
          ⏳ Waiting
        </div>
        <div
          class="badge"
          @click="store.setFilter('done')"
          :class="{ selected: store.filterBy === 'done' }"
        >
          🎉 Done
        </div>
        <span v-show="store.filterBy" @click="store.setFilter('')" class="clear">
          <CloseIcon /> clear
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  margin: 18px 0;

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 8px;
    align-items: center;

    .badge {
      padding: 8px 7px;
      background-color: var(--gray-color);
      color: var(--black-color);
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      border-radius: 8px;
      cursor: pointer;

      &.selected {
        background-color: var(--secondary-color);
        color: var(--white-color);
      }
    }
  }

  .clear {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    cursor: pointer;
  }
}
</style>
