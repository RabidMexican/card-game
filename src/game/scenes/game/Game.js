import Phaser from 'phaser';
import CancerCard from './cards/CancerCard';
import Card from './Card';

import { EVENTS, EventBus } from '../../EventBus';
import { COLORS, IMAGES } from '../../assets';


export class Game extends Phaser.Scene {
  width;
  height;

  buttons = {};
  handArray = [];

  options = {
    startingHandSize: 5,
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

    // add background color
    this.cameras.main.setBackgroundColor(0x00ff00);

    // add background image
    this.add.image(centerX, centerY, IMAGES.TABLE).setScale(1.1);

    // build back button
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

    // add back button actions
    this.buttons.back
      .on('pointerover', () => {this.buttons.back.setStyle({fill: COLORS.MENU_TEXT_SELECTED})})
      .on('pointerout', () => {this.buttons.back.setStyle({fill: COLORS.MENU_TEXT})})
      .on('pointerdown', () => this.scene.start('MainMenu'));

    // calculate starting positions for hand management
    console.log("handmarginRatio" + this.options.marginSizeRatio);
    const marginSize = this.width * this.options.marginSizeRatio;
    console.log("handmarginSize " + marginSize);
    const handWidth = this.width - (2 * marginSize);
    console.log("handwidth: " + handWidth)
    const handCardSpacing = handWidth / this.options.startingHandSize;
    const handStartPosition = marginSize * 2;
    
    // build starting hand
    for (let i = 0; i < this.options.startingHandSize; i++) {

      // calculate position and build a card
      const currentPos = handStartPosition + (i * handCardSpacing);
      const card = new CancerCard({
        scene: this,
        x: currentPos,
        y: this.height - 300,
        interactive: true,
      });

      // configure card  
      card.setDepth(this.options.startingHandSize - i);
      this.handArray.push(card);
      this.add.existing(this.handArray[i]);
    }

    // tell the engine that the Scene is ready
    EventBus.emit(EVENTS.CURRENT_SCENE_READY, this);
  }
}
