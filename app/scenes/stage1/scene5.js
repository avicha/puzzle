import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_5 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_magpie, resources.paper_magpie_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_magpie, drawingPieceTexture: resources.paper_magpie_piece, currentRow: 2, currentColumn: 2, steps: 30, name: 'scene1-5', nextScene: 'scene1-6', title: '喜 鹊 登 梅' })
    }
}