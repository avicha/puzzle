import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_3 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_fish, resources.paper_fish_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_fish, drawingPieceTexture: resources.paper_fish_piece, currentRow: 2, currentColumn: 2, steps: 20, name: 'scene1-3', nextScene: 'scene1-4', title: '连 年 有 余' })
    }
}