<script setup>
import EditIcon from './icons/EditIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import ModalWindow from './ModalWindow.vue'
import EditWishForm from './EditWishForm.vue'

defineProps({
  wish: Object,
})

const store = useWishlistStore()

function editItem(id) {
  store.setCurrentWishlistItemId(id)
  store.openModal('edit-item')
}
</script>

<template>
  <div class="wish masonry-item">
    <div class="overlay" v-if="wish.completed"></div>
    <div v-if="wish.image || wish.imageFile" class="image-wrap">
      <img :src="wish.image || wish.imageFile" :alt="wish.title" />
    </div>
    <div class="wish-title">
      <h3>{{ wish.title }}</h3>
      <a v-if="wish.link" :href="wish.link" class="wish-link" target="_blank"><LinkIcon /></a>
    </div>
    <p v-if="wish.description">{{ wish.description }}</p>
    <div class="wish-edit" @click="editItem(wish.id)">
      <EditIcon />
    </div>
    <div class="wish-check">
      <input @click="store.toggleStatus(wish.id)" type="checkbox" :checked="wish.completed" />
      <label>{{ wish.completed ? 'Done  🎉' : 'Waiting' }}</label>
    </div>
  </div>
  <Teleport to="body">
    <ModalWindow v-if="store.activeModal === 'edit-item'">
      <EditWishForm />
    </ModalWindow>
  </Teleport>
</template>

<style scoped>
.wish {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: var(--white-color);
  color: var(--black-color);
  padding: 40px 10px 10px 10px;
  border-radius: 12px;
  position: relative;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }

  .image-wrap {
    max-height: 50vh;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
  }

  .wish-title {
    display: flex;
    gap: 12px;
  }

  .wish-link {
    color: inherit;
  }

  .wish-edit {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 2;
    cursor: pointer;
  }

  .wish-check {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;

    label {
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      margin-left: 5px;
      cursor: pointer;
    }

    input {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border-radius: 100%;
      border: 0.77px solid #aeaeb2;
      appearance: none;
      cursor: pointer;

      &:checked {
        background-color: var(--primary-color);
        border-color: var(--primary-color);

        &::before {
          content: '✔';
          color: var(--white-color);
          font-size: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
