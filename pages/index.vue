<template>
  <div>

    <ul>
      <li v-for="section in menu.section">
        {{ section.title }}
      </li>
    </ul>

  </div>
</template>

<script>

import {mapState} from 'vuex'
import {storeMenu} from './shared'

export default {
  fetch: storeMenu,
  computed: {
    ...mapState({
      menu: state => state.menu[0]
    })
  }
}

</script>
