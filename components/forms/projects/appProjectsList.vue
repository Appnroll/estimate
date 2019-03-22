<template>
  <el-table
    :data="filteredProjects"
    stripe
    style="width: 100%">
    <el-table-column type="selection"/>
    <el-table-column
      label="Name"
      prop="name"
      width="200">
      <template slot-scope="scope">
        <nuxt-link :to="{name: 'estimations-id', params: { id: scope.row.id }}">{{ scope.row.name }}</nuxt-link>
      </template>
    </el-table-column>
    <el-table-column
      label="Description"
      prop="shortDescription">
      <template slot-scope="scope">
        <p class="ellipsis">{{ scope.row.shortDescription }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Team"
      prop="team"
      width="135">
      <template slot-scope="scope">
        <app-members-avatar-list :members="scope.row.team"/>
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      prop="name"
      width="100">
      <template slot-scope="scope">
        <app-project-status :status="scope.row.status"/>
      </template>
    </el-table-column>
    <el-table-column
      align="right"
      width="250">
      <template slot="header" slot-scope="scope">
        <el-row align="middle" class="search-box" tag="span" type="flex">
          <el-input
            placeholder="Search..."
            size="mini"
            v-model="search"/>
          <el-popover
            content="You can search project by its name and assigned members (name or Slack nick)"
            placement="top-start"
            title="Search options"
            trigger="hover"
            width="250">
            <i class="icon md-18 no-space" slot="reference">help_outline</i>
          </el-popover>
        </el-row>
      </template>
      <template slot-scope="scope">
        <el-button
          @click="handleEdit(scope.$index, scope.row)"
          size="mini">Edit
        </el-button>
        <el-button
          @click="handleDelete(scope.$index, scope.row)"
          size="mini"
          type="danger">Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import AppProjectStatus from '~/components/custom-elements/appProjectStatus'
  import AppMembersAvatarList from '~/components/custom-elements/appMembersAvatarList'

  export default {
    name: 'appProjectsList',
    components: { AppMembersAvatarList, AppProjectStatus },
    data () {
      return {
        search: ''
      }
    },
    created () {
      this.setProjectsRef(this.fbRefs.projectsRef)
    },
    computed: {
      ...mapGetters({
        projects: 'projects/get'
      }),
      filteredProjects () {
        const search = this.search.toLowerCase()
        return this.projects.filter(project => {
          const isProjectName = project.name.toLowerCase().includes(search)
          const isMemberName = project.team.findIndex(member => {
            const isMemberNick = member.name.toLowerCase().includes(search)
            const isMemberRealName = member.profile.real_name.toLowerCase().includes(search)
            return isMemberNick || isMemberRealName
          })
          return !this.search || isProjectName || isMemberName > -1
        })
      }
    },
    methods: {
      ...mapActions({
        deleteProject: 'projects/delete',
        setProjectsRef: 'projects/setRef'
      }),
      async handleEdit (index, row) {
        this.$emit('edit', {
          id: row.id,
          ...row
        })
      },
      async handleDelete (index, row) {
        await this.deleteProject(row.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .search-box {
    .el-input {
      padding: 0;
      & + span {
        height: 18px;
        margin-left: 10px;
      }
    }
  }
</style>
