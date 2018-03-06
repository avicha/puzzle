import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import Button from '../../prime/ui/button'
import Maze from '../utils/maze'
import resources from '../resources'
import TWEEN from '../../prime/tween'

export default class Menu extends BaseScene {
    static getResources() {
        return [resources.game_title, resources.menu_item_bg]
    }
    constructor(game) {
        super(game)
        game.opts.stageColor = '#8fd8ab'
        this.puzzle = this.addGameObject(new Sprite(this.game.renderStageZone.pivot.x - resources.game_title.sizeWidth / 2, this.game.renderStageZone.top + 60, 1, { texture: resources.game_title }))

        this.stage1Btn = this.addGameObject(new Sprite(this.game.renderStageZone.left + 3 * this.game.renderStageZone.width / 12 - resources.menu_item_bg.sizeWidth / 2, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.menu_item_bg }))
        this.stage1Text = this.addGameObject(new Button(this.game.renderStageZone.left + 3 * this.game.renderStageZone.width / 12, this.game.renderStageZone.pivot.y - 60, 2, { text: '还 原', fontColor: '#ccc', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 120, height: 120 }))

        this.stage2Btn = this.addGameObject(new Sprite(this.game.renderStageZone.left + 4.5 * this.game.renderStageZone.width / 12 - resources.menu_item_bg.sizeWidth / 2, this.game.renderStageZone.pivot.y + 85, 1, { texture: resources.menu_item_bg }))
        this.stage2Text = this.addGameObject(new Button(this.game.renderStageZone.left + 4.5 * this.game.renderStageZone.width / 12, this.game.renderStageZone.pivot.y + 125, 2, { text: '修 复', fontColor: '#ccc', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 120, height: 120 }))

        this.stage3Btn = this.addGameObject(new Sprite(this.game.renderStageZone.left + 6 * this.game.renderStageZone.width / 12 - resources.menu_item_bg.sizeWidth / 2, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.menu_item_bg }))
        this.stage3Text = this.addGameObject(new Button(this.game.renderStageZone.left + 6 * this.game.renderStageZone.width / 12, this.game.renderStageZone.pivot.y - 60, 2, { text: '还 原', fontColor: '#ccc', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 120, height: 120 }))

        this.stage4Btn = this.addGameObject(new Sprite(this.game.renderStageZone.left + 7.5 * this.game.renderStageZone.width / 12 - resources.menu_item_bg.sizeWidth / 2, this.game.renderStageZone.pivot.y + 85, 1, { texture: resources.menu_item_bg }))
        this.stage4Text = this.addGameObject(new Button(this.game.renderStageZone.left + 7.5 * this.game.renderStageZone.width / 12, this.game.renderStageZone.pivot.y + 125, 2, { text: '修 复', fontColor: '#ccc', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 120, height: 120 }))

        this.stage5Btn = this.addGameObject(new Sprite(this.game.renderStageZone.left + 9 * this.game.renderStageZone.width / 12 - resources.menu_item_bg.sizeWidth / 2, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.menu_item_bg }))
        this.stage5Text = this.addGameObject(new Button(this.game.renderStageZone.left + 9 * this.game.renderStageZone.width / 12, this.game.renderStageZone.pivot.y - 60, 2, { text: '还 原', fontColor: '#ccc', fontSize: 32, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP, width: 120, height: 120 }))
        this.on('tap', e => {
            switch (e.target) {
                case this.stage1Text:
                    this.trigger('switchScene', 'stage1')
                    break
                case this.stage2Text:
                    this.trigger('switchScene', 'stage2')
                    break
                case this.stage3Text:
                    this.trigger('switchScene', 'stage3')
                    break
                case this.stage4Text:
                    this.trigger('switchScene', 'stage4')
                    break
                case this.stage5Text:
                    this.trigger('switchScene', 'stage5')
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
        ctx.beginPath()
        ctx.strokeStyle = '#757575'
        ctx.lineWidth = 4
        ctx.moveTo(this.stage1Btn.position.x + this.stage1Btn.texture.sizeWidth / 2, this.game.renderStageZone.top)
        ctx.lineTo(this.stage1Btn.position.x + this.stage1Btn.texture.sizeWidth / 2, this.stage1Btn.position.y)
        ctx.moveTo(this.stage1Btn.position.x + this.stage1Btn.texture.sizeWidth, this.stage1Btn.position.y + this.stage1Btn.texture.sizeHeight / 2)
        ctx.lineTo(this.stage2Btn.position.x, this.stage2Btn.position.y + this.stage2Btn.texture.sizeHeight / 2)
        ctx.moveTo(this.stage2Btn.position.x + this.stage2Btn.texture.sizeWidth, this.stage2Btn.position.y + this.stage2Btn.texture.sizeHeight / 2)
        ctx.lineTo(this.stage3Btn.position.x, this.stage3Btn.position.y + this.stage3Btn.texture.sizeHeight / 2)
        ctx.moveTo(this.stage3Btn.position.x + this.stage3Btn.texture.sizeWidth, this.stage3Btn.position.y + this.stage3Btn.texture.sizeHeight / 2)
        ctx.lineTo(this.stage4Btn.position.x, this.stage4Btn.position.y + this.stage4Btn.texture.sizeHeight / 2)
        ctx.moveTo(this.stage4Btn.position.x + this.stage4Btn.texture.sizeWidth, this.stage4Btn.position.y + this.stage4Btn.texture.sizeHeight / 2)
        ctx.lineTo(this.stage5Btn.position.x, this.stage5Btn.position.y + this.stage5Btn.texture.sizeHeight / 2)
        ctx.moveTo(this.stage5Btn.position.x + this.stage5Btn.texture.sizeWidth / 2, this.game.renderStageZone.top)
        ctx.lineTo(this.stage5Btn.position.x + this.stage5Btn.texture.sizeWidth / 2, this.stage5Btn.position.y)
        ctx.stroke()
        ctx.closePath()
    }
}