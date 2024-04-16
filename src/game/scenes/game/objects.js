import Phaser from 'phaser';
import { IMAGES } from '../../assets';


export class Card extends Phaser.GameObjects.Container {

  textStyle = {
    fontFamily: 'Arial Black',
    stroke: '#000000',
  };

  titleStyle = {
    ...this.textStyle,
    fontSize: 16,
    strokeThickness: 6,
  }

  padding = 20;

  constructor({scene, x, y, name, description}) {
    // init & config
		super(scene, x, y);
    this.scene = scene;
    this.x = x;
    this.y = y;

    // add card background
    const backgroundElement = scene.add.image(0, 0, IMAGES.CARD).setOrigin(0.5, 0.5).setScale(0.2);

    // calculate dimensions
    const { width, height } = this.scene.sys.game.canvas;
    console.log(width);
    console.log(backgroundElement.displayWidth)
    this.xLeft = (width - backgroundElement.displayWidth) / 2;
    this.yTop = (height - backgroundElement.displayHeight) / 2;

    // calculate title position
    const titleXPos = this.xLeft + this.padding;
    const titleYPos = this.yTop + this.padding;

    // calculate description position
    const descriptionXPos = this.xLeft + this.padding;
    const descriptionYPos = this.yTop + this.displayHeight * 0.4 + this.padding;

    // build description style 
    this.descriptionStyle = {
      ...this.textStyle,
      fontSize: 12,
      strokeThickness: 3,
      wordWrap: {
        width: backgroundElement.width - (this.padding * 2),
        useAdvancedWrap: true
      }
    }

    // add card title to the scene
    const titleElement = scene.add.text(titleXPos, titleYPos, name, this.titleStyle)
      .setOrigin(0, 0)
      .setDepth(100);

    // add description to the scene
    const descriptionElement = scene.add.text(descriptionXPos, descriptionYPos, description, this.descriptionStyle)
      .setOrigin(0, 0)
      .setDepth(100);

    // add elements to the container
    this.add(backgroundElement);
    this.add(titleElement);
    this.add(descriptionElement);
	}

}