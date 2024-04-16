import { Scene } from 'phaser';

export const IMAGES = {
  LOGO: 'logo',
  POKEBALL: 'pokeball',
}

export const ICONS = {
  FULLSCREEN: 'fullscreen',
}

export class Preloader extends Scene {

  constructor() {
    super('Preloader');
  }

  init() {
    // display background
    this.add.image(512, 384, 'background');

    // outline of progress bar
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    // rectangle for progress bar fill
    const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

    // use the 'progress' event emitted by the LoaderPlugin
    this.load.on('progress', (progress) => {
      // our bar is 464px wide, so 100% = 464px
      bar.width = 4 + (460 * progress);
    });
  }

  preload() {
    this.load.setPath('assets');
    this.load.image(IMAGES.LOGO, 'logo.png');
    this.load.image(IMAGES.POKEBALL, 'pokeball.png');
    this.load.image(ICONS.FULLSCREEN, 'icons/fullscreen.png');
  }

  create() {
    this.scene.start('MainMenu');
  }
}
