<template>
  <el-form :model="formData" @submit.native.prevent ref="form">
    <app-estimation-builder-row :key="index" :section="section" v-for="(section, index) in formData.sections"></app-estimation-builder-row>
  </el-form>
</template>

<script>
  import AppEstimationBuilderRow from './appEstimationBuilderRow'

  export default {
    name: 'appEstimationBuilder',
    components: { AppEstimationBuilderRow },
    data () {
      return {
        formData: {
          sections: [
            {
              name: 'As a guest',
              sections: [
                {
                  name: 'I want to see a register page',
                  sections: []
                }
              ]
            },
            {
              name: 'As a user',
              sections: [
                {
                  name: 'I want to edit my profile',
                  sections: []
                },
                {
                  name: 'I want to write messages',
                  sections: []
                }
              ]
            },
            {
              name: 'As an admin',
              sections: [
                {
                  name: 'I want to manage users',
                  sections: []
                },
                {
                  name: 'I want to manage site content',
                  sections: []
                }
              ]
            }
          ]
        }
      }
    },
    methods: {
      addNextSection () {
        this.formData.sections.push({
          name: '',
          sections: []
        })
      },
      addSubSection (section) {
        section.sections.push({
          name: '',
          sections: []
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-section-button, .accordion-button {
    padding-left: 7px;
    padding-right: 7px;
    .icon {
      margin: 0;
    }
  }

  .accordion-button {

  }
</style>
