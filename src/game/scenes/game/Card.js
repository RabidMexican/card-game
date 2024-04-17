import Phaser from 'phaser';
import { IMAGES } from '../../assets';


export default class Card extends Phaser.GameObjects.Container {
  width = 150;
  height = 200;
  padding = 10;

  constructor({
    scene, x, y,
    depth,
    name,
    description,
    interactive,
    actions,
  }) {
    super(scene, x, y);

    // config
    this.isSelected = false;
    this.name = name
    this.description = description
    this.scene = scene;
    this.actions = actions;

    // positions
    this.startPosX = x;
    this.startPosY = y;
    this.startDepth = depth;
    this.x = x;
    this.y = y;
    this.depth = depth;

    // calculate card edges
    this.xLeft = -(this.width / 2);
    this.yTop = -(this.height / 2);

    // build elements
    this.#buildStyles();
    this.backgroundElement = this.#buildBackground();
    this.titleElement = this.#buildTitle();
    this.descriptionElement = this.#buildDescription();

    // add elements to the container
    this.add(this.backgroundElement);
    this.add(this.titleElement);
    this.add(this.descriptionElement);
    this.setSize(this.width, this.height);

    // add interactivity to scene
    if (interactive) {
      this.setInteractive({cursor: 'grab'});
      this.scene.input.setDraggable(this);

      // configure interactions
      this.on('drag', (pointer, dragX, dragY) => this.onDrag(dragX, dragY));
      this.on('dragend', () => this.onDragEnd());
      this.on('pointerover', () => this.onMouseOver());
      this.on('pointerout', () => this.onMouseOut());
    }
    
	}

  #buildStyles() {
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
        width: this.width - (this.padding * 2),
        useAdvancedWrap: true
      }
    };
  }

  onDrag(dragX, dragY) {
    this.x = dragX;
    this.y = dragY;
  }

  onDragEnd() {
    this.x = this.startPosX;
    this.y = this.startPosY;
  }

  onMouseOver() {
    this.setDepth(200); 
    this.y = this.startPosY - 30;
  }

  onMouseOut() {
    this.setDepth(this.startDepth);
    this.y = this.startPosY;
  }

  #buildBackground() {
    const image = this.scene.add.image(0, 0, IMAGES.CARD)
      .setOrigin(0.5, 0.5);
    image.displayHeight = this.height;
    image.displayWidth = this.width;
    return image;
  }

  #buildTitle() {
    // calculate title position
    const titleXPos = this.xLeft + this.padding;
    const titleYPos = this.yTop + this.padding;
    // add card title to the scene
    return this.scene.add.text(titleXPos, titleYPos, this.name, this.titleStyle)
      .setOrigin(0, 0)
      .setDepth(100);
  }

  #buildDescription() {
    // calculate description position
    const descriptionXPos = this.xLeft + this.padding;
    const descriptionYPos = this.yTop * 0.4 + this.padding;
    // add description to the scene
    return this.scene.add.text(descriptionXPos, descriptionYPos, this.description, this.descriptionStyle)
      .setOrigin(0, 0)
      .setDepth(100);
  }



}