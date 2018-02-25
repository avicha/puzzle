import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class DrawingPieceSprite2 extends Sprite {
    constructor(...args) {
        super(...args)
    }
    draw(ctx) {
        if (this.opacity) {
            ctx.fillStyle = '#ffab91'
            ctx.fillRect(this.position.x, this.position.y, this.shape.width, this.shape.height)
        } else {
            ctx.fillStyle = '#fafafa'
            ctx.fillRect(this.position.x, this.position.y, this.shape.width, this.shape.height)
        }
    }
}