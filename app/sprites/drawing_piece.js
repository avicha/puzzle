import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class DrawingSprite extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.clock_piece
        this.shape = new Rectangle(this.borderWidth, this.borderWidth, resources.clock_piece.sizeWidth, resources.clock_piece.sizeHeight)
    }
    draw(ctx) {
        if (this.visiable) {
            super.draw(ctx)
            ctx.strokeStyle = '#f5ead6'
            ctx.lineWidth = this.borderWidth
            ctx.strokeRect(this.position.x - this.borderWidth, this.position.y - this.borderWidth, this.shape.width + 2 * this.borderWidth, this.shape.height +2 * this.borderWidth)
        }
    }
}