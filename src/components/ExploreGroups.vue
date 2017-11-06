<template>
  <div class="explore__section" v-if="groups.length">

    <div class="heading explore__options">

      <h3 class="fs-b"><span v-html="prefixText"/><span class="explore__option" v-for="group of groups" :key="group.id"><button @click="setGroup(group.id)" :class="{ selected: group.id === activeGroup.id }" v-html="$t(group.title)"></button></span></h3>

    </div>

    <div class="explore__tags fs-m"
    :key="activeGroup.id">

      <tag-single v-for="tagId in activeGroup.tags"
      :key="tagId"
      :tag="tags[tagId]"/>

    </div>

  </div>
</template>

<script>
export default {
  computed: {
    prefixText() {
      return this.$t(this.$store.state.translations.explore.groups);
    },
    groups() {
      return this.$store.getters['explore/groups'];
    },
    activeGroup() {
      return this.$store.getters['explore/activeGroup'];
    },
    tags() {
      return this.$store.state.tags.entities;
    },
  },
  methods: {
    setGroup(id) {
      this.$store.commit('explore/setGroup', id);
    },
  },
};
</script>
