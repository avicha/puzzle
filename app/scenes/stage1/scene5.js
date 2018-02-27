import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_5 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_magpie, resources.paper_magpie_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_magpie, drawingPieceTexture: resources.paper_magpie_piece, currentRow: 2, currentColumn: 2, steps: 30, name: 'scene1_5', nextScene: 'scene1_6', title: '喜 鹊 登 梅', desc: '除 了 常 见 的 单 色 剪 纸，\n还 有 集 剪 和 画 一 体 的 绘 色 剪 纸，\n尤 以 河 北 蔚 县 剪 纸 为 代 表。' })
    }
}