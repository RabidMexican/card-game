import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene {
  logoTween;

  menuTextConfig = {
    fontFamily: 'Arial Black',
    fontSize: 38,
    color: '#ffffff',
    stroke: '#000000',
    strokeThickness: 8,
    align: 'center'
  };

  constructor() {
    super('MainMenu');
  }

  create () {
    this.add.image(512, 384, 'background');
    
    this.logo = this.add.image(512, 300, 'logo').setDepth(100);
    this.logo.scale = 0.4;

    this.add.text(512, 512, 'Continue', this.menuTextConfig).setDepth(100).setOrigin(0.5);
    this.add.text(512, 460, 'New Game', this.menuTextConfig).setDepth(100).setOrigin(0.5);
    this.add.text(512, 564, 'Quit', this.menuTextConfig).setDepth(100).setOrigin(0.5);
    
    EventBus.emit('current-scene-ready', this);
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
