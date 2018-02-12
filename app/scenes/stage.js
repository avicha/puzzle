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
        this.enter()
        game.opts.stageColor = '#8fd5d5'
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn }))
        this.stages = []
        let stagesData = [{
            title: '还    原',
            desc: '把 错 乱 的 拼 图 回 到 最 初 的 状 态',
            scenes: [{
                scene: 'scene1_1',
                stage: '1-1',
                texture: resources.clock_thumb,
                type: 'stage_selector'
            }, {
                scene: 'scene1_2',
                stage: '1-2',
                texture: resources.bird_thumb,
                type: 'stage_selector'
            }, {
                scene: 'scene1_3',
                stage: '1-3',
                texture: resources.tree_thumb,
                type: 'stage_selector'
            }]
        }]
        for (let i = 0; i < stagesData.length; i++) {
            let stageData = stagesData[i]
            let scenesNumber = stageData.scenes.length
            let sceneWidth = 240
            let sceneGap = 120
            let scenesContainerOffsetX = (this.game.stageWidth - (scenesNumber * sceneWidth + (scenesNumber - 1) * sceneGap)) / 2
            let stagePageIndex = Math.floor(i / 3)
            let activeScenesNumber = 0
            let scenes = stageData.scenes.map((sceneData, sceneIndex) => {
                let active = Adapter.getStorage(`${sceneData.scene}_active`, false)
                if (active) {
                    activeScenesNumber++
                }
                return this.addGameObject(new StageSelector(stagePageIndex * this.game.stageWidth + scenesContainerOffsetX + sceneIndex * (sceneWidth + sceneGap), this.game.renderStageZone.pivot.y - 20, 1, { shape: new Rectangle(0, 0, 240, 240), score: Adapter.getStorage(`${sceneData.scene}_score`, 0), active, ...sceneData }))
            })
            let title = this.addGameObject(new Text(stagePageIndex * this.game.stageWidth + this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: stageData.title, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
            let desc = this.addGameObject(new Text(stagePageIndex * this.game.stageWidth + this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 240, 1, { text: stageData.desc, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 30, lineHeight: 30, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
            let stageObject = { title, desc, scenes }
            this.stages.push(stageObject)
        }
        let currentStage = 0
        let currentScene = 0
        for (let i = 0; i < this.stages.length; i++) {
            let scenes = this.stages[i].scenes
            for (let j = 0; j < scenes.length; j++) {
                if (!scenes[j].active) {
                    scenes[j].active = true
                    currentStage = i
                    currentScene = j
                    break
                    break
                }
            }
        }
        this.on('tap', e => {
            let nextScene
            switch (e.target) {
                case this.menuBtn:
                    nextScene = 'menu'
                    break
            }
            if (e.target && e.target.type == 'stage_selector') {
                if (e.target.active) {
                    nextScene = e.target.scene
                } else {
                    //还未解锁该关卡
                }
            }
            if (nextScene) {
                this.leave(() => {
                    this.trigger('switchScene', nextScene)
                })
            }
        })
    }
}