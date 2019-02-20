<template>
  <div class="boundary-align uk-panel">
    <form class="uk-width-1-1 uk-search uk-search-default">
      <span uk-search-icon></span>
      <input :placeholder="placeholder" @focusin="show()" @focusout="hide()" @input="update" @keydown.down.prevent="nextElement" @keydown.enter.prevent="accept()" @keydown.up.prevent="prevElement" class="uk-search-input" type="search" v-model="search">
    </form>
    <div class="dropdown uk-padding-remove" ref="dropdown" uk-dropdown="pos: bottom-justify; boundary: .boundary-align; boundary-align: true; mode: none;">
      <ul class="uk-list uk-list-divider uk-text-small uk-padding-remove uk-margin-remove" ref="elementsList">
        <slot/>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appSearch',
    props: {
      value: {
        default: ''
      },
      placeholder: {
        type: String,
        default: 'Search...'
      }
    },
    data () {
      return {
        search: this.value,
        currentElementIndex: -1
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {

      },
      show () {
        UIkit.dropdown(this.$refs.dropdown).show()
      },
      hide () {
        UIkit.dropdown(this.$refs.dropdown).hide()
      },
      update () {
        this.currentElementIndex = -1
        this.highlightElement()
        this.$emit('input', this.search)
      },
      accept () {
        this.$emit('accept', this.search)
      },
      highlightElement () {
        this.$refs.elementsList.querySelectorAll('li').forEach((el, i) => {
          i === this.currentElementIndex ? el.classList.add('active') : el.classList.remove('active')
        })
      },
      prevElement () {
        this.currentElementIndex--
        this.highlightElement()
      },
      nextElement () {
        this.currentElementIndex++
        this.highlightElement()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dropdown {
    overflow: auto;
    max-height: 250px;
    li {
      margin: 0;
      cursor: pointer;
      padding: 10px 40px;
      &:hover, &.active {
        background: #f5f5f5;
      }
    }
    img {
      margin-right: 5px;
      border-radius: 50%;
    }
  }
</style>
