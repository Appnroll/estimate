<template>
  <el-col>
    <app-projects-list/>
    <app-projects-create/>
  </el-col>
</template>

<script>

  // import ProjectsList from '~/components/projectsList'
  // import CreateProject from '~/components/createProject'
  // import refs from '~/services/firebase'

  import AppProjectsList from '~/components/forms/projects/list'
  import AppProjectsCreate from '~/components/forms/projects/create'

  export default {
    name: 'Projects',
    components: { AppProjectsCreate, AppProjectsList },
    created () {
      // this.$store.dispatch('setProjectsRef', refs.projectsRef)
      // this.source = api.projectsRef
      // this.$store.dispatch('setProjectsRef', this.source)
    }
  }
</script>
