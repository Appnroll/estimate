<template>
  <div>
    <projects-list></projects-list>
    <create-project></create-project>
  </div>
</template>

<script>
  import ProjectsList from '~/components/projectsList'
  import CreateProject from '~/components/createProject'
  // import refs from '~/services/firebase'

  export default {
    name: 'Projects',
    components: { CreateProject, ProjectsList },
    created () {
      // this.$store.dispatch('setProjectsRef', refs.projectsRef)
      // this.source = api.projectsRef
      // this.$store.dispatch('setProjectsRef', this.source)
    }
  }
</script>
