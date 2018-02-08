import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class DrawingPieceSprite extends Sprite {
    constructor(...args) {
        super(...args)
    }
    draw(ctx) {
        super.draw(ctx)
        ctx.strokeStyle = '#f5ead6'
        ctx.lineWidth = 2
        ctx.strokeRect(this.position.x, this.position.y, this.shape.width, this.shape.height)
    }
}