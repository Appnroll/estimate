<template>
  <el-form :model="numberValidateForm" class="demo-ruleForm" label-width="100px" ref="numberValidateForm">
    <el-form-item
      :rules="[
      { required: true, message: 'age is required'},
      { type: 'number', message: 'age must be a number'}
    ]"
      label="age"
      prop="age"
    >
      <el-input autocomplete="off" type="number" v-model.number="numberValidateForm.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm('numberValidateForm')" type="primary">Submit</el-button>
      <el-button @click="resetForm('numberValidateForm')">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'appTest',
    data () {
      return {
        numberValidateForm: {
          age: ''
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
