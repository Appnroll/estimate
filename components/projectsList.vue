<template>
  <div class="uk-overflow-auto">
    <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
      <thead>
      <tr>
        <th class="uk-table-shrink"><input class="uk-checkbox" type="checkbox"></th>
        <th class="uk-table-shrink uk-text-nowrap">Project name</th>
        <th class="uk-table-expand">Members</th>
        <th class="uk-width-small uk-text-nowrap">Total estimation</th>
        <th class="uk-table-shrink uk-text-nowrap">Estimation status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(project, index) in projects">
        <td><input class="uk-checkbox" type="checkbox"></td>
        <td>
          <nuxt-link :to="{ name: 'projects-slug', params: { slug: project.id } }" class="uk-table-link">{{ project.name }}</nuxt-link>
        </td>
        <td>
          <span v-for="(member, i) in project.team"><span v-if="i > 0">,</span> {{ member.name }}</span>
        </td>
        <td class="uk-text-truncate">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</td>
        <td class="uk-text-nowrap">Lorem ipsum dolor</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import refs from '~/services/firebase'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'projectsList',
    data: () => ({
      dataSources: {
        projects: null
      }
    }),
    computed: {
      ...mapGetters([
        'projects'
      ])
    },
    methods: {
      ...mapActions([
        'setProjectsRef'
      ])
    },
    created () {
      this.dataSources.projects = refs.projectsRef
      // this.setProjectsRef(refs.projectsRef)
      this.$store.dispatch('setProjectsRef', this.dataSources.projects)
    }
  }
</script>

<style lang="scss" scoped>

</style>
