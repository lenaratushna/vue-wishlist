<script setup>
import AppHeader from './components/AppHeader.vue'
import StatusFilters from './components/StatusFilters.vue'
import WishlistItem from './components/WishlistItem.vue'
import ModalWindow from './components/ModalWindow.vue'
import AddWishForm from './components/AddWishForm.vue'
import { useWishlistStore } from './stores/wishlistStore'

const store = useWishlistStore()

store.$subscribe((_, state) => {
  localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
})
</script>

<template>
  <AppHeader />
  <div class="container">
    <StatusFilters />
    <div class="wishlist masonry-layout">
      <WishlistItem v-for="wish in store.filteredWishlist" :key="wish.id" :wish="wish" />
    </div>
    <Teleport to="body">
      <ModalWindow v-if="store.activeModal === 'add-item'">
        <AddWishForm />
      </ModalWindow>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.wishlist {
  padding-bottom: 1rem;
}
</style>
