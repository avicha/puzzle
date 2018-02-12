import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_3 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.tree, resources.tree_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.tree, drawingPieceTexture: resources.tree_piece, steps: 30, name: 'scene1_3', nextScene: 'scene1_4', title: '大  树  🌳', desc: '' })
    }
}