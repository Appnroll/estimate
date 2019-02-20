<template>
  <el-col :span="24">
    <app-projects-list/>
  </el-col>
</template>

<script>

  // import ProjectsList from '~/components/projectsList'
  // import CreateProject from '~/components/createProject'
  // import refs from '~/services/firebase'

  import AppProjectsList from '~/components/forms/projects/list'

  export default {
    name: 'Projects',
    components: { AppProjectsList },
    created () {
      // this.$store.dispatch('setProjectsRef', refs.projectsRef)
      // this.source = api.projectsRef
      // this.$store.dispatch('setProjectsRef', this.source)
    }
  }
</script>
