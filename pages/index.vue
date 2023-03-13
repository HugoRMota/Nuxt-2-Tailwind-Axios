<template>
  <b-container fluid="md">
    <div class="mt-4 mb-4">
      <b-button @click="info({}, 'create')">Create</b-button>

      <b-table
        striped
        hover
        :items="entities"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      >
        <template #cell(active)="{ item }">
          <b-badge pill :variant="item.active == 0 ? 'secondary' : 'primary'">{{
            item.active == 0 ? 'Disabled' : 'Active'
          }}</b-badge>
        </template>
        <template #cell(actions)="{ item }">
          <b-button-group>
            <b-button size="sm" @click="info(item, 'list')" class="mr-1">
              <b-icon-eye></b-icon-eye>
            </b-button>
            <b-button size="sm" @click="info(item, 'edit')" class="mr-1">
              <b-icon-pen></b-icon-pen>
            </b-button>
            <b-button size="sm" @click="info(item, 'delete')" class="mr-1">
              <b-icon-trash></b-icon-trash>
            </b-button>
          </b-button-group>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="count"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>
    </div>
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @close="resetInfoModal"
      hide-footer
    >
      <app-list v-if="type == 'list'" :user="selectedEntitie"></app-list>
      <app-form
        v-else-if="type == 'create' || type == 'edit'"
        :user="selectedEntitie"
        @save="save"
      ></app-form>
      <app-delete v-else @save="save"></app-delete>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'IndexPage',

  auth: true,

  data() {
    return {
      fields: ['id', 'name', 'active', 'order', 'actions'],
      endpoint: 'api/admin/house_rules',
      entities: [],
      selectedEntitie: {},
      perPage: 3,
      currentPage: 1,
      count: 0,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      type: 'list',
    }
  },
  mounted() {
    this.getAdmin()
  },
  methods: {
    async getAdmin() {
      try {
        const { data } = await this.$axios.$get(this.endpoint)
        this.entities = data.entities
        this.currentPage = data.pagination.current_page
        this.perPage = data.pagination.per_page
        this.count = data.pagination.count
      } catch (error) {
        console.error(error)
      }
    },

    save(form) {
      switch (this.type) {
        case 'create':
          this.create(form)
          break

        case 'edit':
          this.edit(form, this.selectedEntitie.id)
          break

        case 'delete':
          this.delete(this.selectedEntitie.id)
          break

        default:
          break
      }
    },

    info(item, type) {
      this.type = type
      this.selectedEntitie = item
      this.infoModal.title = `${type.toUpperCase()}:  ${item?.name || ''}`
      this.$root.$emit('bv::show::modal', this.infoModal.id)
    },

    async create(form) {
      const body = {
        house_rules: {
          name: form.name,
          active: form.active,
        },
      }
      try {
        const { data, message } = await this.$axios.$post(this.endpoint, body)

        this.entities.push(data)
        this.$toast.success(message, { timeout: 5000 })
      } catch ({ response }) {
        console.error(response)
        this.$toast.error(response.data.data, { timeout: 5000 })
      }
    },

    async edit(form, id) {
      const body = {
        house_rules: {
          name: form.name,
          active: form.active,
        },
      }

      try {
        const { data, message } = await this.$axios.$put(
          `${this.endpoint}/${id}`,
          body
        )
        const index = this.entities.findIndex((item) => item.id === id)

        if (index !== -1) {
          this.entities[index] = data.entities
        }
        this.$toast.success(message, { timeout: 5000 })
      } catch ({ response }) {
        console.error(response)
        this.$toast.error(response.data.data, { timeout: 5000 })
      }
    },

    async delete(id) {
      try {
        const { message } = await this.$axios.$delete(`${this.endpoint}/${id}`)

        const index = this.entities.findIndex((item) => {
          return item.id === id
        })

        this.entities.splice(index, 1)
        this.$toast.success(message, { timeout: 2000 })
      } catch ({ response }) {
        console.error(response)
        this.$toast.error(response.data.data, { timeout: 2000 })
      }
    },

    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
      this.selectedEntitie = {}
    },
  },
}
</script>
