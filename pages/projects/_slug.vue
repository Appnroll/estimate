<template>
  <div>
    <div class="uk-container uk-margin-large-top">
      <app-project-table></app-project-table>
    </div>
  </div>
</template>

<script>
  import AppProjectTable from '~/components/project/appProjectTable'

  export default {
    name: 'Project',
    components: {
      AppProjectTable
    }
  }
</script>

<style lang="scss" scoped>
</style>
