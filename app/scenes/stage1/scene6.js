import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_6 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.butterfly, resources.butterfly_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.butterfly, drawingPieceTexture: resources.butterfly_piece, currentRow: 3, currentColumn: 3, steps: 40, name: 'scene1_6', nextScene: 'scene2_1', title: '蝴  蝶', desc: '狂 随 柳 絮 有 时 见，\n舞 入 梨 花 何 处 寻。\n  ——  谢逸《咏蝴蝶》' })
    }
}