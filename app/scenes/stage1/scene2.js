import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_2 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_vase, resources.paper_vase_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_vase, drawingPieceTexture: resources.paper_vase_piece, currentRow: 2, currentColumn: 2, steps: 15, name: 'scene1-2', nextScene: 'scene1-3', title: '花 开 富 贵' })
    }
}