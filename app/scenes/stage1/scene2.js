import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_2 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_happy, resources.paper_happy_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_happy, drawingPieceTexture: resources.paper_happy_piece, currentRow: 2, currentColumn: 2, steps: 10, name: 'scene1_2', nextScene: 'scene1_3', title: '喜 花', desc: '折 叠 是 剪 纸 技 术 中 的 基 本 手 法，\n常 用 于 制 作 左 右 对 称 的 喜 花，\n作 为 婚 嫁 喜 庆 装 饰 之 用。' })
    }
}