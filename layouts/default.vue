<template>
  <el-container>
    <el-aside width="250px">
      <app-sidebar/>
    </el-aside>
    <el-container>
      <el-header>
        <app-header/>
      </el-header>
      <el-main>
        <transition mode="out-in" name="el-fade-in">
          <nuxt :key="$route.path"/>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AppHeader from '~/components/layout/appHeader'
  import AppSidebar from '~/components/layout/appSidebar'

  export default {
    components: { AppSidebar, AppHeader }
  }
</script>

<style lang="scss" scoped>
  .el-header {
    height: 60px;
    color: #333333;
    text-align: center;
  }

  .el-aside {
    color: #ffffff;
    background-color: #37474f;
  }

  .el-main {
    flex: 1 0 auto;
    color: #333333;
  }
</style>
