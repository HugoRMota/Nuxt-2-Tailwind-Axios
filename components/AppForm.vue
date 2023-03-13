<template>
  <b-form @submit.stop.prevent="save">
    <b-form-group id="Name" label="Name" label-for="name">
      <b-form-input
        id="input-1"
        name="Name"
        v-model="form.name"
        type="text"
        placeholder="Name"
        v-validate="{ required: true, min: 3 }"
        data-vv-as="Name"
        :state="validateState('Name')"
      ></b-form-input>
      <b-form-invalid-feedback id="input-2-live-feedback">{{
        $veeErrors.first('Name')
      }}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group label="Active" label-for="active">
      <b-form-checkbox
        id="active"
        name="active"
        v-model="form.active"
        value="1"
        unchecked-value="0"
      ></b-form-checkbox>
    </b-form-group>

    <div class="d-flex justify-content-end">
      <b-button type="submit" variant="primary">Save</b-button>
      <b-button class="ml-3" @click="$bvModal.hide('info-modal')"
        >Close</b-button
      >
    </div>
  </b-form>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      form: {},
    }
  },
  created() {
    this.form = this.user
  },
  methods: {
    validateState(ref) {
      if (
        this.$veeFields[ref] &&
        (this.$veeFields[ref].dirty || this.$veeFields[ref].validated)
      ) {
        return !this.$veeErrors.has(ref)
      }
      return null
    },
    async save(item) {
      const valid = await this.$validator.validate()
      if (valid) {
        this.$emit('save', this.form)
      }
    },
  },
}
</script>
