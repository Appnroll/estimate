import Vue from 'vue'

import fbRefs from '~/services/firebase'

Vue.mixin({
  data: () => ({
    fbRefs
  })
})
