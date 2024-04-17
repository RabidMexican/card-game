import Card from '../Card'


export default class InfantryCard extends Card {
  
  name = 'Infantry'
  descriptionStyle = 'Normal infantry.'

  constructor({scene, x, y, interactive}) {
    super({
      scene: scene,
      x: x,
      y: y,
      name: 'Cancer',
      description: 'Give your opponent cancer.',
      interactive: interactive,
    });
  }
}