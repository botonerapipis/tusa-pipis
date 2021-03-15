<template>
  <img @click="playAudio"
       @contextmenu.prevent="share"
       :style="imgStyle"
       :class="{disabled: disabled}"
       :src="require(`../assets/png/${expression}.png`)"
       :alt="expression">
</template>

<script>
export default {
  props: ['expression', 'duration', 'lvl', 'currLvl'],
  data() {
    return {
      audio: new Audio(require(`../assets/audio/${this.expression}.mp3`)),
      playing: false,
    };
  },
  computed: {
    imgStyle() {
      if (this.playing) {
        return {
          animation: `shake ${this.duration}s ease-in-out alternate infinite`,
          animationDelay: `${-parseFloat(this.duration)/2}s`,
        };
      } else {
        return {};
      }
    },
    disabled() {
      return parseInt(this.lvl) > parseInt(this.currLvl);
    }
  },
  methods: {
    playAudio() {
      if (this.playing)
        return;

      if (!this.disabled) {
        this.audio.addEventListener('ended', () => {
          this.playing = false;
        });
        this.playing = true;
        this.audio.play();
        this.$emit('trigger');
      } else {
        this.$emit('showModalButtonLocked');
      }
    },
    async share() {
      if (this.disabled)
        return;

      fetch(require(`../assets/audio/${this.expression}.mp3`))
          .then(async response => {
            const blob = await response.blob();
            const filesArray = [new File([blob], `${this.expression}.mp3`, { type: "audio/wav" })];
            if (navigator.canShare && navigator.canShare({ files: filesArray })) {
              navigator.share({
                files: filesArray,
                title: 'Share audio',
              })
            }
          });
    }
  }
}
</script>

<style scoped>
.disabled {
  filter: brightness(35%);
}
</style>