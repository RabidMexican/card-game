import Phaser from 'phaser';
import { EVENTS, EventBus } from '../../EventBus';


export class Game extends Phaser.Scene {
  buttons = {};

  constructor() {
    super('Game');
  }

  create() {
    // add background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // add background image
    this.add.image(512, 384, 'background').setAlpha(0.5);

    this.add.text(512, 384, 'INSERT ACTUAL GAME HERE', {
      fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5).setDepth(100);

    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }
}
