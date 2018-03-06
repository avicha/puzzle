import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_4 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_peacock, resources.paper_peacock_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_peacock, drawingPieceTexture: resources.paper_peacock_piece, currentRow: 2, currentColumn: 2, steps: 25, name: 'scene1-4', nextScene: 'scene1-5', title: '如 意 孔 雀' })
    }
}