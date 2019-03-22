<template>
  <el-popover
    placement="left-start"
    trigger="hover"
    width="200">
    <el-col :span="24">
      <app-single-member :key="member.id" :member="member" class="full-member" v-for="member in members"></app-single-member>
    </el-col>
    <el-row align="middle" justify="left" slot="reference" type="flex">
      <app-single-member :key="member.id" :member="member" :name="false" class="avatar-only" v-for="(member, index) in members" v-if="index < 4"></app-single-member>
      <el-badge :value="`+ ${hiddenMembersCount}`" type="primary" v-if="hiddenMembersCount > 0">
        <span></span>
      </el-badge>
    </el-row>
  </el-popover>
</template>

<script>
  import AppSingleMember from '~/components/custom-elements/appSingleMember'

  export default {
    name: 'appMembersAvatarList',
    components: { AppSingleMember },
    props: {
      members: {
        type: Array,
        default: () => []
      },
      visible: {
        type: Number,
        default: 4
      }
    },
    computed: {
      hiddenMembersCount () {
        return this.members.length - this.visible
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-only {
    border-radius: 50%;
    box-shadow: 0 0 0 1.5px #ffffff;
    &:not(:first-of-type) {
      margin-left: -18px;
    }
  }

  .full-member {
    margin: 12px 0;
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
</style>
