<template>
  <div class="page section">
    <div class="content">
      <div class="title">{{ section[localizedFields.title] }}</div>
      <div v-html="section[localizedFields.body]"></div>
    </div>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex'
import {storeSections} from '~pages/shared'

export default {
  fetch: storeSections,
  watch: {
    '$route' () {
      this.getSection()
      this.localizables()
    }
  },
  mounted: function () {
    this.getSection()
    this.localizables()
  },
  methods: {
    localizables: function () {
      let obj = {}
      const self = this
      Object.keys(this.sections.fields).map(function (key, index) {
        if (self.sections.fields[key].localize) {
          if (self.$route.params.locale !== 'en') {
            obj[key] = self.sections.fields[key].name + '_' + self.$route.params.locale
            obj[key + '_slug'] = self.sections.fields[key].name + '_' + self.$route.params.locale + '_slug'
            self.storeLocalizedFields(obj)
          } else {
            obj[key] = self.sections.fields[key].name
            obj[key + '_slug'] = self.sections.fields[key].name + '_slug'
            self.storeLocalizedFields(obj)
          }
        }
      })
    },
    getSection: function () {
      const self = this
      let section = this.$route.params.section
      let localizedTitle = this.localizedFields.title_slug
      Object.keys(this.sections.entries).map(function (key, index) {
        if (self.sections.entries[index].title_slug === section || self.sections.entries[index][localizedTitle] === section) {
          self.updateSectionIndex(index)
          self.initSection(self.sections.entries[index])
        }
      })
    },
    ...mapMutations([
      'initSection',
      'storeLocalizedFields',
      'updateSectionIndex'
    ])
  },
  computed: {
    ...mapState({
      sections: state => state.sections,
      section: state => state.section,
      isLoading: state => state.isLoading,
      localizedFields: state => state.localizedFields,
      selectedLocale: state => state.selectedLocale,
      menu: state => state.menu
    })
  }
}

</script>
