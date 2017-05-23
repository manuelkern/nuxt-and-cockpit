<template>
  <div class="home page"></div>
</template>

<script>

import {mapState} from 'vuex'
import Navigation from '~/components/Navigation'
import {storeSections} from '../shared'

export default {
  fetch: storeSections,
  components: {
    'navigation': Navigation
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading
    })
  }
}

</script>
