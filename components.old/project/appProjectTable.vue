<template lang="html">
  <table class="uk-table uk-table-justify uk-table-middle uk-table-divider">
    <thead>
      <tr>
        <th class="uk-table-expand">Task name</th>
        <th class="uk-table-shrink uk-text-nowrap shrinked">Backend</th>
        <th class="uk-table-shrink uk-text-nowrap shrinked">Frontend</th>
        <th class="uk-text-nowrap actions"></th>
      </tr>
    </thead>
    <tbody>
      <app-project-form @add-task="addTask($event)"></app-project-form>
      <app-project-item v-if="list.length" v-for="(task, index) of list" :key="index" :task="task" @remove-task="removeTask($event)" ></app-project-item>
    </tbody>
  </table>
</template>

<script>
  import AppProjectItem from '~/components/project/appProjectItem'
  import AppProjectForm from '~/components/project/appProjectForm'

  export default {
    name: '',
    data: () => ({
      list: []
    }),
    components: {
      AppProjectItem,
      AppProjectForm
    },
    methods: {
      addTask (task) {
        this.list.push(task)
      },
      removeTask (task) {
        let list = this.list
        this.list = []
        this.$nextTick(() => {
          this.list = list.filter(_task => task.id !== _task.id)
        })
      }
    }
  }
</script>

<style lang="scss">
  table, tr {
    .shrinked {
      width: 100px;
    }
    .right {
      text-align: right;
    }
    .actions {
      width: 44px;
    }
  }
</style>
