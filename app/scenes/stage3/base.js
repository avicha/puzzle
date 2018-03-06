import BaseScene from '../base'
import Sprite from '../../../prime/sprite'
import Button from '../../../prime/ui/button'
import Text from '../../../prime/ui/text'
import resources from '../../resources'
import DrawingPiece2 from '../../sprites/drawing_piece2'
import PassModal from '../../sprites/pass_modal'
import Adapter from '../../adapter'
import TWEEN from '../../../prime/tween'
import Rectangle from '../../../prime/rectangle'
import commonUtils from '../../utils/common'

export default class Stage3 extends BaseScene {
    static getResources() {
        return [resources.menu_btn, resources.ink, resources.score_star_empty, resources.score_star_full, resources.footprint]
    }
    constructor(game, opts) {
        super(game)
        Object.assign(this, opts)
        game.opts.stageColor = '#8fd5d5'
        resources.ink.sizeWidth = this.drawingTexture.sizeWidth
        resources.ink.sizeHeight = this.drawingTexture.sizeHeight
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn, shape: new Rectangle(-20, -20, resources.menu_btn.sizeWidth + 40, resources.menu_btn.sizeHeight + 40) }))
        this.title = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 50, 1, { text: this.title, fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.CENTER, valign: Button.VALIGN.TOP, width: 240, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.footprintIcon = this.addGameObject(new Sprite(this.game.renderStageZone.pivot.x - 80, this.game.renderStageZone.top + 150, 1, { texture: resources.footprint }))
        this.useStepsText = this.addGameObject(new Text(this.game.renderStageZone.pivot.x + 20, this.game.renderStageZone.top + 164, 1, { text: '0', fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.LEFT, valign: Text.VALIGN.TOP }))
        let n = this.drawingTexture.rows * this.drawingTexture.columns
        let level = commonUtils.factorial(n) / commonUtils.factorial(n - this.steps) / commonUtils.factorial(this.steps)
        this.level3Step = n + Math.ceil((level - 1) / 3)
        this.level2Step = n + Math.ceil((level - 1) * 2 / 3)
        this.passModal = this.addGameObject(new PassModal(this.game.renderStageZone.left, this.game.renderStageZone.top - this.game.renderStageZone.height, 1000, { title: `    关 卡  ${this.name.replace('scene','')}  完 成    \n================`, width: this.game.renderStageZone.width, height: this.game.renderStageZone.height, alpha: 0, visible: false, scene: this, steps: [this.level3Step, this.level2Step] }))
        this.initGame()
        Adapter.setStorage('last_stage_scene', this.name)
    }
    getChessboardScore(chessboard) {
        let score = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let touch = chessboard[i][j].touch % 2
                score += touch
            }
        }
        return score
    }
    randomChangeCeil() {
        if (this.untouchTiles.length) {
            let r = Math.floor(Math.random() * this.untouchTiles.length)
            let ceil = this.untouchTiles[r]
            let row = Math.floor(ceil / this.columns)
            let column = ceil % this.columns
            this.untouchTiles.splice(r, 1)
            let drawingPiece = this.drawing[row][column]
            drawingPiece.opacity = Math.abs(drawingPiece.opacity - 1)
            this.chessboard[row][column].touch++
                let drawingPieceTmp
            if (row) {
                drawingPieceTmp = this.drawing[row - 1][column]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (row < this.rows - 1) {
                drawingPieceTmp = this.drawing[row + 1][column]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (column) {
                drawingPieceTmp = this.drawing[row][column - 1]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (column < this.columns - 1) {
                drawingPieceTmp = this.drawing[row][column + 1]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    let opacity = this.drawing[i][j].opacity
                    let ink = this.inks[i][j]
                    this.chessboard[i][j].opacity = opacity
                    if (opacity) {
                        ink.alpha = 0.5
                        ink.scale.set(1, 1)
                    } else {
                        ink.alpha = 0
                        ink.scale.set(0.5, 0.5)
                    }
                }
            }
            this.currentScore = this.getChessboardScore(this.chessboard)
        }

    }
    changeCeil(row, column) {
        if (!this.isGameOver) {
            let drawingPiece = this.drawing[row][column]
            drawingPiece.opacity = Math.abs(drawingPiece.opacity - 1)
            this.chessboard[row][column].touch++
                let drawingPieceTmp
            if (row) {
                drawingPieceTmp = this.drawing[row - 1][column]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (row < this.rows - 1) {
                drawingPieceTmp = this.drawing[row + 1][column]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (column) {
                drawingPieceTmp = this.drawing[row][column - 1]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            if (column < this.columns - 1) {
                drawingPieceTmp = this.drawing[row][column + 1]
                drawingPieceTmp.opacity = Math.abs(drawingPieceTmp.opacity - 1)
            }
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.columns; j++) {
                    let opacity = this.drawing[i][j].opacity
                    let ink = this.inks[i][j]
                    this.chessboard[i][j].opacity = opacity
                    if (opacity && !ink.alpha) {
                        new TWEEN.Tween(ink).to({ alpha: 0.5 }, 400).easing(TWEEN.Easing.Linear.None).start()
                        new TWEEN.Tween(ink.scale).to({ x: 1, y: 1 }, 400).easing(TWEEN.Easing.Linear.None).start()
                    }
                    if (!opacity && ink.alpha) {
                        new TWEEN.Tween(ink).to({ alpha: 0 }, 400).easing(TWEEN.Easing.Linear.None).start()
                        new TWEEN.Tween(ink.scale).to({ x: 0.5, y: 0.5 }, 400).easing(TWEEN.Easing.Linear.None).start()
                    }
                }
            }
            this.currentScore = this.getChessboardScore(this.chessboard)
            this.useSteps++
                this.useStepsText.setText(this.useSteps.toString())
            if (!this.currentScore) {
                let stars = 1
                if (this.useSteps < this.level3Step) {
                    stars = 3
                } else {
                    if (this.useSteps < this.level2Step) {
                        stars = 2
                    } else {
                        stars = 1
                    }
                }
                let lastStar = Adapter.getStorage(`${this.name}_stars`, 0)
                let lastScore = Adapter.getStorage(`${this.name}_score`, 0)
                if (!lastScore || this.useSteps < lastScore) {
                    Adapter.setStorage(`${this.name}_score`, this.useSteps)
                }
                if (stars > lastStar) {
                    Adapter.setStorage(`${this.name}_stars`, stars)
                }
                this.passModal.setScore(this.useSteps, lastScore)
                this.passModal.visible = true
                new TWEEN.Tween(this.passModal.position).to({ y: this.game.renderStageZone.top }, 400).easing(TWEEN.Easing.Linear.None).delay(1000).start()
                new TWEEN.Tween(this.passModal).to({ alpha: 1 }, 400).easing(TWEEN.Easing.Linear.None).delay(1000).start()
            }
        }
    }
    initChessBoard() {
        this.drawing = []
        this.chessboard = []
        this.inks = []
        this.untouchTiles = []
        this.columns = this.drawingTexture.columns
        this.rows = this.drawingTexture.rows
        this.isGameOver = false
        this.useSteps = 0
        this.useStepsText.setText('0')
        let posDrawingLeft = this.game.renderStageZone.left + this.game.renderStageZone.width / 4 - this.drawingTexture.sizeWidth * this.drawingTexture.columns / 2
        let posDrawingTop = this.game.renderStageZone.bottom - this.drawingTexture.height - 50
        let pieceBgBorderWidth = 4
        let pieceWidth = this.drawingPieceTexture.sizeWidth + 2 * pieceBgBorderWidth
        let pieceHeight = this.drawingPieceTexture.sizeHeight + 2 * pieceBgBorderWidth
        this.piecesBgWidth = this.columns * pieceWidth
        this.piecesBgHeight = this.rows * pieceHeight
        this.piecesBgPosX = this.game.renderStageZone.pivot.x + (this.game.renderStageZone.width / 2 - this.piecesBgWidth) / 2
        this.piecesBgPosY = this.game.renderStageZone.bottom - this.piecesBgHeight - 100
        for (let i = 0; i < this.rows; i++) {
            this.drawing[i] = []
            this.chessboard[i] = []
            this.inks[i] = []
            for (let j = 0; j < this.columns; j++) {
                let tile = i * this.rows + j
                this.untouchTiles.push(tile)
                this.drawing[i][j] = this.addGameObject(new Sprite(posDrawingLeft + j * this.drawingTexture.sizeWidth, posDrawingTop + i * this.drawingTexture.sizeHeight, 1, { texture: this.drawingTexture, tile: tile, opacity: 0 }))
                this.inks[i][j] = this.addGameObject(new Sprite(posDrawingLeft + j * this.drawingTexture.sizeWidth, posDrawingTop + i * this.drawingTexture.sizeHeight, 2, { texture: resources.ink, alpha: 1 }))
                let posX = this.piecesBgPosX + pieceBgBorderWidth + j * pieceWidth
                let posY = this.piecesBgPosY + pieceBgBorderWidth + i * pieceHeight
                let drawingPiece = this.addGameObject(new DrawingPiece2(posX, posY, 1, { texture: this.drawingPieceTexture, tile: tile, opacity: 0, touch: 0, type: 'DrawingPiece' }))
                this.chessboard[i][j] = drawingPiece
            }
        }
        for (let step = 0; step < this.steps; step++) {
            this.randomChangeCeil()
        }
        this.currentScore = this.getChessboardScore(this.chessboard)
    }
    printChessBoard() {
        for (let i = 0; i < this.rows; i++) {
            let rowArr = []
            for (let j = 0; j < this.columns; j++) {
                rowArr.push(this.chessboard[i][j].touch)
            }
            console.log(rowArr.toString())
        }
        console.log(`score:${this.currentScore}`)
    }
    initGame() {
        this.initChessBoard()
        this.printChessBoard()
        this.on('tap', e => {
            switch (e.target) {
                case this.menuBtn:
                    this.trigger('switchScene', 'stage3')
                    break
                case this.passModal.replayBtn:
                    for (let i = 0; i < this.rows; i++) {
                        for (let j = 0; j < this.columns; j++) {
                            this.removeGameObject(this.drawing[i][j])
                            this.removeGameObject(this.inks[i][j])
                            this.removeGameObject(this.chessboard[i][j])
                        }
                    }
                    delete this.drawing
                    delete this.inks
                    delete this.chessboard
                    this.initChessBoard()
                    this.printChessBoard()
                    new TWEEN.Tween(this.passModal.position).to({ y: this.game.renderStageZone.top - this.game.renderStageZone.height }, 400).easing(TWEEN.Easing.Linear.None).start().onComplete(() => {
                        this.passModal.visible = false
                    })
                    new TWEEN.Tween(this.passModal).to({ alpha: 0 }, 400).easing(TWEEN.Easing.Linear.None).start()
                    break
                case this.passModal.nextBtn:
                    if (this.nextScene) {
                        Adapter.setStorage(`${this.nextScene}_active`, true)
                        this.trigger('switchScene', this.nextScene)
                    }
                    break
            }
            if (e.target && e.target.type == 'DrawingPiece') {
                let row = Math.floor(e.target.tile / this.columns)
                let column = e.target.tile % this.columns
                this.changeCeil(row, column)
            }
        })
    }
    update(dt) {
        super.update(dt)
    }
    draw(ctx) {
        ctx.fillStyle = '#f5ead6'
        ctx.fillRect(this.piecesBgPosX - 10, this.piecesBgPosY - 10, this.piecesBgWidth + 20, this.piecesBgHeight + 20)
        ctx.strokeStyle = '#ffcc80'
        ctx.lineWidth = 10
        ctx.strokeRect(this.piecesBgPosX - 15, this.piecesBgPosY - 15, this.piecesBgWidth + 30, this.piecesBgHeight + 30)
        super.draw(ctx)
    }
}