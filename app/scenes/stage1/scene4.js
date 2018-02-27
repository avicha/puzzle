import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_4 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_shanxi, resources.paper_shanxi_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_shanxi, drawingPieceTexture: resources.paper_shanxi_piece, currentRow: 2, currentColumn: 2, steps: 20, name: 'scene1_4', nextScene: 'scene1_5', title: '新 娘 回 门', desc: '作 品 使 用 了 阴 阳 刻 混 合 的 技 巧，\n具 有 北 方 地 区 质 朴、粗 犷 的 风 格 特 点，\n反 映 了当 地 的 婚 嫁 习 俗。' })
    }
}