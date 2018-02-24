import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_2 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.tree, resources.tree_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.tree, drawingPieceTexture: resources.tree_piece, currentRow: 2, currentColumn: 0, steps: 20, name: 'scene1_2', nextScene: 'scene1_3', title: '桃  树', desc: '人 面 不 知 何 处 去，\n桃 花 依 旧 笑 春 风。\n  ——  崔护《题都城南庄》' })
    }
}