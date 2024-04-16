import Phaser from 'phaser';
import { IMAGES } from '../../assets';


export default class Card extends Phaser.GameObjects.Container {
  padding = 20;

  constructor({scene, x, y, name, description, interactive}) {
    super(scene, x, y);

    // config
    this.isSelected = false;
    this.scene = scene;
    this.startPosX = x;
    this.startPosY = y
    this.x = x;
    this.y = y;

    // add card background
    const backgroundElement = scene.add.image(0, 0, IMAGES.CARD).setOrigin(0.5, 0.5).setScale(0.2);

    // calculate card edges
    this.xLeft = 0 - (backgroundElement.displayWidth / 2);
    this.yTop = 0 - (backgroundElement.displayHeight / 2);

    // calculate title position
    const titleXPos = this.xLeft + this.padding;
    const titleYPos = this.yTop + this.padding;

    // calculate description position
    const descriptionXPos = this.xLeft + this.padding;
    const descriptionYPos = this.yTop * 0.4 + this.padding;

    // build styles
    this.textStyle = {
      fontFamily: 'Arial Black',
      stroke: '#000000',
    };
    this.titleStyle = {
      ...this.textStyle,
      fontSize: 16,
      strokeThickness: 6,
    };

    this.descriptionStyle = {
      ...this.textStyle,
      fontSize: 12,
      strokeThickness: 3,
      wordWrap: {
        width: backgroundElement.displayWidth - (this.padding * 2),
        useAdvancedWrap: true
      }
    };

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
    this.setSize(backgroundElement.displayWidth, backgroundElement.displayHeight);

    // add interactivity to scene
    if (interactive) {
      this.setInteractive({cursor: 'grab'});
      this.scene.input.setDraggable(this);

      // configure drag
      this.on('drag', (pointer, dragX, dragY) => {
        this.x = dragX;
        this.y = dragY;
      });
      // configure drop
      this.on('dragend', () => {
        this.x = this.startPosX;
        this.y = this.startPosY;
      });
      // raise card on mouse over
      this.on('pointerover', () => {
        this.y = this.startPosY - 50;
      });
      // un-raise card on mouse out
      this.on('pointerout', () => {
        this.y = this.startPosY;
      });
      this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        this.x = dragX;
        this.y = dragY;
      });
    }
    
	}

}