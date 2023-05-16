<template>
  <template v-if="curGame == 1">
      <SimpleColorGame></SimpleColorGame>
  </template>
    <template v-if="curGame == 2">
        <SimpleSoundGame></SimpleSoundGame>
    </template>
    <template v-if="curGame == 3">
        <HardColorGame></HardColorGame>
    </template>
    <template v-if="curGame == 4">
        <HardSoundGame></HardSoundGame>
    </template>
    <template v-if="curGame == 5">
        <HardNumberGame></HardNumberGame>
    </template>
    <template v-if="curGame == 6">
        <SimpleRDOGame></SimpleRDOGame>
    </template>
    <template v-if="curGame == 7">
        <HardRDOGame></HardRDOGame>
    </template>
    <template v-if="curGame == 8">
        <WatchingPursuitGame></WatchingPursuitGame>
    </template>
    <template v-if="curGame == 9">
        <WatchingAnalogGame></WatchingAnalogGame>
    </template>
    <template v-if="curGame == 10">
        <MemoryGame></MemoryGame>
    </template>
    <template v-if="curGame == 11">
        <AttentionGame></AttentionGame>
    </template>
    <template v-if="curGame == 12">
        <BrainGame></BrainGame>
    </template>
</template>

<script>
import HardSoundGame from "@/views/client/games/Sound/HardSoundGame.vue";
import SimpleColorGame from "@/views/client/games/Color/SimpleColorGame.vue";
import SimpleSoundGame from "@/views/client/games/Sound/SimpleSoundGame.vue";
import HardColorGame from "@/views/client/games/Color/HardColorGame.vue";
import HardNumberGame from "@/views/client/games/Number/HardNumberGame.vue";
import SimpleRDOGame from "@/views/client/games/Rdo/SimpleRDOGame.vue";
import HardRDOGame from "@/views/client/games/Rdo/HardRDOGame.vue";
import WatchingPursuitGame from "@/views/client/games/Mouse/WatchingPursuitGame.vue";
import WatchingAnalogGame from "@/views/client/games/Mouse/WatchingAnalogGame.vue";
import MemoryGame from "@/views/client/games/PsyProcesses/memory/MemoryGame.vue";
import AttentionGame from "@/views/client/games/PsyProcesses/attention/AttentionGame.vue";
import BrainGame from "@/views/client/games/PsyProcesses/brain/BrainGame.vue";

export default {
  name: "GamesResolver",
  components: {
    BrainGame,
    AttentionGame,
    MemoryGame,
    WatchingAnalogGame,
    WatchingPursuitGame,
    HardRDOGame,
    SimpleRDOGame, HardNumberGame, HardSoundGame, HardColorGame, SimpleSoundGame, SimpleColorGame},
  computed: {
    curGame() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>