import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class DrawingPieceSprite extends Sprite {
    constructor(...args) {
        super(...args)
    }
    draw(ctx) {
        ctx.fillStyle = `rgba(255,224,130,${this.alpha})`
        ctx.fillRect(this.position.x, this.position.y, this.shape.width, this.shape.height)
        super.draw(ctx)
    }
}