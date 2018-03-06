import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_1 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_happy, resources.paper_happy_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_happy, drawingPieceTexture: resources.paper_happy_piece, currentRow: 2, currentColumn: 2, steps: 10, name: 'scene1-1', nextScene: 'scene1-2', title: '双 喜 临 门' })
    }
}