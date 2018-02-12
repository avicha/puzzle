import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_3 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.tree, resources.tree_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.tree, drawingPieceTexture: resources.tree_piece, steps: 3, name: 'scene1_3', nextScene: 'scene1_4', title: '桃  树  🌳', desc: '人 面 不 知 何 处 去，\n桃 花 依 旧 笑 春 风。\n  ——  崔护《题都城南庄》' })
    }
}