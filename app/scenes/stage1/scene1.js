import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_1 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.clock, resources.clock_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.clock, drawingPieceTexture: resources.clock_piece, steps: 10, name: 'scene1_1', nextScene: 'scene1_2', title: '时  钟  ⏰', desc: '三 更 灯 火 五 更 鸡，\n正 是 男 儿 读 书 时。\n  ——  颜真卿《劝学》' })
    }
}