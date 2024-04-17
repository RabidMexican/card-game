import Phaser from 'phaser';
import CardLibrary from './CardLibrary';

import { EVENTS, EventBus } from '../../EventBus';
import { IMAGES } from '../../assets';


export class Game extends Phaser.Scene {
  width;
  height;

  buttons = {};
  handArray = [];

  options = {
    startingHandSize: 10,
    marginSizeRatio: 0.10,
  };

  constructor() {
    super('Game');
  }

  create() {
    // get width and height
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // build the Card Library
    this.cardLibrary = new CardLibrary();

    // add background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // add background image
    this.add.image(centerX, centerY, IMAGES.TABLE).setScale(1.1);

    // calculate starting positions for hand management
    const marginSize = this.width * this.options.marginSizeRatio;
    const handWidth = this.width - (2 * marginSize) - 75;
    const handCardSpacing = handWidth / this.options.startingHandSize;
    const handStartPosition = marginSize * 2;
    
    // build starting hand
    for (let i = 0; i < this.options.startingHandSize; i++) {

      // calculate position and build a card
      const currentPos = handStartPosition + (i * handCardSpacing);
      const RandomCard = this.cardLibrary.randomCard();

      // generate a new random card
      const card = new RandomCard({
        scene: this,
        x: currentPos,
        y: this.height - 100,
        depth: 100 + this.options.startingHandSize - (i + 1),
        interactive: true,
      });

      // configure card
      this.handArray.push(card);
      this.add.existing(this.handArray[i]);
    }

    // tell the engine that the Scene is ready
    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }

}
