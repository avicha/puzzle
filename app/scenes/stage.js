import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Rectangle from '../../prime/rectangle'
import Text from '../../prime/ui/text'
import Adapter from '../adapter'
import StageSelector from '../sprites/stage_selector'
import resources from '../resources'

export default class Stage extends BaseScene {
    static getResources() {
        return [resources.menu_btn, resources.tree_thumb, resources.clock_thumb, resources.bird_thumb, resources.stage_empty, resources.star_full, resources.star_empty]
    }
    constructor(game) {
        super(game)
        game.opts.stageColor = '#8fd5d5'
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn }))
        let stageData = {
            title: '还    原',
            desc: '把 错 乱 的 拼 图 回 到 最 初 的 状 态',
            scenes: [{
                scene: 'scene1_1',
                stage: '1-1',
                texture: resources.clock_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_2',
                stage: '1-2',
                texture: resources.bird_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_3',
                stage: '1-3',
                texture: resources.tree_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_4',
                stage: '1-4',
                texture: resources.tree_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_5',
                stage: '1-5',
                texture: resources.tree_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1_6',
                stage: '1-6',
                texture: resources.tree_thumb,
                type: 'stageSelector'
            }]
        }
        let scenesNumber = stageData.scenes.length
        let sceneWidth = 240
        let scenesNumberPerPage = scenesNumber < 4 ? scenesNumber : 4
        this.scenePerWidth = this.game.renderStageZone.width / scenesNumberPerPage
        let scenesContainerOffsetX = this.game.renderStageZone.left + (this.scenePerWidth - sceneWidth) / 2
        let activeScenesNumber = 0
        this.scenes = stageData.scenes.map((sceneData, sceneIndex) => {
            let active = Adapter.getStorage(`${sceneData.scene}_active`, false)
            if (active) {
                activeScenesNumber++
            }
            return this.addGameObject(new StageSelector(scenesContainerOffsetX + sceneIndex * this.scenePerWidth, this.game.renderStageZone.pivot.y - 20, 1, { shape: new Rectangle(0, 0, 240, 240), score: Adapter.getStorage(`${sceneData.scene}_score`, 0), active, ...sceneData }))
        })
        this.title = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: stageData.title, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.desc = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 240, 1, { text: stageData.desc, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 30, lineHeight: 30, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.rightBounding = this.game.renderStageZone.right
        this.leftBounding = scenesContainerOffsetX
        this.on('tap', e => {
            let nextScene
            switch (e.target) {
                case this.menuBtn:
                    nextScene = 'menu'
                    break
            }
            if (e.target && e.target.type == 'stageSelector') {
                if (e.target.active) {
                    nextScene = e.target.scene
                } else {
                    //还未解锁该关卡
                }
            }
            if (nextScene) {
                this.trigger('switchScene', nextScene)
            }
        })
        this.on('moveLeft', ({ dx }) => {
            let last = this.scenes[this.scenes.length - 1]
            if (last && last.position.x + this.scenePerWidth >= this.rightBounding) {
                if (last.position.x + this.scenePerWidth + dx < this.rightBounding) {
                    dx = this.rightBounding - (last.position.x + this.scenePerWidth)
                }
                this.scenes.forEach(stageSelector => {
                    stageSelector.position.x += dx
                })
            }
        })
        this.on('moveRight', ({ dx }) => {
            let first = this.scenes[0]
            if (first && first.position.x <= this.leftBounding) {
                if (first.position.x + dx > this.leftBounding) {
                    dx = this.leftBounding - first.position.x
                }
                this.scenes.forEach(stageSelector => {
                    stageSelector.position.x += dx
                })
            }
        })
    }
}