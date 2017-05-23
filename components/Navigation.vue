<template>
  <nav v-if="!isLoading" v-bind:class="{ open: menu.isOpen }">
    
    <div class="toggle-menu">
      <a v-on:click="openMenu">{{ menu.title[selectedLocale] }}<span></span></a>
    </div>
    
    <div class="main-links">
      <ul>
        <li v-for="(section, index) in sections.entries">

          <nuxt-link
            @click.native="sectionLinksUpdates(index)"
            :to="{
              name: 'locale-section',
              params: {
                locale: selectedLocale,
                section: section[localizedFields.title_slug]}
            }">
            {{section[localizedFields.title]}}
          </nuxt-link>

        </li>
      </ul> 
    </div>
    
    <div class="languages">
      <ul>
        <li v-for="locale in locales">

          <nuxt-link 
            @click.native="update"
            :to="{
              to: 'locale', 
              params: {
                locale: locale.lang,
                section: locale.slug[menu.sectionIndex]}
            }">
            {{ locale.lang }}
          </nuxt-link>

        </li>
      </ul>
    </div>

  </nav>
</template>

<script>

import {mapState, mapMutations} from 'vuex'

export default {
  watch: {
    '$route' () {
      this.update()
    }
  },
  mounted () {
    this.update()
  },
  methods: {
    openMenu: function () {
      this.updateMenu()
    },
    updateIndex: function (index) {
      this.updateSectionIndex(index)
    },
    sectionLinksUpdates: function (arg) {
      this.openMenu()
      this.updateSectionIndex(arg)
    },
    update: function () {
      this.updateLocale(this.$route.params.locale)
      this.localizables()
      this.notLoading()
    },
    localizables: function () {
      let obj = {}
      const self = this
      Object.keys(this.sections.fields).map(function (key, index) {
        if (self.sections.fields[key].localize) {
          if (self.$route.params.locale !== 'en') {
            let newKey = self.sections.fields[key].name + '_' + self.$route.params.locale + '_slug'
            obj[key] = self.sections.fields[key].name + '_' + self.$route.params.locale
            obj[key + '_slug'] = newKey
            self.storeLocalizedFields(obj)
          } else {
            let newKey = self.sections.fields[key].name + '_slug'
            obj[key] = self.sections.fields[key].name
            obj[key + '_slug'] = newKey
            self.storeLocalizedFields(obj)
          }
        }
      })
    },
    ...mapMutations([
      'updateLocale',
      'storeLocalizedFields',
      'notLoading',
      'updateMenu',
      'updateSectionIndex'
    ])
  },
  computed: {
    ...mapState({
      sections: state => state.sections,
      locales: state => state.locales,
      selectedLocale: state => state.selectedLocale,
      localizedFields: state => state.localizedFields,
      isLoading: state => state.isLoading,
      menu: state => state.menu
    })
  }
}

</script>

<style lang="scss">
  nav {
    top: 0;
    left: 0;
    padding: 0;
    position: absolute;
    height: 100%;
    width: 120px;
    background-color: #FAFAFA;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 5px;
    transition: width 1s;
    overflow: hidden;
    div {
      width: 300px;
      position: absolute;
      ul {
        padding: 0 0 0 80px;
        margin: 0;
        transition: padding 1s;
        li {
          list-style: none;
          padding: 10px 0;
          a {
            color: #ACACAC;
            text-decoration: none;
            transition: color .3s;
            &:hover {
              color: #676767;
            }
          }
        }
      }
    }
    .toggle-menu {
      padding: 0 0 10px 28px;
      margin-top: 80px;
      width: calc(100% - 40px);
      transition: padding 1s;
      a {
        color: #ACACAC;
        position: relative;
        height: 100%;
        cursor: pointer;
        transition: color .3s;
        span {
          position: absolute;
          width: calc(100% - 5px);
          height: 2px;
          background-color: #ACACAC;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          transition: width 0.4s;
        }
        &:hover {
          color: #676767;
          span {
            width: 0;
          }
        }
      }
    }
    .main-links {
      top: 120px;
    }
    .main-links,
    .languages {
      visibility: hidden;
      opacity: 0;
      transition: visibility 0.5s, opacity 0.5s linear;
      transition-delay: 0.5s;
      .router-link-exact-active {
        color: #EE3524;
      }
    }
    .languages {
      bottom: 40px;
      ul {
        li {
          display: inline-block;
          padding: 0 20px 0 0;
        }
      }
    }
  }
  .open {
    width: 300px;
    div {
      ul {
        padding: 0 0 0 40px;
      }
    }
    .toggle-menu {
      padding: 0 0 10px 40px;
      a {
        span {
          width: 0;
        }
      }
    }
    .main-links,
    .languages {
      visibility: visible;
      opacity: 1;
    }
  }
</style>
