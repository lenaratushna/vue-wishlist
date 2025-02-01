<script setup>
import { ref } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'

const store = useWishlistStore()

let editedWish = { ...store.currentWishlistItem }

const isValidForm = ref(true)

function editWish() {
  if (editedWish.title && editedWish.title.trim()) {
    store.editWishlistItem(editedWish)
  } else {
    isValidForm.value = false
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      editedWish.imageFile = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <form class="edit-wish" @submit.prevent="editWish">
    <h3>Edit wish</h3>
    <div>
      <input
        v-model="editedWish.title"
        type="text"
        name="title"
        placeholder="I wish..."
        :class="{ error: !isValidForm }"
      />
      <span v-if="!isValidForm" class="error-msg">This field is required</span>
    </div>
    <div class="upload-image">
      <input
        v-model="editedWish.image"
        type="url"
        name="image"
        placeholder="Enter an image url..."
      />
      <span>or</span>
      <label>
        <span>Upload file</span>
        <input class="hidden" type="file" @change="handleFileUpload" accept="image/*" />
      </label>
    </div>
    <textarea
      v-model="editedWish.description"
      name="description"
      rows="4"
      placeholder="Enter a description..."
    />
    <input
      v-model="editedWish.link"
      type="url"
      name="link"
      placeholder="Enter a link where it can be bought..."
    />
    <div class="buttons">
      <button
        @click="store.removeWishlistItem(store.currentWishlistItemId)"
        type="button"
        class="btn danger"
      >
        Delete
      </button>
      <button type="submit" class="btn secondary">Save changes</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.edit-wish {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  input,
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid var(--gray-color);
    border-radius: 8px;

    &.error {
      border: 1px solid var(--red-color);
    }
  }

  .upload-image {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    input {
      flex: 65;
    }

    span {
      flex: 5;
    }

    label {
      flex: 30;
      background-color: var(--primary-color);
      color: var(--white-color);
      border-radius: 8px;
      padding: 5px;
      text-align: center;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    gap: 12px;
  }

  .error-msg {
    color: var(--red-color);
    font-size: 12px;
  }
}
</style>
