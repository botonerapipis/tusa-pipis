<template>
  <TheHeader title="Botonera Pipis"
             :currLvl="currLvl"
             @patternSolved="levelUp"/>
  <BaseButton v-for="button in buttons"
              :key="button.expression"
              :expression="button.expression"
              :duration="button.duration" style="width: 40%; margin: 5%;"
              :lvl="button.lvl"
              :currLvl="currLvl"
              @showModalButtonLocked="showModalButtonLocked = true"
              @trigger="buttonPressed(button.expression)"/>
  <transition name="modal">
    <BaseModal v-if="showModalButtonLocked"
               @close="showModalButtonLocked = false">
      <template v-slot:header>
        <h3>¡No podés usar este botón todavia!</h3>
      </template>
      <template v-slot:body>
        <p>Tenés que descubrir el patrón secreto para desbloquearlo</p>
        <p>¡Suerte!</p>
      </template>
    </BaseModal>
  </transition>
  <transition name="modal">
    <BaseModal v-if="showModalLevelUp"
               @close="showModalLevelUp = false">
      <template v-slot:header>
        <h3 v-if="currLvl === 2">¡¡¡BBEEAAHHNN!!!</h3>
        <h3 v-if="currLvl === 3">¡felicitacioneNNegry!</h3>
        <h3 v-if="currLvl === 4">¡¡¡QUE BOENAH!!!</h3>
      </template>
      <template v-slot:body>
        <div v-if="currLvl === 2">
          <p>¡Descuriste el primer patrón secreto!</p>
          <p>- Beahn? Avar... Beahn!</p>
          <p>Desbloqueaste:<br/>
             • Karina (+4)<br/>
             • Magda (+1)</p>
        </div>
        <div v-if="currLvl === 3">
          <p>¡eDtuvo rrre bueno tu connect points!</p>
          <p>Desbloqueaste:<br/>
            • Gudtavito (+2)<br/>
            • Karina (+1)</p>
        </div>
        <div v-if="currLvl === 4">
          <p>¡Descubriste el diálogo secreto!</p>
          <p>- ¿uYGH? ¿Cómo va eso? Bueno, ¿Qué vamos a hacer?<br/>
             - Connect points, ¿Seh?</p>
          <p>Desbloqueaste:<br/>
            • Moni (+1)<br/>
            • Gajo (+1)
            • Goku (+2)</p>
        </div>
      </template>
    </BaseModal>
  </transition>
</template>

<script>
import BaseButton from "./components/BaseButton";
import TheHeader from "./components/TheHeader";
import BaseModal from "./components/BaseModal";

const firstPattern = ['beahn0', 'avar', 'beahn2'];
const thirdPattern = ['uYGH', 'qvamohacer', 'connectpoints1', 'seh'];

export default {
  data() {
    const currLvl = localStorage.getItem("currLvl");
    return {
      buttons: [
        {expression: "beahn1", duration: "0.26", lvl: 1},
        {expression: "beahn2", duration: "0.20", lvl: 1},
        {expression: "perfactah", duration: "0.18", lvl: 1},
        {expression: "beahn0", duration: "0.36", lvl: 1},
        {expression: "mbeahn", duration: "0.32", lvl: 1},
        {expression: "mahl", duration: "0.26", lvl: 1},
        {expression: "moymahl", duration: "0.36", lvl: 1},
        {expression: "qboenah", duration: "0.22", lvl: 1},
        {expression: "avar", duration: "0.30", lvl: 1},
        {expression: "beahn3", duration: "0.04", lvl: 2},
        {expression: "seh", duration: "0.30", lvl: 2},
        {expression: "enfiedtate", duration: "0.18", lvl: 2},
        {expression: "norrompemo", duration: "0.18", lvl: 2},
        {expression: "connectpoints1", duration: "0.26", lvl: 2},
        {expression: "connectpoints2", duration: "0.06", lvl: 3},
        {expression: "uYGH", duration: "0.24", lvl: 3},
        {expression: "qvamohacer", duration: "0.28", lvl: 3},
        {expression: "vos", duration: "0.38", lvl: 4},
        {expression: "qtal", duration: "0.28", lvl: 4},
        {expression: "qcargosa", duration: "0.34", lvl: 4},
        {expression: "lorevoleo", duration: "0.40", lvl: 4}
      ],
      showModalButtonLocked: false,
      showModalLevelUp: false,
      currLvl: currLvl != null ? parseInt(currLvl) : 1,
      currIdx: 0
    };
  },
  watch: {
    currLvl(value) {
      localStorage.setItem("currLvl", value.toString());
    }
  },
  components: {
    BaseModal,
    TheHeader,
    BaseButton
  },
  methods: {
    buttonPressed(btn) {
      if (this.currLvl !== 1 && this.currLvl !== 3)
        return;

      const pattern = this.currLvl === 1 ? firstPattern : thirdPattern;
      if (pattern[this.currIdx] === btn) {
        this.currIdx++;
        if (this.currIdx >= pattern.length) {
          this.currLvl++;
          this.currIdx = 0;
          this.showModalLevelUp = true;
        }
      } else {
        this.currIdx = 0;
      }
    },
    levelUp() {
      this.currLvl = 3;
      this.showModalLevelUp = true;
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Poppins', sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes shake {
  0%   {transform: translate(-4%, 0%);}
  100% {transform: translate(4%, 0%);}
}
</style>