<template>
  <div>

    <ul>
      <li v-for="section in sections">
        {{ section.title }}
          <grid-page v-if="section.pages" :parentPages="section.pages"></grid-page>
      </li>
    </ul>

  </div>
</template>

<script>

import gridPage from './grid-page'
import {mapState} from 'vuex'
import {storeSections} from './shared'

export default {
  fetch: storeSections,
  components: {
    gridPage
  },
  computed: {
    ...mapState({
      sections: state => state.sections
    })
  }
}

</script>
