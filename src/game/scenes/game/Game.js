import Phaser from 'phaser';
import { EVENTS, EventBus } from '../../EventBus';
import { COLORS, IMAGES } from '../../assets';


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
    this.add.image(centerX, centerY, IMAGES.TABLE).setScale(1.1);

    this.buttons.back = this.add.text(
      10, 10, '< BACK', 
      {
        fontFamily: 'Arial Black',
        fontSize: 24,
        color: COLORS.MENU_TEXT,
        stroke: '#000000',
        strokeThickness: 8,
      }
    ).setOrigin(0, 0).setDepth(100).setInteractive({cursor: 'pointer', backgroundColor: 'red'});

    this.buttons.back
      .on('pointerover', () => {this.buttons.back.setStyle({fill: COLORS.MENU_TEXT_SELECTED})})
      .on('pointerout', () => {this.buttons.back.setStyle({fill: COLORS.MENU_TEXT})})
      .on('pointerdown', () => this.scene.start('MainMenu'));

    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }
}
