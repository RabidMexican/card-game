import { EventBus, EVENTS } from '../EventBus';
import { Scene } from 'phaser';
import { IMAGES } from './Preloader';

export class MainMenu extends Scene {
  logoTween;
  numberOfPokeballs = 10;
  buttons = {};
  colors = {
    menuText: '#ffffff',
    menuTextSelected: '#4287f5',
    menuTextDisabled: '#858585',
  }
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
    // add background
    this.add.image(512, 384, 'background');
    
    // add logo
    this.logo = this.add.image(512, 300, 'logo')
      .setScale(0.4)
      .setDepth(100);

    // initialise buttons
    this.buttons.newGame = this.add.text(512, 460, 'New Game', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({cursor: 'pointer'});
    this.buttons.continue = this.add.text(512, 512, 'Continue', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setStyle({fill: this.colors.menuTextDisabled});
    this.buttons.quit = this.add.text(512, 564, 'Quit', this.menuTextStyle)
      .setOrigin(0.5)
      .setDepth(100)
      .setInteractive({cursor: 'pointer'});

    // add new game button events
    this.buttons.newGame.on('pointerover', () => {
      this.buttons.newGame.setStyle({fill: this.colors.menuTextSelected});
    });
    this.buttons.newGame.on('pointerout', () => {
      this.buttons.newGame.setStyle({fill: this.colors.menuText});
    });
    this.buttons.newGame.on('pointerdown', () => {
      this.scene.start('Game');
    });

    // add quit button events
    this.buttons.quit.on('pointerover', () => {
      this.buttons.quit.setStyle({fill: this.colors.menuTextSelected});
    });
    this.buttons.quit.on('pointerout', () => {
      this.buttons.quit.setStyle({fill: this.colors.menuText});
    });
    this.buttons.quit.on('pointerdown', () => close());

    // animated pokeball background
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
    
    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
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
