<template>
  <tr v-if="formData">
    <td>
      <input v-model="formData.name" class="uk-input" type="text" placeholder="Name your user story or feature name">
    </td>
    <td class="uk-table-shrink uk-text-nowrap">
      <input v-model="formData.be" class="uk-input" type="text" placeholder="hours">
    </td>
    <td class="uk-table-shrink uk-text-nowrap">
      <input v-model="formData.fe" class="uk-input" type="text" placeholder="hours">
    </td>
    <td class="uk-text-nowrap">
      <button @click="addNewTask" class="uk-button uk-button-primary c-icon">
        <span uk-icon="icon: plus"></span>
      </button>
    </td>
  </tr>
</template>

<script>
  export default {
    name: '',
    task: {
      index: {
        type: Object,
        default: () => {}
      }
    },
    data: () => ({
      formData: {
        name: '',
        fe: '',
        be: '',
        id: Date.now()
      }
    }),
    methods: {
      addNewTask () {
        this.$emit('add-task', this.formData)
        Object.assign(this.$data, this.$options.data())
      }
    }
  }
</script>
