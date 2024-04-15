import Phaser from 'phaser';

// Used to emit events between Vue components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Phaser.Events.EventEmitter();

export const EVENTS = {
  CURRENT_SCENE_READY: 'current-scene-ready',
  CURRENT_ACTIVE_SCENE: 'current-active-scene',
}