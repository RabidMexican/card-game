<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus, EVENTS } from './EventBus';
import StartGame from './main';

const scene = ref();
const game = ref();
const container = "game-container";
const emit = defineEmits([EVENTS.CURRENT_ACTIVE_SCENE]);

onMounted(() => {
  game.value = StartGame(container);
  EventBus.on(EVENTS.CURRENT_SCENE_READY, (currentScene) => {
    emit(EVENTS.CURRENT_ACTIVE_SCENE, currentScene);
    scene.value = currentScene;
  });
});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
    game.value = null;
  }
});

defineExpose({ scene, game });
</script>

<template>
  <div :id="container"></div>
</template>