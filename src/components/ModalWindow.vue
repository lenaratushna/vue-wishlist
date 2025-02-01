<script setup>
import { useWishlistStore } from '@/stores/wishlistStore'
import CloseIcon from './icons/CloseIcon.vue'

const store = useWishlistStore()
</script>

<template>
  <div class="modal-wrapper" aria-modal="true" role="dialog" tabindex="-1">
    <div class="inner">
      <button @click="store.closeModal" class="close-btn">
        <CloseIcon />
      </button>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  display: grid;
  place-items: center;
  color: #000;

  .inner {
    background-color: var(--white-color);
    padding: 30px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 600px;
    width: 90%;

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      background-color: var(--white-color);
    }
  }
}
</style>
