import StageSelectorScene from '../stage_selector'
import resources from '../../resources'

export default class StageSelector3 extends StageSelectorScene {
    static getResources() {
        return super.getResources().concat([resources.hexagram_thumb, resources.painting_bedroom_thumb, resources.painting_mother_thumb, resources.painting_kiss_thumb, resources.painting_mona_lisa_thumb, resources.painting_cows_thumb])
    }
    constructor(game) {
        let stageData = {
            title: '对    称',
            desc: '通 过 叠 加，复 制 等 操 作 重 现 对 称 图 案',
            scenes: [{
                scene: 'scene3-1',
                stage: '3-1',
                texture: resources.hexagram_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene3-2',
                stage: '3-2',
                texture: resources.painting_bedroom_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene3-3',
                stage: '3-3',
                texture: resources.painting_mother_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene3-4',
                stage: '3-4',
                texture: resources.painting_kiss_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene3-5',
                stage: '3-5',
                texture: resources.painting_mona_lisa_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene3-6',
                stage: '3-6',
                texture: resources.painting_cows_thumb,
                type: 'stageSelector'
            }]
        }
        super(game, stageData)
    }
}