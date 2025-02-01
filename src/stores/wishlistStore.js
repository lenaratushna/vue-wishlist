import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { reactive, ref, computed } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = reactive(JSON.parse(localStorage.getItem('wishlist')) || [])
  const currentWishlistItemId = ref('')
  const filterBy = ref('')
  const activeModal = ref('')

  const currentWishlistItem = computed(() => wishlist.find(item => item.id === currentWishlistItemId.value))
  const filteredWishlist = computed(() => {
    if (filterBy.value === 'todo') {
      return wishlist.filter((wish) => !wish.completed)
    } else if (filterBy.value === 'done') {
      return wishlist.filter((wish) => wish.completed)
    }
    return wishlist
  })

  function setFilter(filter) {
    filterBy.value = filter
  }

  function addWishlistItem(newWish) {
    newWish.id = uuidv4()
    wishlist.push(newWish)
    closeModal()
  }

  function editWishlistItem(editItem) {
    const index = wishlist.findIndex(item => item.id === editItem.id)
    if (index !== -1) {
      wishlist[index] = editItem
    }
    closeModal()
  }

  function removeWishlistItem(id) {
    const updatedWishlist = wishlist.filter((item) => item.id !== id)
    wishlist.length = 0
    wishlist.push(...updatedWishlist)
    closeModal()
  }

  function setCurrentWishlistItemId(id) {
    currentWishlistItemId.value = id
  }

  function toggleStatus(id) {
    wishlist.forEach((item) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
    })
  }

  function openModal(modalType) {
    activeModal.value = modalType
  }

  function closeModal() {
    activeModal.value = ''
  }

  return {
    wishlist,
    currentWishlistItemId,
    currentWishlistItem,
    filterBy,
    activeModal,
    setFilter,
    filteredWishlist,
    addWishlistItem,
    editWishlistItem,
    removeWishlistItem,
    setCurrentWishlistItemId,
    toggleStatus,
    openModal,
    closeModal,
  }
})
