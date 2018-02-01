import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import resources from '../resources'
import DrawingPiece from '../sprites/drawing_piece'
import Adapter from '../adapter'

export default class Scene1 extends Scene {
    static getResources() {
        return [resources.clock, resources.clock_piece]
    }
    constructor(game) {
        super()
        this.game = game
        game.opts.stageColor = '#8fd5d5'
        this.chessboard = []
        this.columns = 3
        this.rows = 3
        this.total = this.rows * this.columns - 1
        this.steps = 30
        this.prev = null
        this.ceil_doms = []
        this.elapsed_time = 0
        this.tick = 0
        this.is_game_over = false
        this.drawing = this.addGameObject(new Sprite(game.renderStageZone.left + game.renderStageZone.width / 4 - resources.clock.sizeWidth / 2, game.renderStageZone.pivot.y - resources.clock.sizeHeight / 2, 1, { texture: resources.clock }))
        this.initGame()
        this.on('swipeUp', () => {
            this.move_ceil('up')
        })
        this.on('swipeRight', () => {
            this.move_ceil('right')
        })
        this.on('swipeDown', () => {
            this.move_ceil('down')
        })
        this.on('swipeLeft', () => {
            this.move_ceil('left')
        })
    }
    getScore() {
        let score = 0
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let number = this.chessboard[i][j]
                let correct_row = Math.floor(number / this.columns)
                let correct_column = number % this.columns
                score += (Math.abs(correct_row - i) + Math.abs(correct_column - j))
            }
        }
        return score
    }
    move_random() {
        let ceils = []
        if (this.currentRow) {
            ceils.push({ row: this.currentRow - 1, column: this.currentColumn })
        }
        if (this.currentRow < this.rows - 1) {
            ceils.push({ row: this.currentRow + 1, column: this.currentColumn })
        }
        if (this.currentColumn) {
            ceils.push({ row: this.currentRow, column: this.currentColumn - 1 })
        }
        if (this.currentColumn < this.columns - 1) {
            ceils.push({ row: this.currentRow, column: this.currentColumn + 1 })
        }
        if (this.prev) {
            ceils = ceils.filter(ceil => {
                return ceil.row != this.prev.row && ceil.column != this.prev.column
            })
        }
        let max_score = this.getScore(this.chessboard)
        let choose_ceils = []
        ceils.forEach(ceil => {
            let tmp = this.chessboard[ceil.row][ceil.column]
            this.chessboard[ceil.row][ceil.column] = this.chessboard[this.currentRow][this.currentColumn]
            this.chessboard[this.currentRow][this.currentColumn] = tmp
            let score = this.getScore(this.chessboard)
            if (score == max_score) {
                choose_ceils.push(ceil)
            }
            if (score > max_score) {
                max_score = score
                choose_ceils = [ceil]
            }
            this.chessboard[this.currentRow][this.currentColumn] = this.chessboard[ceil.row][ceil.column]
            this.chessboard[ceil.row][ceil.column] = tmp
        })
        let choose_ceil
        if (choose_ceils.length) {
            choose_ceil = choose_ceils[Math.floor(Math.random() * choose_ceils.length)]
        } else {
            choose_ceil = {
                row: this.prev.row,
                column: this.prev.column
            }
        }
        let tmp = this.chessboard[choose_ceil.row][choose_ceil.column]
        this.chessboard[choose_ceil.row][choose_ceil.column] = this.chessboard[this.currentRow][this.currentColumn]
        this.chessboard[this.currentRow][this.currentColumn] = tmp
        this.prev = {
            row: this.currentRow,
            column: this.currentColumn
        }
        this.currentRow = choose_ceil.row
        this.currentColumn = choose_ceil.column
    }
    init_chess_board() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let tile = i * this.rows + j
                if (!j) {
                    this.chessboard[i] = []
                }
                this.chessboard[i][j] = tile
            }
        }
        this.currentRow = this.rows - 1
        this.currentColumn = this.columns - 1
        this.prev = null
        for (let i = 0; i < this.steps; i++) {
            this.move_random()
        }
        this.elapsed_time = 0
        this.is_game_over = false
    }
    print_chess_board() {
        for (let i = 0; i < this.rows; i++) {
            let row_arr = []
            for (let j = 0; j < this.columns; j++) {
                row_arr.push(this.chessboard[i][j])
            }
            console.log(row_arr.toString())
        }
        console.log(`score:${this.getScore(this.chessboard)}`)
    }
    render_chess_board() {
        this.pieceBorderWidth = 2
        this.pieceBgBorderWidth = 4
        this.pieceWidth = resources.clock_piece.sizeWidth + 2 * this.pieceBorderWidth
        this.pieceHeight = resources.clock_piece.sizeHeight + 2 * this.pieceBorderWidth
        this.piecesBgWidth = this.columns * this.pieceWidth + 2 * this.pieceBgBorderWidth
        this.piecesBgHeight = this.rows * this.pieceHeight + 2 * this.pieceBgBorderWidth
        this.piecesBgPosX = this.game.renderStageZone.pivot.x + (this.game.renderStageZone.width / 2 - this.piecesBgWidth) / 2
        this.piecesBgPosY = this.game.renderStageZone.top + (this.game.renderStageZone.height - this.piecesBgHeight) / 2
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let pos_x = this.game.renderStageZone.pivot.x + (this.game.renderStageZone.width / 2 - this.columns * this.pieceWidth) / 2 + j * this.pieceWidth + this.pieceBorderWidth
                let pos_y = this.game.renderStageZone.top + (this.game.renderStageZone.height - this.rows * this.pieceHeight) / 2 + i * this.pieceHeight + this.pieceBorderWidth
                let tile = this.chessboard[i][j]
                let drawingPiece = this.addGameObject(new DrawingPiece(pos_x, pos_y, 1, { tile: tile, visiable: tile == this.total ? false : true, borderWidth: this.pieceBorderWidth }))
                this.ceil_doms[tile] = drawingPiece
            }
        }
    }
    initGame() {
        this.init_chess_board()
        this.print_chess_board()
        this.render_chess_board()
        this.time_dom = this.addGameObject(new Text(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 50, 1, { text: this.elapsed_time.toFixed(2), fontSize: 28, lineHeight: 50, fontColor: '#f5ead6', align: Text.ALIGN.CENTER, valign: Text.VALIGN.TOP }))
        this.tick = Adapter.setInterval(() => {
            this.elapsed_time += 0.1
            this.time_dom.setText(this.elapsed_time.toFixed(2))
        }, 100)
    }
    move_ceil(direction) {
        switch (direction) {
            case 'up':
                if (this.currentRow < this.rows - 1) {
                    let tmp = this.chessboard[this.currentRow + 1][this.currentColumn]
                    this.chessboard[this.currentRow + 1][this.currentColumn] = this.chessboard[this.currentRow][this.currentColumn]
                    this.chessboard[this.currentRow][this.currentColumn] = tmp
                    this.currentRow++
                        this.ceil_doms[this.total].position.y += this.pieceHeight
                    let ceil_dom = this.ceil_doms[tmp]
                    ceil_dom.position.y -= this.pieceHeight
                }
                break
            case 'right':
                if (this.currentColumn) {
                    let tmp = this.chessboard[this.currentRow][this.currentColumn - 1]
                    this.chessboard[this.currentRow][this.currentColumn - 1] = this.chessboard[this.currentRow][this.currentColumn]
                    this.chessboard[this.currentRow][this.currentColumn] = tmp
                    this.currentColumn--
                        this.ceil_doms[this.total].position.x -= this.pieceWidth
                    let ceil_dom = this.ceil_doms[tmp]
                    ceil_dom.position.x += this.pieceWidth
                }
                break
            case 'down':
                if (this.currentRow) {
                    let tmp = this.chessboard[this.currentRow - 1][this.currentColumn]
                    this.chessboard[this.currentRow - 1][this.currentColumn] = this.chessboard[this.currentRow][this.currentColumn]
                    this.chessboard[this.currentRow][this.currentColumn] = tmp
                    this.currentRow--
                        this.ceil_doms[this.total].position.y -= this.pieceHeight
                    let ceil_dom = this.ceil_doms[tmp]
                    ceil_dom.position.y += this.pieceHeight
                }
                break
            case 'left':
                if (this.currentColumn < this.columns - 1) {
                    let tmp = this.chessboard[this.currentRow][this.currentColumn + 1]
                    this.chessboard[this.currentRow][this.currentColumn + 1] = this.chessboard[this.currentRow][this.currentColumn]
                    this.chessboard[this.currentRow][this.currentColumn] = tmp
                    this.currentColumn++
                        this.ceil_doms[this.total].position.x += this.pieceWidth
                    let ceil_dom = this.ceil_doms[tmp]
                    ceil_dom.position.x -= this.pieceWidth
                }
                break
        }
        if (!this.getScore()) {
            this.is_game_over = true
            Adapter.clearInterval(this.tick)
            Adapter.setTimeout(() => {
                let elapsed_time_text = this.elapsed_time.toFixed(2)
                Adapter.alert({ title: '挑战成功', content: `你花了${elapsed_time_text}秒完成了数字华容道的挑战!` })
            }, 2000)
        }
    }
    draw(ctx) {
        super.draw(ctx)
        ctx.beginPath()
        ctx.strokeStyle = '#70777f'
        ctx.lineWidth = 4
        ctx.moveTo(this.game.renderStageZone.pivot.x, this.game.renderStageZone.top + 100)
        ctx.lineTo(this.game.renderStageZone.pivot.x, this.game.renderStageZone.bottom - 100)
        ctx.stroke()
        ctx.strokeStyle = '#f5ead6'
        ctx.lineWidth = this.pieceBgBorderWidth
        ctx.strokeRect(this.piecesBgPosX, this.piecesBgPosY, this.piecesBgWidth, this.piecesBgHeight)
    }
}