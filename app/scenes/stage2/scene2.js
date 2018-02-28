import Stage2 from './base'
import resources from '../../resources'

export default class Scene2_2 extends Stage2 {
    static getResources() {
        return super.getResources().concat([resources.painting_bedroom, resources.painting_bedroom_piece])
    }
    constructor(game) {
        super(game, { drawingTexture: resources.painting_bedroom, drawingPieceTexture: resources.painting_bedroom_piece, steps: 3, name: 'scene2_2', nextScene: 'scene2_3', title: '卧 室', desc: '这 幅 油 画 创 作 于 1888 年，\n描 绘 的 是 梵 高 在 阿 尔 勒 的 卧 室，\n现 藏 于 阿 姆 斯 特 丹 的 梵 高 博 物 馆。\n  ——  梵 高《 卧 室 》' })
    }
}