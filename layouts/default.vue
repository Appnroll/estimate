<template>
  <div>
    <app-header/>
    <main class="uk-container">
      <nuxt />
    </main>
  </div>
</template>

<script>
  import AppHeader from '~/components/appHeader'
  export default {
    components: { AppHeader }
  }
</script>

<style lang="scss" scoped>
</style>
