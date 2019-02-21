<template>
  <nav>
    <el-col>
      <el-menu active-text-color="#ffd04b" background-color="#37474f" router text-color="#fff">
        <el-menu-item index="/">
          <i class="icon md-light">home</i>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="/projects">
          <i class="icon md-light">filter_none</i>
          <span>Projects</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </nav>
</template>

<script>
  export default {
    name: 'appSidebar'
  }
</script>

<style lang="scss" scoped>
  .el-menu {
    border: none;
  }
</style>
