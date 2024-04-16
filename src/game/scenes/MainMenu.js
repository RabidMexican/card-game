import Phaser from 'phaser';

import { EventBus, EVENTS } from '../EventBus';
import { COLORS, IMAGES, ICONS } from '../assets';


export class MainMenu extends Phaser.Scene {
  logoTween;
  numberOfPokeballs = 10;

  width = 0;
  height = 0;

  buttons = {};

  menuTextStyle = {
    fontFamily: 'Arial Black',
    fontSize: 38,
    stroke: '#000000',
    strokeThickness: 8,
    align: 'center'
  };

  constructor() {
    super('MainMenu');
  }

  create () {
    // get width and height
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // add background
    this.add.image(512, 384, 'background');
    
    // add logo
    this.logo = this.add.image(centerX, 200, 'logo')
      .setScale(0.4)
      .setDepth(100);

    // initialise buttons
    this.buttons.newGame = this.add.text(centerX, centerY + 60, 'New Game', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({cursor: 'pointer'});
    this.buttons.continue = this.add.text(centerX, centerY + 110, 'Continue', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setStyle({fill: COLORS.MENU_TEXT_DISABLED});
    this.buttons.quit = this.add.text(centerX, centerY + 160, 'Quit', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({cursor: 'pointer', fill: COLORS.MENU_TEXT_SELECTED});
    this.buttons.fullScreen = this.add.image(this.width - 16, this.height - 16, ICONS.FULLSCREEN, 0)
      .setScale(2.0)
      .setOrigin(1, 1)
      .setInteractive({cursor: 'pointer'});


    this.buttons.fullScreen.on('pointerup', () => {
      if (this.scale.isFullscreen) {
        this.buttons.fullScreen.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        this.buttons.fullScreen.setFrame(1);
        this.scale.startFullscreen();
      }
    }, this);

    // add new game button events
    this.buttons.newGame
      .on('pointerover', () => {this.buttons.newGame.setStyle({fill: COLORS.MENU_TEXT_SELECTED})})
      .on('pointerout', () => {this.buttons.newGame.setStyle({fill: COLORS.MENU_TEXT})})
      .on('pointerdown', () => {this.scene.start('Game')});

    // add quit button events
    this.buttons.quit
      .on('pointerover', () => {this.buttons.quit.setStyle({fill: COLORS.MENU_TEXT_SELECTED})})
      .on('pointerout', () => {this.buttons.quit.setStyle({fill: COLORS.MENU_TEXT})})
      .on('pointerdown', () => close());

    this.addPokeballs();
    
    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }

  addPokeballs() {
    for (let step = 0; step < this.numberOfPokeballs; step++) {
      // get a random position
      const x = Phaser.Math.Between(64, this.scale.width - 64);
      const y = Phaser.Math.Between(64, this.scale.height - 64);

      // add a pokeball with some random rotation
      const pokeball = this.add.sprite(x, y, IMAGES.POKEBALL)
        .setScale(0.1)
        .setRotation(360 + Math.random() * 360)

      // fade the pokeball in and out
      this.add.tween({
        targets: pokeball,
        duration: 2000 + Math.random() * 2000,
        alpha: 0,
        yoyo: true,
        repeat: -1
      });
    }
  }

  changeScene() {
    if (this.logoTween) {
      this.logoTween.stop();
      this.logoTween = null;
    }
    this.scene.start('Game');
  }

  moveLogo (vueCallback) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause();
      } else {
        this.logoTween.play();
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          vueCallback({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y),
          });
        }
      });
    }
  }
}
