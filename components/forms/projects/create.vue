<template>
  <el-row align="middle" justify="end" type="flex">
    <el-button @click="showModal()" type="primary">
      <i class="icon md-24">add</i>New
    </el-button>
    <el-dialog :visible.sync="modal" title="Create new project">
      <el-form :model="formData" :rules="formRules">
        <el-form-item label="Project settings">
          <el-input autocomplete="off" placeholder="Project name" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :autosize="{ minRows: 2, maxRows: 8}" placeholder="Short project description" type="textarea" v-model="formData.shortDescription"></el-input>
          <!--<div>-->
          <!--<textarea v-model="formData.description"></textarea>-->
          <!--</div>-->
          <!--<vue-markdown :source="formData.description"></vue-markdown>-->
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-input autocomplete="off" min="0" placeholder="Management fee" step="5" type="number" v-model="formData.managementFee">
              <template slot="append">%</template>
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="Estimation types">
          <el-col :span="24">
            <el-select allow-create class="full-width" default-first-option filterable multiple placeholder="Choose needed types or create a new one" v-model="formData.estimationTypes">
              <el-option
                :key="item.value"
                :label="item.value"
                :value="item.value"
                v-for="item in estimationTypes">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="Team members">
          <el-col :span="24">
            <el-row :gutter="20" :key="member.id" align="middle" type="flex" v-for="(member, i) in formData.team">
              <el-col :span="10">
                <el-row align="middle" class="team-member" type="flex">
                  <img :alt="member.profile.real_name" :src="member.profile.image_72">
                  <span>{{ member.profile.real_name }}</span>
                </el-row>
              </el-col>
              <el-col class="flex-1" :span="10">
                <el-select class="full-width" multiple placeholder="Choose available estimation types" v-model="formData.team[i].estimationTypes">
                  <el-option
                    :key="type"
                    :label="type"
                    :value="type"
                    v-for="type in formData.estimationTypes">
                  </el-option>
                </el-select>
              </el-col>
              <el-col class="auto-width" :span="4">
                <el-button
                  @click="deleteTeamMember(i)"
                  type="danger">Delete
                </el-button>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="10">
                <el-select :filter-method="teamMembersFilter" @change="addTeamMember" class="full-width" filterable placeholder="Search and add a new member" v-model="teamMemberSearch" value-key="id">
                  <el-option
                    :key="user.id"
                    :label="user.profile.real_name"
                    :value="user"
                    v-for="user in filteredTeamMembers"
                    v-if="addedTeamMembersIds.indexOf(user.id) < 0">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>

            <!--<el-autocomplete :fetch-suggestions="querySearch" @select="addEstimationType" placeholder="Please Input" v-model="estimationTypeSearch"></el-autocomplete>-->
            <!--<el-select placeholder="Please select a zone" v-model="form.region">-->
            <!--<el-option label="Zone No.1" value="shanghai"></el-option>-->
            <!--<el-option label="Zone No.2" value="beijing"></el-option>-->
            <!--</el-select>-->
          </el-col>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="cancel()">Cancel</el-button>
        <el-button @click="confirm()" type="primary">Confirm</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'appProjectsCreate',
    components: {
      VueMarkdown
    },
    data () {
      return {
        modal: false,
        estimationTypes: [
          {
            value: 'Front-end'
          },
          {
            value: 'Back-end'
          },
          {
            value: 'Design'
          }
        ],
        estimationTypeSearch: '',
        teamMemberSearch: '',
        filteredTeamMembers: [],
        addedTeamMembersIds: [],
        formData: {
          name: '',
          shortDescription: '',
          managementFee: '',
          estimationTypes: [],
          team: []
        },
        formRules: {},
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '130px'
      }
    },
    mounted () {
    },
    computed: {
      ...mapGetters({
        users: 'users/get'
      })
    },
    methods: {
      ...mapActions({
        fetchUsers: 'users/fetch'
      }),
      async init () {
        if (!this.users.length) {
          await this.fetchUsers()
        }
        this.filteredTeamMembers = this.users
      },
      teamMembersFilter (query) {
        this.filteredTeamMembers = query.length ? this.users.filter(user => {
          return user.profile.real_name.includes(query) || user.name.includes(query) || user.profile.email.includes(query)
        }) : this.users
      },
      addEstimationType (item) {
        this.formData.estimationTypes.push(item)
        this.estimationTypeSearch = ''
      },
      addTeamMember () {
        this.formData.team.push({
          ...this.teamMemberSearch,
          estimationTypes: []
        })
        this.teamMemberSearch = ''
        this.filteredTeamMembers = this.users
      },
      deleteTeamMember (i) {
        this.formData.team.splice(i, 1)
      },
      showModal () {
        this.modal = true
        this.init()
      },
      hideModal () {
        this.modal = false
      },
      cancel () {
        this.hideModal()
      },
      confirm () {
        this.hideModal()
      }
    },
    watch: {
      'formData.team' () {
        this.addedTeamMembersIds = this.formData.team.map(user => user.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-row {
    padding: 10px 0;
  }

  .team-member {
    img {
      width: 36px;
      border-radius: 50%;
    }
    span {
      margin-left: 1em;
    }
  }
</style>
