<template>
  <el-col :span="24">
    <el-row :gutter="10" type="flex">
      <el-col class="auto-width">
        <!--<el-button @click="addNextSection(section)" class="add-section-button" type="primary">-->
          <!--<i class="icon md-24">add</i>-->
        <!--</el-button>-->
      </el-col>
      <el-col :span="12">
        <el-form-item prop="name">
          <el-input autocomplete="off" placeholder="Feature / user story" v-model="section.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="flex-1">
        <el-form-item prop="shortDescription">
          <el-input autocomplete="off" placeholder="Users"></el-input>
        </el-form-item>
      </el-col>
      <el-col class="auto-width" v-if="section.sections.length > 0">
        <el-button @click="" class="accordion-button">
          <i class="icon md-24">keyboard_arrow_down</i>
        </el-button>
      </el-col>
    </el-row>
    <el-row justify="end" type="flex">
      <el-col :span="23">
        <app-estimation-builder-row :key="index" :section="section" v-for="(section, index) in section.sections"></app-estimation-builder-row>
      </el-col>
    </el-row>
    <el-button @click="addNextSection(section)" class="add-subsection-button" type="primary">
      <i class="icon md-14">add</i>
    </el-button>
  </el-col>
</template>

<script>
  export default {
    name: 'appEstimationBuilderRow',
    props: {
      section: {
        type: Object,
        default: () => {
        }
      }
    },
    data: () => ({
      name: '',
      sections: []
    }),
    methods: {
      addNextSection (section) {
        section.sections.push({
          name: '',
          sections: []
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .add-section-button, .add-subsection-button, .accordion-button {
    padding-left: 7px;
    padding-right: 7px;
    .icon {
      margin: 0;
    }
  }
  .add-subsection-button {
    padding-top: 7px;
    margin-left: 10px;
    padding-bottom: 7px;
  }
</style>
