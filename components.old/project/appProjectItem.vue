<template>
  <tr v-if="task">
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
      <button @click="removeTask" class="uk-button uk-button-danger c-icon">
        <span uk-icon="icon: trash"></span>
      </button>
    </td>
  </tr>
</template>

<script>
  export default {
    name: '',
    props: {
      task: {
        index: {
          type: [Object],
          default: () => {}
        }
      },
    },
    data: () => ({
      formData: {
        name: '',
        be: '',
        fe: ''
      }
    }),
    created () {
      this.formData = this.task
    },
    methods: {
      removeTask () {
        this.$emit('remove-task', this.task)
      }
    }
  }
</script>
