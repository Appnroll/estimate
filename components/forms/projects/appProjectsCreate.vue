<template>
  <el-col>
    <el-row align="middle" justify="end" type="flex">
      <el-button @click="showModal()" class="new-project-button" type="primary">
        <i class="icon md-24">add</i>New
      </el-button>
      <el-dialog :visible.sync="modal" @close="close" class="modal no-success-state" title="Create new project">
        <el-form :model="formData" :rules="formRules" @submit.native.prevent ref="form">
          <label class="el-form-item__label">Project settings</label>
          <el-form-item prop="name">
            <el-input autocomplete="off" placeholder="Project name" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item prop="shortDescription">
            <el-input :autosize="{ minRows: 2, maxRows: 8}" placeholder="Short project description" type="textarea" v-model="formData.shortDescription"></el-input>
            <!--<vue-markdown :source="formData.description"></vue-markdown>-->
          </el-form-item>
          <el-form-item prop="fee">
            <el-col :span="12">
              <el-input autocomplete="off" max="100" min="0" placeholder="Management fee" step="5" type="number" v-model.number="formData.fee">
                <template slot="append">%</template>
              </el-input>
            </el-col>
          </el-form-item>
          <label class="el-form-item__label">Estimation types</label>
          <el-form-item prop="estimationTypes">
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
          <label class="el-form-item__label">Team members</label>
          <el-col :span="24">
            <el-form-item v-if="!formData.team.length">
              <el-alert
                :closable="false"
                show-icon
                title="No members selected"
                type="warning">
              </el-alert>
            </el-form-item>
            <el-row :gutter="12" :key="member.id" align="top" type="flex" v-for="(member, i) in formData.team">
              <el-col :span="10">
                <app-single-member :member="member"/>
              </el-col>
              <el-col :span="10" class="flex-1" v-if="formData.team.length > 0">
                <el-form-item :prop="'team.' + i + '.estimationTypes'" :rules="formRules.teamEstimationTypes">
                  <el-select class="full-width" multiple placeholder="Choose available estimation types" v-model="formData.team[i].estimationTypes">
                    <el-option
                      :key="type"
                      :label="type"
                      :value="type"
                      v-for="type in formData.estimationTypes">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" class="auto-width">
                <el-button
                  @click="removeTeamMember(i)"
                  type="danger">Remove
                </el-button>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="teamMembers">
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
            </el-form-item>
          </el-col>
        </el-form>
        <span class="dialog-footer" slot="footer">
        <el-button @click="close()">Cancel</el-button>
        <el-button @click="update()" type="primary" v-if="project">Update</el-button>
        <el-button @click="confirm()" type="primary" v-else>Confirm</el-button>
      </span>
      </el-dialog>
    </el-row>
  </el-col>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import VueMarkdown from 'vue-markdown'
  import AppSingleMember from '~/components/custom-elements/appSingleMember'

  export default {
    name: 'appProjectsCreate',
    components: {
      AppSingleMember,
      VueMarkdown
    },
    props: {
      project: {
        default: null,
        type: Object
      }
    },
    data () {
      const memberEstimationTypesValidator = (rule, value, callback) => {
        const resolve = (path, obj = self, separator = '.') => {
          const properties = Array.isArray(path) ? path : path.split(separator)
          return properties.reduce((prev, curr) => prev && prev[curr], obj)
        }
        if (!resolve(rule.field, this.formData).length) {
          callback(new Error('Please select at least one estimation type'))
        }
        callback()
      }
      const estimationTypesValidator = (rule, value, callback) => {
        if (!this.formData.estimationTypes.length) {
          callback(new Error('Please select at least one estimation type'))
        }
        callback()
      }
      const teamMembersValidator = (rule, value, callback) => {
        if (!this.formData.team.length) {
          callback(new Error('Please choose at least one member'))
        }
        callback()
      }
      return {
        modal: false,
        isNewProject: false,
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
          status: '',
          shortDescription: '',
          fee: '',
          estimationTypes: [],
          team: []
        },
        formRules: {
          name: [
            { required: true, message: 'Project name cannot be empty', trigger: 'blur' }
          ],
          fee: [
            { required: true, message: 'Management fee cannot be empty' },
            { type: 'number', min: 0, message: 'Management fee cannot be negative' },
            { type: 'number', max: 100, message: 'Management fee is too high' }
          ],
          estimationTypes: [
            { validator: estimationTypesValidator, trigger: 'change' }
          ],
          teamMembers: [
            { validator: teamMembersValidator, trigger: 'change' }
          ],
          teamEstimationTypes: [
            { validator: memberEstimationTypesValidator, trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        users: 'users/get'
      })
    },
    methods: {
      ...mapActions({
        updateProject: 'projects/update',
        addProject: 'projects/add',
        fetchUsers: 'users/fetch'
      }),
      async init () {
        if (!this.users.length) {
          await this.fetchUsers()
        }
        this.filteredTeamMembers = this.users
      },
      teamMembersFilter (query) {
        const search = query.toLowerCase()
        this.filteredTeamMembers = query.length ? this.users.filter(user => {
          const isRealName = user.profile.real_name.toLowerCase().includes(search)
          const isName = user.name.toLowerCase().includes(search)
          const isEmail = user.profile.email.toLowerCase().includes(search)
          const isDisplayName = user.profile.display_name.toLowerCase().includes(search)
          return isRealName || isName || isEmail || isDisplayName
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
        this.filteredTeamMembers = this.users
        this.$nextTick(() => {
          this.teamMemberSearch = ''
        })
      },
      removeTeamMember (i) {
        this.formData.team.splice(i, 1)
      },
      showModal () {
        this.modal = true
        this.init()
        if (this.project) {
          this.formData = {
            ...this.project
          }
        }
      },
      hideModal () {
        this.$refs.form.resetFields()
        this.modal = false
      },
      close () {
        this.formData = {
          ...this.formData,
          team: []
        }
        this.hideModal()
        this.$emit('close')
      },
      confirm () {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.formData.status = 'created'
            await this.addProject(this.formData)
            this.close()
          } else {
            return false
          }
        })
      },
      async update () {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            await this.updateProject(this.formData)
            this.close()
          } else {
            return false
          }
        })
      }
    },
    watch: {
      'formData.team' () {
        this.addedTeamMembersIds = this.formData.team.map(user => user.id)
      },
      project () {
        if (this.project) {
          this.showModal()
        } else {
          this.formData = {
            name: '',
            status: '',
            shortDescription: '',
            fee: '',
            estimationTypes: [],
            team: []
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-alert {
    height: 40px;
  }

  .new-project-button {
    margin-top: 20px;
  }
</style>
