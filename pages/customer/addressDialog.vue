<template>
  <b-modal
    v-model="modalShow"
    size="lg"
    title="Add New Address"
    @shown="freshObject"
    @ok.prevent="onSubmit"
    @cancel.prevent="() => $emit('close')"
    @close.prevent="() => $emit('close')"
  >
    <b-alert variant="danger" :show="saveDialogError.length > 0">
      <button type="button" aria-label="Close" class="close" @click="saveDialogError = []">
        ×
      </button>
      <ul class="p-0 pl-1">
        <li v-for="item in saveDialogError" :key="item.index">
          {{ item }}
        </li>
      </ul>
    </b-alert>
    <b-form class="mt-3">
      <b-row>
        <b-col cols="6">
          <b-form-group
            id="input-group-1"
            label="Customer Address:"
            label-for="input-1"
          >
            <div class="flex">
              <b-form-input
                id="input-1"
                v-model="form.cus_addr_line_1"
                type="text"
                required
                placeholder="Address Line 1"
              />
              <b-form-input
                id="input-1"
                v-model="form.cus_addr_line_2"
                class="ml-2"
                type="text"
                required
                placeholder="Address Line 1"
              />
            </div>
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Customer Landmark:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_landmark"
              type="text"
              required
              placeholder="Customer Landmark"
            />
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Customer City:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_city"
              type="text"
              required
              placeholder="Customer City"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            id="input-group-1"
            label="Customer State:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_state"
              type="text"
              required
              placeholder="Customer State"
            />
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Customer Country:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_country"
              type="text"
              required
              placeholder="Customer Country"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>
<script>
export default {
  props: {
    modalShow: { type: Boolean, default: false },
    addressedit: { type: Object, default: () => {} },
    update: { type: Boolean, default: false }
  },
  data () {
    return {
      saveDialogError: [],
      form: {
        cus_addr_line_1: '',
        cus_addr_line_2: '',
        cus_landmark: '',
        cus_city: '',
        cus_state: '',
        cus_country: ''
      }
    }
  },
  methods: {
    freshObject () {
      if (this.update) {
        this.form = JSON.parse(JSON.stringify(this.addressedit))
      } else {
        this.form = {
          cus_addr_line_1: '',
          cus_addr_line_2: '',
          cus_landmark: '',
          cus_city: '',
          cus_state: '',
          cus_country: ''
        }
      }
    },
    onSubmit () {
      const error = []
      this.saveDialogError = []
      if (!this.form.cus_state.trim()) {
        error.push('Please give a valid state')
      }
      if (!this.form.cus_country.trim()) {
        error.push('Please give a valid country')
      }
      if (error.length > 0) {
        this.saveDialogError = error
        return false
      }
      this.$emit('add', this.form)
    }
  }
}
</script>
