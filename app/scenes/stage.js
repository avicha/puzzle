import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Rectangle from '../../prime/rectangle'
import Text from '../../prime/ui/text'
import StageSelector from '../sprites/stage_selector'
import resources from '../resources'

export default class Stage extends BaseScene {
    static getResources() {
        return [resources.clock_thumb, resources.stage_empty, resources.star_full, resources.star_empty]
    }
    constructor(game) {
        super(game)
        this.enter()
        game.opts.stageColor = '#8fd5d5'
        this.title = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: '还    原', fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.desc = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 200, 1, { text: '把 错 乱 的 拼 图 回 到 最 初 的 状 态', fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 30, lineHeight: 30, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.stage1_1 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 480, this.game.renderStageZone.pivot.y - 20, 1, { texture: resources.clock_thumb, shape: new Rectangle(0, 0, 240, 240), stage: '1-1', score: 3 }))
        this.stage1_2 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x - 120, this.game.renderStageZone.pivot.y - 20, 1, { texture: resources.clock_thumb, shape: new Rectangle(0, 0, 240, 240), stage: '1-2', score: 1 }))
        this.stage1_3 = this.addGameObject(new StageSelector(this.game.renderStageZone.pivot.x + 240, this.game.renderStageZone.pivot.y - 20, 1, { texture: resources.clock_thumb, shape: new Rectangle(0, 0, 240, 240), stage: '1-3', score: 0 }))
        this.on('tap', e => {
            switch (e.target) {
                case this.stage1_1:
                    this.leave(() => {
                        this.trigger('switchScene', 'scene1_1')
                    })
            }
        })
    }
}