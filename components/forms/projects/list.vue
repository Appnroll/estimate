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
    </el-table-column>
    <el-table-column
      label="Description"
      prop="shortDescription"
      width="400">
      <template slot-scope="scope">
        <p class="ellipsis">{{ scope.row.shortDescription }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="Team"
      prop="team">
      <template slot-scope="scope">
        <el-row class="team-avatars" type="flex">
          <img :alt="member.profile.real_name" :key="member.id" :src="member.profile.image_72" v-for="(member, memberIndex) in scope.row.team" v-if="memberIndex < 5">
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          placeholder="Type to search"
          size="mini"
          v-model="search"/>
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

  export default {
    name: 'appProjectsList',
    data () {
      return {
        tableData: [{
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-02',
          name: 'John',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-04',
          name: 'Morgan',
          address: 'No. 189, Grove St, Los Angeles'
        }, {
          date: '2016-05-01',
          name: 'Jessy',
          address: 'No. 189, Grove St, Los Angeles'
        }],
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
        return this.projects.filter(data => !this.search || data.name.toLowerCase().includes(this.search.toLowerCase()))
      }
    },
    methods: {
      ...mapActions({
        updateProject: 'projects/update',
        deleteProject: 'projects/delete',
        setProjectsRef: 'projects/setRef'
      }),
      async handleEdit (index, row) {
        await this.updateProject(row)
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

  .team-avatars {
    img {
      height: 36px;
      border-radius: 50%;
      box-shadow: 0 0 0 1.5px #ffffff;
      &:not(:first-of-type) {
        margin-left: -18px;
      }
    }
  }
</style>
