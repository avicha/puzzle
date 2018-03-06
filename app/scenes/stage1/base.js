import BaseScene from '../base'
import Sprite from '../../../prime/sprite'
import Button from '../../../prime/ui/button'
import Text from '../../../prime/ui/text'
import resources from '../../resources'
import DrawingPiece1 from '../../sprites/drawing_piece1'
import PassModal from '../../sprites/pass_modal'
import Adapter from '../../adapter'
import TWEEN from '../../../prime/tween'
import Rectangle from '../../../prime/rectangle'

export default class Stage1 extends BaseScene {
    static getResources() {
        return [resources.menu_btn, resources.score_star_empty, resources.score_star_full, resources.footprint]
    }
    constructor(game, opts) {
        super(game)
        Object.assign(this, opts)
        game.opts.stageColor = '#8fd5d5'
        this.menuBtn = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn, shape: new Rectangle(-20, -20, resources.menu_btn.sizeWidth + 40, resources.menu_btn.sizeHeight + 40) }))
        this.title = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 50, 1, { text: this.title, fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.CENTER, valign: Button.VALIGN.TOP, width: 240, height: 68, borderColor: '#fafafa', isFilled: true }))
        this.footprintIcon = this.addGameObject(new Sprite(this.game.renderStageZone.pivot.x - 80, this.game.renderStageZone.top + 150, 1, { texture: resources.footprint }))
        this.useStepsText = this.addGameObject(new Text(this.game.renderStageZone.pivot.x + 20, this.game.renderStageZone.top + 164, 1, { text: '0', fontColor: '#fafafa', fontSize: 32, lineHeight: 32, align: Text.ALIGN.LEFT, valign: Text.VALIGN.TOP }))
        this.drawing = this.addGameObject(new Sprite(game.renderStageZone.left + game.renderStageZone.width / 4 - this.drawingTexture.sizeWidth / 2, game.renderStageZone.bottom - this.drawingTexture.sizeHeight - 50, 1, { texture: this.drawingTexture }))
        this.level3Step = Math.ceil(this.steps * 1.5)
        this.level2Step = Math.ceil(this.steps * 2)
        this.passModal = this.addGameObject(new PassModal(this.game.renderStageZone.left, this.game.renderStageZone.top - this.game.renderStageZone.height, 1000, { title: `    关 卡  ${this.name.replace('scene','')}  完 成    \n================`, width: this.game.renderStageZone.width, height: this.game.renderStageZone.height, alpha: 0, visible: false, scene: this, steps: [this.level3Step, this.level2Step] }))
        this.initGame()
        Adapter.setStorage('last_stage_scene', this.name)
    }
    getHash(chessboard) {
        let hash = ''
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let number = chessboard[i][j]
                hash += number.toString()
            }
        }
        return hash
    }
    getChessboardScore(chessboard) {
        let score = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let number = chessboard[i][j]
                let correctRow = Math.floor(number / this.columns)
                let correctColumn = number % this.columns
                score += (Math.abs(correctRow - i) + Math.abs(correctColumn - j))
            }
        }
        return score
    }
    moveRandom() {
        let ceils = []
        let row = this.currentNode.row
        let column = this.currentNode.column
        let chessboard = this.currentNode.data
        if (row) {
            ceils.push({ row: row - 1, column: column })
        }
        if (row < this.rows - 1) {
            ceils.push({ row: row + 1, column: column })
        }
        if (column) {
            ceils.push({ row: row, column: column - 1 })
        }
        if (column < this.columns - 1) {
            ceils.push({ row: row, column: column + 1 })
        }
        let chooseCeils = []
        let maxScore = 0
        ceils.forEach(ceil => {
            let tmp = chessboard[ceil.row][ceil.column]
            chessboard[ceil.row][ceil.column] = chessboard[row][column]
            chessboard[row][column] = tmp
            let hash = this.getHash(chessboard)
            let score
            if (this.chessboardHash[hash]) {
                score = -1
            } else {
                score = this.getChessboardScore(chessboard)
            }
            if (score == maxScore) {
                chooseCeils.push(ceil)
            }
            if (score > maxScore) {
                maxScore = score
                chooseCeils = [ceil]
            }
            chessboard[row][column] = chessboard[ceil.row][ceil.column]
            chessboard[ceil.row][ceil.column] = tmp
        })
        let chooseCeil
        if (chooseCeils.length) {
            chooseCeil = chooseCeils[Math.floor(Math.random() * chooseCeils.length)]
            let nextNodeData = this.cloneChessBoard(chessboard)
            let tmp = nextNodeData[chooseCeil.row][chooseCeil.column]
            nextNodeData[chooseCeil.row][chooseCeil.column] = nextNodeData[row][column]
            nextNodeData[row][column] = tmp
            let hash = this.getHash(nextNodeData)
            this.chessboardHash[hash] = true
            let nextNode = {
                data: nextNodeData,
                score: maxScore,
                row: chooseCeil.row,
                column: chooseCeil.column,
                parent: this.currentNode
            }
            this.currentNode = nextNode

        } else {
            if (this.currentNode.parent) {
                this.currentNode = this.currentNode.parent
            }
        }
        if (this.currentNode.score > this.currentScore) {
            this.chessboard = this.currentNode.data
            this.currentScore = this.currentNode.score
            this.currentRow = this.currentNode.row
            this.currentColumn = this.currentNode.column
        }
    }
    moveCeil(direction) {
        if (!this.isGameOver) {
            switch (direction) {
                case 'up':
                    if (this.currentRow < this.rows - 1) {
                        let tmp = this.chessboard[this.currentRow + 1][this.currentColumn]
                        this.chessboard[this.currentRow + 1][this.currentColumn] = this.chessboard[this.currentRow][this.currentColumn]
                        this.chessboard[this.currentRow][this.currentColumn] = tmp
                        this.currentRow++
                            this.ceilDoms[this.invisibleCeil].position.y += this.pieceHeight
                        let ceilDom = this.ceilDoms[tmp]
                        ceilDom.position.y -= this.pieceHeight
                    }
                    break
                case 'right':
                    if (this.currentColumn) {
                        let tmp = this.chessboard[this.currentRow][this.currentColumn - 1]
                        this.chessboard[this.currentRow][this.currentColumn - 1] = this.chessboard[this.currentRow][this.currentColumn]
                        this.chessboard[this.currentRow][this.currentColumn] = tmp
                        this.currentColumn--
                            this.ceilDoms[this.invisibleCeil].position.x -= this.pieceWidth
                        let ceilDom = this.ceilDoms[tmp]
                        ceilDom.position.x += this.pieceWidth
                    }
                    break
                case 'down':
                    if (this.currentRow) {
                        let tmp = this.chessboard[this.currentRow - 1][this.currentColumn]
                        this.chessboard[this.currentRow - 1][this.currentColumn] = this.chessboard[this.currentRow][this.currentColumn]
                        this.chessboard[this.currentRow][this.currentColumn] = tmp
                        this.currentRow--
                            this.ceilDoms[this.invisibleCeil].position.y -= this.pieceHeight
                        let ceilDom = this.ceilDoms[tmp]
                        ceilDom.position.y += this.pieceHeight
                    }
                    break
                case 'left':
                    if (this.currentColumn < this.columns - 1) {
                        let tmp = this.chessboard[this.currentRow][this.currentColumn + 1]
                        this.chessboard[this.currentRow][this.currentColumn + 1] = this.chessboard[this.currentRow][this.currentColumn]
                        this.chessboard[this.currentRow][this.currentColumn] = tmp
                        this.currentColumn++
                            this.ceilDoms[this.invisibleCeil].position.x += this.pieceWidth
                        let ceilDom = this.ceilDoms[tmp]
                        ceilDom.position.x -= this.pieceWidth
                    }
                    break
            }
            this.currentScore = this.getChessboardScore(this.chessboard)
            this.useSteps++
                this.useStepsText.setText(this.useSteps.toString())
            if (!this.currentScore) {
                this.isGameOver = true
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
                let lastCeil = this.ceilDoms[this.chessboard[this.currentRow][this.currentColumn]]
                lastCeil.visible = true
                lastCeil.alpha = 0
                let tween = new TWEEN.Tween(lastCeil).to({ alpha: 1 }, 1000).easing(TWEEN.Easing.Quadratic.In).delay(600).start()
                tween.onComplete(() => {
                    this.passModal.visible = true
                    new TWEEN.Tween(this.passModal.position).to({ y: this.game.renderStageZone.top }, 400).easing(TWEEN.Easing.Linear.None).start()
                    new TWEEN.Tween(this.passModal).to({ alpha: 1 }, 400).easing(TWEEN.Easing.Linear.None).start()
                })
            }
        }
    }
    cloneChessBoard(chessboard) {
        let clone = []
        for (let i = 0; i < this.rows; i++) {
            clone[i] = []
            for (let j = 0; j < this.columns; j++) {
                clone[i][j] = chessboard[i][j]
            }
        }
        return clone
    }
    initChessBoard() {
        this.chessboard = []
        this.columns = this.drawingPieceTexture.columns
        this.rows = this.drawingPieceTexture.rows
        this.chessboardHash = {}
        this.ceilDoms = []
        this.isGameOver = false
        this.useSteps = 0
        this.useStepsText.setText('0')
        for (let i = 0; i < this.rows; i++) {
            this.chessboard[i] = []
            for (let j = 0; j < this.columns; j++) {
                let tile = i * this.rows + j
                this.chessboard[i][j] = tile
            }
        }
        this.currentRow = this.rows - 1
        this.currentColumn = this.columns - 1
        this.invisibleCeil = this.currentRow * this.columns + this.currentColumn
        this.currentScore = this.getChessboardScore(this.chessboard)
        let hash = this.getHash(this.chessboard)
        this.chessboardHash[hash] = true
        this.currentNode = { data: this.chessboard, score: this.currentScore, row: this.currentRow, column: this.currentColumn, parent: null }
        for (let step = 0; step < this.steps; step++) {
            this.moveRandom()
        }
        delete this.chessboardHash
        delete this.currentNode
    }
    printChessBoard() {
        for (let i = 0; i < this.rows; i++) {
            let rowArr = []
            for (let j = 0; j < this.columns; j++) {
                rowArr.push(this.chessboard[i][j])
            }
            console.log(rowArr.toString())
        }
        console.log(`score:${this.currentScore}`)
    }
    renderChessBoard() {
        this.pieceBgBorderWidth = 4
        this.pieceWidth = this.drawingPieceTexture.sizeWidth + 2 * this.pieceBgBorderWidth
        this.pieceHeight = this.drawingPieceTexture.sizeHeight + 2 * this.pieceBgBorderWidth
        this.piecesBgWidth = this.columns * this.pieceWidth
        this.piecesBgHeight = this.rows * this.pieceHeight
        this.piecesBgPosX = this.game.renderStageZone.pivot.x + (this.game.renderStageZone.width / 2 - this.piecesBgWidth) / 2
        this.piecesBgPosY = this.game.renderStageZone.bottom - this.piecesBgHeight - 100
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let posX = this.piecesBgPosX + this.pieceBgBorderWidth + j * this.pieceWidth
                let posY = this.piecesBgPosY + this.pieceBgBorderWidth + i * this.pieceHeight
                let tile = this.chessboard[i][j]
                let drawingPiece = this.addGameObject(new DrawingPiece1(posX, posY, 1, { texture: this.drawingPieceTexture, tile: tile, visible: tile == this.invisibleCeil ? false : true }))
                this.ceilDoms[tile] = drawingPiece
            }
        }
    }
    initGame() {
        this.initChessBoard()
        this.printChessBoard()
        this.renderChessBoard()
        this.on('tap', e => {
            switch (e.target) {
                case this.menuBtn:
                    this.trigger('switchScene', 'stage1')
                    break
                case this.passModal.replayBtn:
                    this.ceilDoms.forEach(ceilDom => {
                        this.removeGameObject(ceilDom)
                    })
                    delete this.ceilDoms
                    this.initChessBoard()
                    this.printChessBoard()
                    this.renderChessBoard()
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
        })
        this.on('swipeUp', () => {
            this.moveCeil('up')
        })
        this.on('swipeRight', () => {
            this.moveCeil('right')
        })
        this.on('swipeDown', () => {
            this.moveCeil('down')
        })
        this.on('swipeLeft', () => {
            this.moveCeil('left')
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