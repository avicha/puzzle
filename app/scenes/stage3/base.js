import BaseScene from '../base'
import Sprite from '../../../prime/sprite'
import Button from '../../../prime/ui/button'
import Text from '../../../prime/ui/text'
import resources from '../../resources'
import DrawingCanvas from '../../sprites/drawing_canvas'
import PassModal from '../../sprites/pass_modal'
import Adapter from '../../adapter'
import TWEEN from '../../../prime/tween'
import Rectangle from '../../../prime/rectangle'


export default class Stage3 extends BaseScene {
    static getResources() {
        return [resources.menu_btn, resources.score_star_empty, resources.score_star_full, resources.footprint]
    }
    constructor(game, opts) {
        super(game)
        Object.assign(this, opts)
        game.opts.stageColor = '#8fd5d5'
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn, shape: new Rectangle(-20, -20, resources.menu_btn.sizeWidth + 40, resources.menu_btn.sizeHeight + 40) }))
        // this.title = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 50, 1, { text: this.title, fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.CENTER, valign: Button.VALIGN.TOP, width: 240, height: 68, borderColor: '#fafafa', isFilled: true }))
        // this.footprintIcon = this.addGameObject(new Sprite(this.game.renderStageZone.pivot.x - 80, this.game.renderStageZone.top + 150, 1, { texture: resources.footprint }))
        // this.useStepsText = this.addGameObject(new Text(this.game.renderStageZone.pivot.x + 20, this.game.renderStageZone.top + 164, 1, { text: '0', fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.LEFT, valign: Text.VALIGN.TOP }))
        this.drawing = this.addGameObject(new Sprite(game.renderStageZone.left + (game.renderStageZone.width - 200) / 4 - this.drawingTexture.sizeWidth / 2, game.renderStageZone.bottom - this.drawingTexture.sizeHeight, 1, { texture: this.drawingTexture }))
        this.patternSprites = []
        this.addPatterns()
        this.drawingCanvas = this.addGameObject(new DrawingCanvas(this.game.renderStageZone.right - 200 - ((this.game.renderStageZone.width - 200) / 2 - 360) / 2 - 360, this.game.renderStageZone.bottom - 360 - 60, 1, { shape: new Rectangle(0, 0, 360, 360) }))
        this.R180Btn = this.addGameObject(new Button(this.game.renderStageZone.right - 50, this.game.renderStageZone.bottom - 260, 1, { text: 'R180', fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.RIGHT, valign: Button.VALIGN.BOTTOM, width: 100, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.L120Btn = this.addGameObject(new Button(this.game.renderStageZone.right - 50, this.game.renderStageZone.bottom - 160, 1, { text: 'L120', fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.RIGHT, valign: Button.VALIGN.BOTTOM, width: 100, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.R120Btn = this.addGameObject(new Button(this.game.renderStageZone.right - 50, this.game.renderStageZone.bottom - 60, 1, { text: 'R120', fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.RIGHT, valign: Button.VALIGN.BOTTOM, width: 100, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.resetBtn = this.addGameObject(new Button(this.game.renderStageZone.right - 50, this.game.renderStageZone.bottom - 360, 1, { text: 'reset', fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.RIGHT, valign: Button.VALIGN.BOTTOM, width: 100, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.passModal = this.addGameObject(new PassModal(this.game.renderStageZone.left, this.game.renderStageZone.top - this.game.renderStageZone.height, 1000, { title: `    关 卡  ${this.name.replace('scene','')}  完 成    \n================`, width: this.game.renderStageZone.width, height: this.game.renderStageZone.height, alpha: 0, visible: false, scene: this, steps: [1, 2] }))
        this.initGame()
        Adapter.setStorage('last_stage_scene', this.name)
    }
    addPatterns() {
        this.patternSprites.forEach(patternSprite => {
            this.removeGameObject(patternSprite)
        })
        this.patterns.forEach((pattern, i) => {
            let posX
            let posY
            if (!i) {
                posX = this.game.renderStageZone.left + 200
                posY = this.game.renderStageZone.top + (this.drawing.position.y - this.game.renderStageZone.top - pattern.sizeHeight) / 2
            } else {
                posX = this.patternSprites[i - 1].position.x + this.patternSprites[i - 1].shape.width
                posY = this.game.renderStageZone.top + (this.drawing.position.y - this.game.renderStageZone.top - pattern.sizeHeight) / 2
            }
            this.patternSprites[i] = this.addGameObject(new Sprite(posX, posY, 2 + i, { texture: pattern, type: 'pattern' }))
        })
        this.maxPatternZ = 2 + this.patterns.length - 1
    }
    resetGame() {
        this.addPatterns()
        this.drawingCanvas.reset()
    }
    initGame() {
        this.on('tap', e => {
            switch (e.target) {
                case this.menuBtn:
                    this.trigger('switchScene', 'stage3')
                    break
                case this.passModal.nextBtn:
                    if (this.nextScene) {
                        Adapter.setStorage(`${this.nextScene}_active`, true)
                        this.trigger('switchScene', this.nextScene)
                    }
                    break
                case this.resetBtn:
                    this.resetGame()
                    break
                case this.R180Btn:
                    this.drawingCanvas.rotate(Math.PI)
                    break
                case this.L120Btn:
                    this.drawingCanvas.rotate(-2 * Math.PI / 3)
                    break
                case this.R120Btn:
                    this.drawingCanvas.rotate(2 * Math.PI / 3)
                    break
            }
        })
        this.on('touchstart', e => {
            if (e.target && e.target.type == 'pattern') {
                this.maxPatternZ++
                    this.changeGameObjectZ(e.target, this.maxPatternZ)
                this.touchX = e.x
                this.touchY = e.y
                this.currentPattern = e.target
            }
        })
        this.on('touchmove', e => {
            if (this.currentPattern) {
                let dx = e.x - this.touchX
                let dy = e.y - this.touchY
                this.currentPattern.position.addSelf(dx, dy)
                this.touchX = e.x
                this.touchY = e.y
            }
        })
        this.on('touchend', e => {
            if (this.currentPattern) {
                let dx = e.x - this.touchX
                let dy = e.y - this.touchY
                this.currentPattern.position.addSelf(dx, dy)
                if (this.currentPattern.collideWith(this.drawingCanvas)) {
                    this.drawingCanvas.addPattern(this.currentPattern.texture, this.currentPattern.position.sub(this.drawingCanvas.position))
                    this.removeGameObject(this.currentPattern)
                    this.patternSprites.splice(this.patternSprites.indexOf(this.currentPattern), 1)
                }
                this.currentPattern = null
            }
        })
    }
    update(dt) {
        super.update(dt)
    }
    draw(ctx) {
        ctx.strokeStyle = '#fafafa'
        ctx.lineWidth = 10
        ctx.strokeRect(this.drawingCanvas.position.x - 5, this.drawingCanvas.position.y - 5, this.drawingCanvas.shape.width + 10, this.drawingCanvas.shape.height + 10)
        super.draw(ctx)
    }
}