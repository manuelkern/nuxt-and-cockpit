<template>
  <div class="nuxt">
    <navigation></navigation>
    <nuxt/>
  </div>
</template>

<script>

import Navigation from '~/components/Navigation'

export default {
  components: {
    'navigation': Navigation
  }
}

</script>
