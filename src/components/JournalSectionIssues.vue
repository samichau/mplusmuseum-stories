<template>
  <app-panel>

    <template slot="content">

      <div class="panel__inner">

        <app-title-link class="fs-m"
        wrap="h2"
        :title="$store.state.translations.journal.issuesAll"/>

      </div>

      <journal-issue-listing
      v-for="issue in content"
      :key="issue.id"
      :issue="issue"/>


    </template>

  </app-panel>
</template>

<script>
import JournalIssueListing from '../components/JournalIssueListing.vue';

export default {
  props: {
    content: {
      required: true,
    },
  },
  components: {
    JournalIssueListing,
  },
};
</script>
