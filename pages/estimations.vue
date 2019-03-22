<template>
  <el-col>
    <app-projects-list @edit="setProject"/>
    <app-projects-create :project="selectedProject" @close="selectedProject = null"/>
  </el-col>
</template>

<script>
  import AppProjectsList from '~/components/forms/projects/appProjectsList'
  import AppProjectsCreate from '~/components/forms/projects/appProjectsCreate'

  export default {
    name: 'Projects',
    components: { AppProjectsCreate, AppProjectsList },
    data: () => ({
      selectedProject: null
    }),
    methods: {
      setProject (project) {
        this.selectedProject = project
      }
    }
  }
</script>
