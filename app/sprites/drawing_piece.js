import Sprite from '../../prime/sprite'
import resources from '../resources'
import Rectangle from '../../prime/rectangle'

export default class DrawingSprite extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.clock_piece
        this.shape = new Rectangle(0, 0, resources.clock_piece.sizeWidth, resources.clock_piece.sizeHeight)
    }
    draw(ctx) {
        if (this.visiable) {
            super.draw(ctx)
            ctx.strokeStyle = '#f5ead6'
            ctx.lineWidth = 2
            ctx.strokeRect(this.position.x, this.position.y, this.shape.width, this.shape.height)
        }
    }
}