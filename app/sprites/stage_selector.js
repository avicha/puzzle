import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import resources from '../resources'

export default class StageSelector extends Sprite {
    constructor(...args) {
        super(...args)
    }
    draw(ctx) {
        if (this.active) {
            super.draw(ctx)
        } else {
            resources.stage_empty.drawTile(ctx, this.position.x, this.position.y, 0)
        }
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        if (this.isSelected) {
            ctx.fillStyle = '#00838f'
        } else {
            ctx.fillStyle = '#8fd5d5'
        }
        ctx.font = '32px/32px Arial'
        ctx.fillText(this.stage, this.position.x + this.shape.pivot.x, this.position.y + this.shape.bottom - 10)
        for (let i = 0; i < 3; i++) {
            if (i < this.stars) {
                resources.star_full.drawTile(ctx, this.position.x + i * 60 + 40, this.position.y + this.shape.bottom + 20, 0)
            } else {
                resources.star_empty.drawTile(ctx, this.position.x + i * 60 + 40, this.position.y + this.shape.bottom + 20, 0)
            }
        }
    }
}