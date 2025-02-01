<script setup>
import { ref, reactive } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'

const store = useWishlistStore()

const isValidForm = ref(true)

const newWish = reactive({
  completed: false,
})

function addWish() {
  if (newWish.title && newWish.title.trim()) {
    store.addWishlistItem(newWish)
  } else {
    isValidForm.value = false
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      newWish.imageFile = reader.result
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <form class="add-wish" @submit.prevent="addWish">
    <h3>Add a new wish</h3>
    <div>
      <input
        v-model="newWish.title"
        type="text"
        name="title"
        placeholder="I wish..."
        :class="{ error: !isValidForm }"
      />
      <span v-if="!isValidForm" class="error-msg">This field is required</span>
    </div>
    <div class="upload-image">
      <input v-model="newWish.image" type="url" name="image" placeholder="Enter an image url..." />
      <span>or</span>
      <label>
        <span>Upload file</span>
        <input class="hidden" type="file" @change="handleFileUpload" accept="image/*" />
      </label>
    </div>
    <span v-if="newWish.imageFile">File uploaded successfully</span>
    <textarea
      v-model="newWish.description"
      name="description"
      rows="4"
      placeholder="Enter a description..."
    />
    <input
      v-model="newWish.link"
      type="url"
      name="link"
      placeholder="Enter a link where it can be bought..."
    />
    <button type="submit" class="btn secondary">Save</button>
  </form>
</template>

<style lang="scss" scoped>
.add-wish {
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

  button {
    width: 100%;
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

  .error-msg {
    color: var(--red-color);
    font-size: 12px;
  }
}
</style>
