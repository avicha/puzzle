import Stage1 from './base'
import resources from '../../resources'

export default class Scene1_1 extends Stage1 {
    static getResources() {
        return super.getResources().concat([resources.paper_dog, resources.paper_dog_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.paper_dog, drawingPieceTexture: resources.paper_dog_piece, currentRow: 2, currentColumn: 2, steps: 10, name: 'scene1_1', nextScene: 'scene1_2', title: '瑞 犬', desc: '剪 纸 是 中 国 的 一 种 民 间 艺 术，\n窗 花 是 贴 在 窗 户 上 装 饰 的 剪 纸，\n盛 行 于 中 国 北 方。' })
    }
}