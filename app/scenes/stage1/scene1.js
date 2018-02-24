import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_1 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.chrysanthemum, resources.chrysanthemum_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.chrysanthemum, drawingPieceTexture: resources.chrysanthemum_piece, currentRow: 0, currentColumn: 0, steps: 10, name: 'scene1_1', nextScene: 'scene1_2', title: '菊  花', desc: '采 菊 东 篱 下，\n悠 然 见 南 山。\n  ——  陶渊明《饮酒·其五》' })
    }
}