import Phaser from 'phaser';

import { Boot } from './scenes/Boot';
import { Game } from './scenes/game/Game';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#028af8',
  scene: [
    Boot,
    Preloader,
    MainMenu,
    Game,
  ]
};

const StartGame = (parent) => new Phaser.Game({ ...config, parent });

export default StartGame;
