import Phaser from 'phaser';

import { Boot } from './scenes/Boot';
import { Game } from './scenes/game/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-container',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  backgroundColor: 0x028af8,
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
  ]
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
