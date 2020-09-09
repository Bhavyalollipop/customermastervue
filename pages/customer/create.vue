<template>
  <div class="mt-3">
    <b-row>
      <b-col cols="6">
        <h4 class="control-label">
          Create Customer
        </h4>
      </b-col>
      <b-col cols="6" class="text-right">
        <router-link :to="{name:'customer'}">
          <i class="fa fa-close" />
        </router-link>
      </b-col>
    </b-row>
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
    <b-form v-if="show" class="mt-3" @submit.prevent="onSubmit">
      <b-row>
        <b-col cols="6">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_mail"
              type="email"
              required
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label="Customer Name:" label-for="input-2">
            <div class="flex">
              <b-form-input
                id="input-2"
                v-model="form.cus_fname"
                required
                placeholder="First name"
              />
              <b-form-input
                id="input-2"
                v-model="form.cus_lname"
                class="ml-2"
                placeholder="last name"
              />
            </div>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            id="input-group-1"
            label="Customer Website:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_website"
              type="text"
              placeholder="Enter website"
            />
          </b-form-group>
          <b-form-group
            id="input-group-1"
            label="Phone Nubmer:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.cus_ph_no"
              type="number"
              placeholder="Enter email"
            />
          </b-form-group>
        </b-col>
      </b-row>

      </b-form-group>
      <div class="text-link mb-2 mt-2 text-underline cursor-pointer" @click="modalShow = true">
        <u>Add Address
        </u>
      </div>
      <b-table-simple v-if="form.cus_addr.length > 0" class="mt-2" hover small responsive>
        <b-thead>
          <b-tr>
            <b-th>Address Line 1</b-th>
            <b-th>Address Line 2</b-th>
            <b-th>Customer Landmark</b-th>
            <b-th>Customer City</b-th>
            <b-th>Customer State</b-th>
            <b-th>Customer Country</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="(item, index) in form.cus_addr" :key="index">
            <b-td>  {{ item.cus_addr_line_1 }}</b-td>
            <b-td>  {{ item.cus_addr_line_2 }}</b-td>
            <b-td>  {{ item.cus_landmark }}</b-td>
            <b-td>  {{ item.cus_city }}</b-td>
            <b-td>  {{ item.cus_state }}</b-td>
            <b-td>  {{ item.cus_country }}</b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <addressModal :modal-show="modalShow" @add="addAdress" @close="modalShow = false" />
      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </div>
</template>
<script>
import addressModal from '@/pages/customer/addressDialog'
export default {
  name: 'CustomerCreate',
  components: {
    addressModal
  },
  data () {
    return {
      saveDialogError: [],
      modalShow: false,
      form: {
        cus_mail: '',
        cus_fname: '',
        cus_lname: '',
        cus_website: '',
        cus_ph_no: '',
        cus_addr: []
      },
      show: true
    }
  },
  methods: {
    addAdress (data) {
      this.form.cus_addr.push(data)
      this.modalShow = false
    },
    onSubmit () {
      this.$store.dispatch('customer/create', this.form).then((res) => {
        if (res.type === 'success') {
          this.$notification.success({ message: res.message })
          this.$router.push({
            name: 'customer'
          })
        }
      })
    }
  }
}
</script>
