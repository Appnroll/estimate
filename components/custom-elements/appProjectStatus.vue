<template>
  <el-tag :size="size" :type="type">{{ status }}</el-tag>
</template>

<script>
  export default {
    name: 'appProjectStatus',
    props: {
      size: {
        type: String,
        default: 'small'
      },
      status: {
        type: String,
        default: 'info'
      }
    },
    computed: {
      type () {
        switch (this.status) {
          case 'estimated':
            return 'success'
          case 'in progress':
            return ''
          case 'created':
            return 'warning'
          case 'on hold':
            return 'danger'
          default:
            return 'info'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-tag {
    text-transform: lowercase;
    &:first-letter {
      text-transform: uppercase;
    }
  }
</style>
