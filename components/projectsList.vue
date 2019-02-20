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
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'projectsList',
    computed: {
      ...mapGetters({
        projects: 'projects/get'
      })
    },
    methods: {
      ...mapActions({
        setProjectsRef: 'projects/setRef'
      })
    },
    created () {
      this.setProjectsRef(this.fbRefs.projectsRef)
    }
  }
</script>

<style lang="scss" scoped>

</style>
