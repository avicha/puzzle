import BaseScene from './base'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Rectangle from '../../prime/rectangle'
import Text from '../../prime/ui/text'
import Adapter from '../adapter'
import StageSelector from '../sprites/stage_selector'
import TWEEN from '../../prime/tween'
import resources from '../resources'

export default class StageSelectorScene extends BaseScene {
    static getResources() {
        return [resources.menu_btn, resources.stage_empty, resources.star_empty, resources.star_full]
    }
    constructor(game, stageData) {
        super(game)
        game.opts.stageColor = '#8fd5d5'
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn, shape: new Rectangle(-20, -20, resources.menu_btn.sizeWidth + 40, resources.menu_btn.sizeHeight + 40) }))
        let scenesNumber = stageData.scenes.length
        let sceneWidth = 240
        let scenesNumberPerPage = 4
        this.scenePerWidth = this.game.renderStageZone.width / scenesNumberPerPage
        let lastStageScene = Adapter.getStorage('last_stage_scene')
        let index = stageData.scenes.findIndex(sceneData => { return sceneData.scene == lastStageScene })
        this.currentPage = ~index ? Math.floor(index / scenesNumberPerPage) : 0
        this.pageCount = Math.floor((scenesNumber - 1) / scenesNumberPerPage)
        let scenesContainerOffsetX = -this.currentPage * this.game.renderStageZone.width + this.game.renderStageZone.left + (this.scenePerWidth - sceneWidth) / 2
        this.scenes = stageData.scenes.map((sceneData, sceneIndex) => {
            let active = Adapter.getStorage(`${sceneData.scene}_active`, true)
            let stars = Adapter.getStorage(`${sceneData.scene}_stars`, 0)
            let sceneX = scenesContainerOffsetX + sceneIndex * this.scenePerWidth
            return this.addGameObject(new StageSelector(sceneX, this.game.renderStageZone.pivot.y - 20, 1, { shape: new Rectangle(0, 0, 240, 240), stars, active, isSelected: sceneData.scene == lastStageScene, ...sceneData }))
        })
        this.title = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100, 1, { text: stageData.title, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 50, lineHeight: 50, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.desc = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 240, 1, { text: stageData.desc, fontColor: '#f5f5f5', fontWeight: 'normal', fontSize: 30, lineHeight: 30, align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
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
        this.on('swipeLeft', () => {
            if (this.currentPage < this.pageCount) {
                this.currentPage++
            }
            let scenesContainerOffsetX = -this.currentPage * this.game.renderStageZone.width + this.game.renderStageZone.left + (this.scenePerWidth - sceneWidth) / 2
            this.scenes.forEach((stageSelector, sceneIndex) => {
                let sceneX = scenesContainerOffsetX + sceneIndex * this.scenePerWidth
                new TWEEN.Tween(stageSelector.position).to({ x: sceneX }, 400).easing(TWEEN.Easing.Quartic.Out).start()
            })
        })
        this.on('swipeRight', () => {
            if (this.currentPage) {
                this.currentPage--
            }
            let scenesContainerOffsetX = -this.currentPage * this.game.renderStageZone.width + this.game.renderStageZone.left + (this.scenePerWidth - sceneWidth) / 2
            this.scenes.forEach((stageSelector, sceneIndex) => {
                let sceneX = scenesContainerOffsetX + sceneIndex * this.scenePerWidth
                new TWEEN.Tween(stageSelector.position).to({ x: sceneX }, 400).easing(TWEEN.Easing.Quartic.Out).start()
            })
        })
        this.on('touchstart', e => {
            this.touchX = e.x
            this.touchY = e.y
        })
        this.on('touchmove', e => {
            let dx = e.x - this.touchX
            this.scenes.forEach((stageSelector, sceneIndex) => {
                stageSelector.position.x += dx
            })
            this.touchX = e.x
            this.touchY = e.y
        })
    }
    draw(ctx) {
        super.draw(ctx)
        let offsetX = this.game.renderStageZone.pivot.x - (this.pageCount + 1) * 100 / 2
        for (let i = 0; i <= this.pageCount; i++) {
            if (i == this.currentPage) {
                ctx.fillStyle = '#00838f'
            } else {
                ctx.fillStyle = '#f5f5f5'
            }
            ctx.fillRect(offsetX + 100 * i + 10, this.game.renderStageZone.bottom - 40, 80, 10)
        }
    }
}