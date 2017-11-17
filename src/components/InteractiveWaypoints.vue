<template>
  <div class="waypoints" v-on:increment="setThresholds">

    <slot/>

  </div>
</template>

<script>
  export default {
    props: {
      trigger: {
        type: Function,
        required: true,
      },
    },
    data() {
      return {
        sectionThresholds: [],
        currentSectionIndex: -1,
      };
    },
    methods: {
      setThresholds() {
        // Convert HTMLcollection to array
        const sections = Array.prototype.slice.call(this.$el.children);
        // Save new array of just the section positions
        const arr = sections.map(section => section.offsetTop + section.clientHeight);
        // Add first position to the start of the array
        const firstPosition = sections[0].offsetTop;
        arr.unshift(firstPosition);
        this.sectionThresholds = arr;
      },
      handleScroll() {
        const scrollPos = window.scrollY;
        if (scrollPos <= this.sectionThresholds[0] && this.currentSectionIndex >= 0) {
          this.currentSectionIndex = -1;
          this.trigger(-1);
        } else {
          // For each of the thresholds
          this.sectionThresholds.forEach((threshold, index) => {
            // If the position is greater than the threshold ...
            if (scrollPos > threshold
            // ... and either this is the last threshold ...
            // ... or the position is before the next position ...
            && (!this.sectionThresholds[index + 1]
              || scrollPos < this.sectionThresholds[index + 1])
            // ... and this isn't the current index
            && index !== this.currentSectionIndex) {
              // Update the current index
              this.currentSectionIndex = index;
              // Execute the passed function
              this.trigger(index);
            }
          });
        }
      },
    },
    updated() {
      this.setThresholds();
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.setThresholds);
      this.$nextTick(this.setThresholds);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.setThresholds);
    },
  };
</script>
