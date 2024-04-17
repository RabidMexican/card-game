import Card from '../Card'


export default class CancerCard extends Card {
  constructor({scene, x, y, depth, interactive}) {
    super({
      scene: scene,
      x: x,
      y: y,
      depth: depth,
      name: 'Cancer',
      description: 'Give your opponent cancer.',
      interactive: interactive,
    });
  }
}