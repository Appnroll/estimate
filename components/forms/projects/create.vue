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
            <!--<p v-for="type in formData.estimationTypes">{{ type.value }}</p>-->

            <el-select class="estimation-types" v-model="formData.estimationTypes" multiple filterable allow-create default-first-option placeholder="Choose types or create a new ones">
              <el-option
                v-for="item in estimationTypes"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>

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
        formData: {
          name: '',
          shortDescription: '',
          managementFee: '',
          estimationTypes: []
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
    methods: {
      querySearch (queryString, cb) {
        const estimationTypes = this.estimationTypes
        const results = queryString ? estimationTypes.filter(this.createFilter(queryString)) : estimationTypes
        cb(results)
      },
      createFilter (queryString) {
        return (type) => {
          return (type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      addEstimationType (item) {
        this.formData.estimationTypes.push(item)
        this.estimationTypeSearch = ''
      },
      showModal () {
        this.modal = true
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
    }
  }
</script>

<style lang="scss" scoped>
  .el-row {
    padding: 10px 0;
  }

  .estimation-types {
    width: 100%;
  }
</style>
