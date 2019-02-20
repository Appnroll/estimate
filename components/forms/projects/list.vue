<template>
  <el-table
    :data="filteredProjects"
    style="width: 100%">
    <el-table-column type="selection"/>
    <el-table-column
      label="Name"
      prop="name">
    </el-table-column>
    <el-table-column
      label="Team"
      prop="team">
      <template slot-scope="scope">
        <p v-for="member in scope.row.team">{{ member.name }}</p>
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
        setProjectsRef: 'projects/setRef'
      }),
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
