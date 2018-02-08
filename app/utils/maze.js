export default class Maze {
    constructor(rows, columns) {
        this.rows = rows
        this.columns = columns
        this.ceils = []
        for (let i = 0; i < this.rows; i++) {
            this.ceils[i] = []
            for (let j = 0; j < this.columns; j++) {
                this.ceils[i][j] = {
                    row: i,
                    column: j,
                    walls: [true, true, true, true],
                    isVisited: false,
                    weight: Number.MAX_VALUE
                }
            }
        }
    }
    startAt(startRow, startColumn, openWall) {
        this.startPos = this.ceils[startRow][startColumn]
        this.startPos.weight = 0
        switch (openWall) {
            case 'up':
                this.startPos.walls[0] = false
                break
            case 'right':
                this.startPos.walls[1] = false
                break
            case 'down':
                this.startPos.walls[2] = false
                break
            case 'left':
                this.startPos.walls[3] = false
                break
        }
        return this
    }
    endAt(endRow, endColumn, openWall) {
        this.endPos = this.ceils[endRow][endColumn]
        switch (openWall) {
            case 'up':
                this.endPos.walls[0] = false
                break
            case 'right':
                this.endPos.walls[1] = false
                break
            case 'down':
                this.endPos.walls[2] = false
                break
            case 'left':
                this.endPos.walls[3] = false
                break
        }
        return this
    }
    make() {
        let totalCeilsCount = this.rows * this.columns
        let stack = []
        let current = this.ceils[0][0]
        current.isVisited = true
        stack.push(current)
        let visitedCeilsCount = 1
        while (visitedCeilsCount < totalCeilsCount) {
            let neighbours = []
            if (current.row && !this.ceils[current.row - 1][current.column].isVisited) {
                neighbours.push('up')
            }
            if (current.row < this.rows - 1 && !this.ceils[current.row + 1][current.column].isVisited) {
                neighbours.push('down')
            }
            if (current.column && !this.ceils[current.row][current.column - 1].isVisited) {
                neighbours.push('left')
            }
            if (current.column < this.columns - 1 && !this.ceils[current.row][current.column + 1].isVisited) {
                neighbours.push('right')
            }
            if (neighbours.length) {
                let direction = neighbours[Math.floor(Math.random() * neighbours.length)]
                let choose
                switch (direction) {
                    case 'up':
                        choose = this.ceils[current.row - 1][current.column]
                        choose.walls[2] = false
                        current.walls[0] = false
                        break
                    case 'down':
                        choose = this.ceils[current.row + 1][current.column]
                        choose.walls[0] = false
                        current.walls[2] = false
                        break
                    case 'left':
                        choose = this.ceils[current.row][current.column - 1]
                        choose.walls[1] = false
                        current.walls[3] = false
                        break
                    case 'right':
                        choose = this.ceils[current.row][current.column + 1]
                        choose.walls[3] = false
                        current.walls[1] = false
                        break
                }
                choose.isVisited = true
                visitedCeilsCount += 1
                current = choose
                stack.push(current)
            } else {
                current = stack.pop()
            }
        }
    }
    begin() {
        this.currentPos = this.startPos
    }
    resolve(startPos, endPos) {
        if (!(startPos.row === endPos.row && startPos.column === endPos.column)) {
            let neighbours = []
            let neighbour
            if (!startPos.walls[0] && startPos.row) {
                neighbour = this.ceils[startPos.row - 1][startPos.column]
                if (startPos.weight + 1 < neighbour.weight) {
                    neighbours.push(neighbour)
                }
            }
            if (!startPos.walls[1] && startPos.column < this.columns - 1) {
                neighbour = this.ceils[startPos.row][startPos.column + 1]
                if (startPos.weight + 1 < neighbour.weight) {
                    neighbours.push(neighbour)
                }
            }
            if (!startPos.walls[2] && startPos.row < this.rows - 1) {
                neighbour = this.ceils[startPos.row + 1][startPos.column]
                if (startPos.weight + 1 < neighbour.weight) {
                    neighbours.push(neighbour)
                }
            }
            if (!startPos.walls[3] && startPos.column) {
                neighbour = this.ceils[startPos.row][startPos.column - 1]
                if (startPos.weight + 1 < neighbour.weight) {
                    neighbours.push(neighbour)
                }
            }
            if (neighbours.length) {
                let weight = Number.MAX_VALUE
                neighbours.forEach(neighbour => {
                    neighbour.parent = startPos
                    neighbour.weight = startPos.weight + 1
                    let res = 1 + this.resolve(neighbour, endPos)
                    if (res < weight) {
                        weight = res
                    }
                })
                return weight
            } else {
                startPos.weight = -1
                return Number.MAX_VALUE
            }
        } else {
            return 0
        }
    }
    getResolveResult() {
        let stack = []
        let cursor = this.endPos
        while (cursor) {
            stack.push(cursor)
            cursor = cursor.parent
        }
        return stack.reverse()
    }
    moveUp() {
        if (this.currentPos.row) {
            this.currentPos = this.ceils[this.currentPos.row - 1][this.currentPos.column]
        }
    }
    moveDown() {
        if (this.currentPos.row < this.rows - 1) {
            this.currentPos = this.ceils[this.currentPos.row + 1][this.currentPos.column]
        }
    }
    moveLeft() {
        if (this.currentPos.column) {
            this.currentPos = this.ceils[this.currentPos.row][this.currentPos.column - 1]
        }
    }
    moveRight() {
        if (this.currentPos.column < this.columns - 1) {
            this.currentPos = this.ceils[this.currentPos.row][this.currentPos.column + 1]
        }
    }
}