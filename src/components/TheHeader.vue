<template>
  <header>
    <h1 :class="{enabled: leftEnabled}"
        style="transform: translate(40%, 0%);"
        @click="clickPoint('left')">●</h1>
    <span :class="{strikethrough: leftEnabled && rightEnabled}">
      <h1>&nbsp;&nbsp;{{ title }}&nbsp;&nbsp;</h1>
    </span>
    <h1 :class="{enabled: rightEnabled}"
        style="transform: translate(-40%, 0%);"
        @click="clickPoint('right')">●</h1>
  </header>
</template>

<script>
export default {
  props: ['title', 'currLvl'],
  data() {
    return {
      leftEnabled: false,
      rightEnabled: false,
    };
  },
  methods: {
    clickPoint(point) {
      if (this.currLvl === 2) {
        if (point === 'left') {
          this.leftEnabled = !this.leftEnabled;
        }
        if (point === 'right') {
          this.rightEnabled = !this.rightEnabled;
        }
        if (this.rightEnabled && this.leftEnabled) {
          setTimeout(() => {
            this.$emit('patternSolved');
            this.rightEnabled = false;
            this.leftEnabled = false;
          }, 600);
        }
      }
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: darkslategray;
  display: flex;
  justify-content: center;
  align-items: center;
}

header h1 {
  color: white;
  margin: 0;
}

header span {
  color: lightseagreen;
  margin: 0;
}

.enabled {
  color: lightseagreen;
}

.strikethrough {
  text-decoration: line-through;
}
</style>