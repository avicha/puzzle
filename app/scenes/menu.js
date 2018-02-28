import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import Button from '../../prime/ui/button'
import Maze from '../utils/maze'
import resources from '../resources'
import TWEEN from '../../prime/tween'

export default class Menu extends BaseScene {
    constructor(game) {
        super(game)
        game.opts.stageColor = '#8fd8ab'
        this.puzzle = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 60, 1, { text: '图 谜', fontColor: '#f5f5f5', fontSize: 100, lineHeight: 150, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage1Btn = this.addGameObject(new Button(this.game.renderStageZone.left + this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y - 100, 1, { text: '1. 还 原', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage2Btn = this.addGameObject(new Button(this.game.renderStageZone.right - this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y - 100, 1, { text: '2. 修 复', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage3Btn = this.addGameObject(new Button(this.game.renderStageZone.left + this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y, 1, { text: '3. 还 原', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage4Btn = this.addGameObject(new Button(this.game.renderStageZone.right - this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y, 1, { text: '4. 修 复', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage5Btn = this.addGameObject(new Button(this.game.renderStageZone.left + this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y + 100, 1, { text: '5. 还 原', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage6Btn = this.addGameObject(new Button(this.game.renderStageZone.right - this.game.renderStageZone.width / 4, this.game.renderStageZone.pivot.y + 100, 1, { text: '6. 修 复', fontColor: '#f5f5f5', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.on('tap', e => {
            switch (e.target) {
                case this.stage1Btn:
                    this.trigger('switchScene', 'stage1')
                    break
                case this.stage2Btn:
                    this.trigger('switchScene', 'stage2')
                    break
                case this.stage3Btn:
                    this.trigger('switchScene', 'stage3')
                    break
                case this.stage4Btn:
                    this.trigger('switchScene', 'stage4')
                    break
                case this.stage5Btn:
                    this.trigger('switchScene', 'stage5')
                    break
                case this.stage6Btn:
                    this.trigger('switchScene', 'stage6')
                    break
            }
        })
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.game.renderStageZone.left, this.game.renderStageZone.top)
        ctx.beginPath()
        ctx.fillStyle = '#78c69f'
        ctx.moveTo(0, 0.6 * this.game.renderStageZone.height)
        ctx.lineTo(0.55 * this.game.renderStageZone.width, 0.3 * this.game.renderStageZone.height)
        ctx.lineTo(0.6 * this.game.renderStageZone.width, 0.35 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, 0.5 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, this.game.renderStageZone.height)
        ctx.lineTo(0, this.game.renderStageZone.height)
        ctx.lineTo(0, 0.6 * this.game.renderStageZone.height)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = '#5fb696'
        ctx.moveTo(0, 0.8 * this.game.renderStageZone.height)
        ctx.lineTo(0.7 * this.game.renderStageZone.width, 0.5 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, 0.55 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, this.game.renderStageZone.height)
        ctx.lineTo(0, this.game.renderStageZone.height)
        ctx.lineTo(0, 0.8 * this.game.renderStageZone.height)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = '#309784'
        ctx.moveTo(0, 0.55 * this.game.renderStageZone.height)
        ctx.lineTo(0.4 * this.game.renderStageZone.width, 0.35 * this.game.renderStageZone.height)
        ctx.lineTo(0.55 * this.game.renderStageZone.width, 0.7 * this.game.renderStageZone.height)
        ctx.lineTo(0.85 * this.game.renderStageZone.width, 0.6 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, 0.65 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, this.game.renderStageZone.height)
        ctx.lineTo(0, this.game.renderStageZone.height)
        ctx.lineTo(0, 0.8 * this.game.renderStageZone.height)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = '#177e7a'
        ctx.moveTo(0, 0.8 * this.game.renderStageZone.height)
        ctx.lineTo(0.5 * this.game.renderStageZone.width, 0.65 * this.game.renderStageZone.height)
        ctx.lineTo(0.7 * this.game.renderStageZone.width, 0.8 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, 0.75 * this.game.renderStageZone.height)
        ctx.lineTo(this.game.renderStageZone.width, this.game.renderStageZone.height)
        ctx.lineTo(0, this.game.renderStageZone.height)
        ctx.lineTo(0, 0.8 * this.game.renderStageZone.height)
        ctx.fill()
        ctx.closePath()
        ctx.restore()
        super.draw(ctx)
    }
}