<template>
  <main class="document">
    <div class="header-push"></div>
    <div class="document__items wrap">
      <panel class="document-item document-item__contents">
        <div slot="header" class="anchor" id="contents"></div>
        <template slot="content">
          <h1 class="document__title fs-l">
              <span class="lang-primary" v-html="$t(page.title)"></span>&thinsp;<span class="lang-secondary" v-html="$tt(page.title)"></span>
          </h1>
          <div class="document-item__header">
            <h2 v-html="$t($store.state.site.translations.site.tableOfContents)"></h2>
          </div>
          <div class="text-block">
            <ul class="document__contents">
              <li v-for="panel of page.panels" :key="panel.name"><a :href="`#${panel.name}`" v-html="$t(panel.title)"></a></li>
            </ul>
          </div>
        </template>
      </panel>
      <panel v-for="panel of page.panels" :key="panel.name" class="document-item">
        <div slot="header" class="anchor" :id="panel.name"></div>
        <template slot="content">
          <div class="document-item__header">
            <a href="#contents" class="document-item__back"><img src="../assets/img/caret-up.svg" alt="Return to Contents"></a>
            <h2 v-html="$t(panel.title)"></h2>
          </div>
          <text-block :content="panel.content"></text-block>
        </template>
      </panel>
    </div>
  </main>
</template>

<script>
import TextBlock from '../components/TextBlock.vue';
import Panel from '../components/Panel.vue';

export default {
  props: {
    page: {
      required: true,
    },
  },
  components: {
    TextBlock,
    Panel,
  },
};
</script>


<style lang="less">
@import "../less/variables.less";

.document {
  padding: 4rem 0 1rem;
  background: @lightgrey;
  &__title {
    margin-bottom: 2rem;
    .mq-sm({
      margin-bottom: 3rem;
    });
  }
}

.document-item {
  &__header {
    margin-bottom: 1em;
    h2 {
      color: @accent;
    }
  }
  &__back {
    width: 2.5rem;
    display: block;
    float: right;
    img {
      width: 100%;
      transition: transform 0.25s ease;
    }
    &:hover {
      img {
        transform: translateY(-25%);
      }
    }
  }
}

</style>
