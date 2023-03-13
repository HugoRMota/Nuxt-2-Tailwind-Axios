<template>
  <div>
    <div class="text-center mb-4">
      <h4>really want to delete item?</h4>
    </div>
    <div class="d-flex justify-content-end">
      <b-button @click="deleteItem()" type="submit" variant="primary"
        >Delete</b-button
      >
      <b-button class="ml-3" @click="$bvModal.hide('info-modal')"
        >Close</b-button
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    deleteItem() {
      this.$emit('save')
    },
  },
}
</script>
