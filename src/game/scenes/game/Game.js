import Phaser from 'phaser';
import { EVENTS, EventBus } from '../../EventBus';


export class Game extends Phaser.Scene {
  buttons = {};

  width;
  height;

  constructor() {
    super('Game');
  }

  create() {
    // get width and height
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // add background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // add background image
    this.add.image(512, 384, 'background').setAlpha(0.5);

    this.add.text(centerX, centerY, 'INSERT ACTUAL GAME HERE', {
      fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
    }).setOrigin(0.5).setDepth(100);

    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }
}
