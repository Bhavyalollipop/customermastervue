<template>
  <div class="mt-3">
    <b-row>
      <b-col cols="6">
        <h4 class="control-label">
          Customer
        </h4>
      </b-col>
      <b-col cols="6" class="text-right">
        <router-link :to="{name:'customer-create'}">
          <b-button variant="primary" class="btn-sm">
            Create Customer
          </b-button>
        </router-link>
      </b-col>
    </b-row>
    <b-table-simple class="mt-2" hover small responsive>
      <b-thead>
        <b-tr>
          <b-th>Customer Name</b-th>
          <b-th>Customer Mail</b-th>
          <b-th>Phone No</b-th>
          <b-th>Website</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(item, index) in list" :key="index">
          <b-td><span class="cursor-pointer" @click="$router.push(`/customer/${item.cus_id}`)"> <u> {{ item.cus_name }} </u></span></b-td>
          <b-td>  {{ item.cus_mail }}</b-td>
          <b-td>  {{ item.cus_ph_no }}</b-td>
          <b-td>  {{ item.cus_website }}</b-td>
        </b-tr>
      </b-tbody>
      <b-pagination
        v-model="page"
        :total-rows="total"
        :per-page="count"
        align="fill"
        size="sm"
        class="my-0 mt-2"
      />
    </b-table-simple>
  </div>
</template>
<script>
export default {
  name: 'Customer',
  data () {
    return {
      page: 1,
      total: 0,
      count: 10,
      list: ['test']
    }
  },
  watch: {
    page () {
      this.getCustomer()
    }
  },
  mounted () {
    this.getCustomer()
  },
  methods: {
    getCustomer () {
      this.$store.dispatch('customer/getList', { page: this.page, count: this.count }).then((res) => {
        this.list = res.list
        this.total = parseInt(res.total)
      })
    }
  }
}
</script>
