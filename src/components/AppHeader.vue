<script setup>
import { useWishlistStore } from '@/stores/wishlistStore'
import PlusIcon from './icons/PlusIcon.vue'

const store = useWishlistStore()
</script>

<template>
  <div class="header">
    <div class="container">
      <div class="header-wrap">
        <h1>My wishlist</h1>
        <button @click="store.openModal('add-item')" class="btn secondary"><PlusIcon /> Add a wish</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 20px 0 20px 0;
  background-color: var(--primary-color);
  color: var(--white-color);

  .header-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }
  }
}
</style>
