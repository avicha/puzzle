import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import StageSelector from '../sprites/stage_selector'
import resources from '../resources'

export default class Stage extends BaseScene {
    static getResources() {
        return [resources.clock_thumb]
    }
    constructor(game) {
        super(game)
        this.enter()
        game.opts.stageColor = '#8fd5d5'
        this.title = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: '还    原', fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.desc = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 200, 1, { text: '苟 有 迷 惘 错 乱 ，终 归 岁 月 如 初', fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 30, lineHeight: 30, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage1 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 400, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.clock_thumb }))
        this.stage2 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 80, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.clock_thumb }))
        this.stage3 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x + 240, this.game.renderStageZone.pivot.y - 100, 1, { texture: resources.clock_thumb }))
        this.stage4 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 400, this.game.renderStageZone.pivot.y + 140, 1, { texture: resources.clock_thumb }))
        this.stage5 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 80, this.game.renderStageZone.pivot.y + 140, 1, { texture: resources.clock_thumb }))
        this.stage6 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x + 240, this.game.renderStageZone.pivot.y + 140, 1, { texture: resources.clock_thumb }))
        this.on('tap', e => {
            switch (e.target) {
                case this.stage1:
                    this.leave(() => {
                        this.trigger('switchScene', 'scene1')
                    })
            }
        })
    }
}