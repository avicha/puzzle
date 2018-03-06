import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_6 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_horse, resources.paper_horse_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_horse, drawingPieceTexture: resources.paper_horse_piece, currentRow: 2, currentColumn: 2, steps: 30, name: 'scene1-6', nextScene: 'stage2', title: '马 踏 飞 燕' })
    }
}