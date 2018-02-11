import BaseScene from '../base'
import Sprite from '../../../prime/sprite'
import Clock from '../../../prime/clock'
import Button from '../../../prime/ui/button'
import resources from '../../resources'
import DrawingPiece from '../../sprites/drawing_piece'
import Adapter from '../../adapter'
import utils from '../../utils/common'

export default class Stage1 extends BaseScene {
    static getResources() {
        return [resources.menu_btn]
    }
    constructor(game, { drawingTexture, drawingPieceTexture, steps, nextScene }) {
        super(game)
        this.enter(() => {
            this.clock.start()
        })
        this.drawingTexture = drawingTexture
        this.drawingPieceTexture = drawingPieceTexture
        this.steps = steps
        this.nextScene = nextScene
        game.opts.stageColor = '#8fd5d5'
        this.menu = this.addGameObject(new Sprite(game.renderStageZone.left + 50, game.renderStageZone.top + 50, 1, { texture: resources.menu_btn }))
        this.drawing = this.addGameObject(new Sprite(game.renderStageZone.left + game.renderStageZone.width / 4 - this.drawingTexture.sizeWidth / 2, game.renderStageZone.bottom - this.drawingTexture.sizeHeight - 100, 1, { texture: this.drawingTexture }))
        this.timeDom = this.addGameObject(new Button(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 50, 1, { text: `时 间  0`, fontSize: 28, lineHeight: 28, fontColor: '#8fd5d5', align: Button.ALIGN.CENTER, valign: Button.VALIGN.TOP, width: 240, height: 68, borderColor: '#fafafa', borderWidth: 4, isFilled: true }))
        this.initGame()
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
                            this.ceilDoms[this.total].position.y += this.pieceHeight
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
                            this.ceilDoms[this.total].position.x -= this.pieceWidth
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
                            this.ceilDoms[this.total].position.y -= this.pieceHeight
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
                            this.ceilDoms[this.total].position.x += this.pieceWidth
                        let ceilDom = this.ceilDoms[tmp]
                        ceilDom.position.x -= this.pieceWidth
                    }
                    break
            }
            this.currentScore = this.getChessboardScore(this.chessboard)
            if (!this.currentScore) {
                this.isGameOver = true
                this.clock.stop()
                Adapter.setTimeout(() => {
                    let elapsedTimeText = utils.formatDatetime(this.elapsedTime)
                    Adapter.alert({ title: '成功过关', content: `你花了${elapsedTimeText}秒完成了挑战!` })
                    if (this.nextScene) {
                        this.trigger('switchScene', this.nextScene)
                    }
                }, 2000)
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
        this.total = this.rows * this.columns - 1
        this.chessboardHash = {}
        this.ceilDoms = []
        this.elapsedTime = 0
        this.isGameOver = false
        for (let i = 0; i < this.rows; i++) {
            this.chessboard[i] = []
            for (let j = 0; j < this.columns; j++) {
                let tile = i * this.rows + j
                this.chessboard[i][j] = tile
            }
        }
        this.currentRow = this.rows - 1
        this.currentColumn = this.columns - 1
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
        this.piecesBgPosY = this.game.renderStageZone.bottom - this.piecesBgHeight - 150
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let posX = this.piecesBgPosX + this.pieceBgBorderWidth + j * this.pieceWidth
                let posY = this.piecesBgPosY + this.pieceBgBorderWidth + i * this.pieceHeight
                let tile = this.chessboard[i][j]
                let drawingPiece = this.addGameObject(new DrawingPiece(posX, posY, 1, { texture: this.drawingPieceTexture, tile: tile, visiable: tile == this.total ? false : true }))
                this.ceilDoms[tile] = drawingPiece
            }
        }
    }
    initGame() {
        this.initChessBoard()
        this.printChessBoard()
        this.renderChessBoard()
        this.clock = new Clock()
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
        this.clock.step()
        this.elapsedTime = this.clock.getElapsedTime()
        this.timeDom.setText(`时 间  ${utils.formatDatetime(this.elapsedTime)}`)
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