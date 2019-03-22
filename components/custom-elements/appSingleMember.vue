<template>
  <el-row align="middle" type="flex">
    <img :alt="member.profile.real_name" :src="member.profile.image_72" v-if="avatar">
    <span v-if="name">{{ member.profile.real_name }}</span>
  </el-row>
</template>

<script>
  export default {
    name: 'appSingleMember',
    props: {
      member: {
        type: Object,
        default: () => {
        }
      },
      avatar: {
        type: Boolean,
        default: true
      },
      name: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  img {
    width: 36px;
    border-radius: 50%;
    & + span {
      margin-left: 1em;
    }
  }
</style>
