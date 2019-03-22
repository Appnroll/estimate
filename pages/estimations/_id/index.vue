<template>
  <el-col>
    <app-estimation-builder></app-estimation-builder>
  </el-col>
</template>

<script>
  // import AppProjectTable from '~/components/project/appProjectTable'

  import AppEstimationBuilder from '~/components/forms/estimations/builder/appEstimationBuilder'
  export default {
    name: 'EstimationsId',
    components: {
      AppEstimationBuilder
      // AppProjectTable
    },
    data () {
      return {
        project: {},

      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>

</style>
