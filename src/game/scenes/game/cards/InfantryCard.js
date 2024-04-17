import Card from '../Card'


export default class InfantryCard extends Card {
  constructor({scene, x, y, depth, interactive}) {
    super({
      scene: scene,
      x: x,
      y: y,
      depth: depth,
      name: 'Infantry',
      description: 'Normal infantry.',
      interactive: interactive,
    });
  }
}