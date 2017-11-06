<template>
  <router-link class="issue-listing"
  :to="{
    name: 'issue',
    params: {
      lang: $store.state.lang,
      issue: issue.name,
    },
  }">

    <app-banner :content="{
      hero: issue.hero,
    }">

      <div class="issue-listing__title fs-m">

        <h3 v-html="$t(issue.title)"></h3>

        <snippet-issue-number :number="issue.number"/>

      </div>

      <snippet-translate class="issue-listing__authors fs-b"
      :snippet="$store.state.translations.journal.contributions"
      :data="{ contributors: issue.contributors }"
      :parsers="{ contributors: (c) => $t(c) }"/>

    </app-banner>

  </router-link>
</template>

<script>
import SnippetIssueNumber from './SnippetIssueNumber.vue';
import SnippetTranslate from './SnippetTranslate.vue';

export default {
  props: {
    issue: {
      required: true,
    },
  },
  components: {
    SnippetIssueNumber,
    SnippetTranslate,
  },
};
</script>

<style lang="less">
@import "../less/variables.less";

.issue-listing {
  display: block;
  &__title {
    text-align: center;
    margin-bottom: 1em;
    .mq-sm({
      text-align: left;
      margin-bottom: 0;
    });
  }
  &__authors {
    text-align: center;
    .mq-sm({
      text-align: left;
    });
  }
  .banner {
    min-height: auto;
    height: 40vh;
    .mq-sm({
      height: 25vh;
    });
    &.banner--hasContent {
      .banner__media {
        opacity: 0.5;
        transition: 0.125s ease opacity;
      }
    }
  }
  .wrap {
    width: 100%;
    .mq-sm({
      padding: 0 1.5em;
    });
  }
  .banner__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .mq-sm({
      flex-direction: row;
    });
    > div {
      width: 100%;
      .mq-sm({
        flex-grow: 1;
        flex-shrink: 0;
        width: 50%;
      });
    }
  }
  &:hover {
    .banner {
      .banner__media {
        opacity: 0.6;
      }
    }
  }
}
</style>
