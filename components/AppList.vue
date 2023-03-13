<template>
  <div>
    <div class="d-flex align-items-center">
      <h4 class="mr-2">Name:</h4>
      {{ user.name }}
    </div>
    <div class="d-flex align-items-center">
      <h4 class="mr-2">Active:</h4>
      <b-badge pill :variant="user.active == 0 ? 'secondary' : 'primary'">{{
        user.active == 0 ? 'Disabled' : 'Active'
      }}</b-badge>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
