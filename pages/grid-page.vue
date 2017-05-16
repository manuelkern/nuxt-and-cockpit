<template>
  <div>
    <p v-for="parentPage in parentPages"> {{ parentPage.display }}</p>
    <p v-for="id in pagesId"> {{ id }}</p>
  </div>
</template>

<script>

export default {
  props: ['parentPages'],
  data () {
    return {
      pagesId: []
    }
  },
  created: async function () {
    let self = this
    await this.$props.parentPages.forEach(function (item) {
      self._data.pagesId.push(item._id)
    })
  }
}

</script>
