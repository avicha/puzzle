import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_6 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_horse, resources.paper_horse_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_horse, drawingPieceTexture: resources.paper_horse_piece, currentRow: 2, currentColumn: 2, steps: 30, name: 'scene1_6', nextScene: 'stage2', title: '马 踏 飞 燕', desc: '作 品 栩 栩 如 生，跃 然 纸 上，\n用 时 十 八 个 小 时，十 万 多 刀 的 刻 制，\n正 是 来 自 蔚 县 的 手 工 匠 人。' })
    }
}