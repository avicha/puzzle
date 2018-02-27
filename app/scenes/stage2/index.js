import StageSelectorScene from '../stage_selector'
import resources from '../../resources'

export default class StageSelector2 extends StageSelectorScene {
    static getResources() {
        return super.getResources().concat([resources.painting_flower_thumb, resources.painting_bedroom_thumb, resources.painting_mother_thumb, resources.painting_kiss_thumb, resources.painting_mona_lisa_thumb, resources.painting_cows_thumb])
    }
    constructor(game) {
        let stageData = {
            title: '修    复',
            desc: '把 沾 污 的 名 画 修 复 成 完 好 的 状 态',
            scenes: [{
                scene: 'scene2_1',
                stage: '2-1',
                texture: resources.painting_flower_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene2_2',
                stage: '2-2',
                texture: resources.painting_bedroom_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene2_3',
                stage: '2-3',
                texture: resources.painting_mother_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene2_4',
                stage: '2-4',
                texture: resources.painting_kiss_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene2_5',
                stage: '2-5',
                texture: resources.painting_mona_lisa_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene2_6',
                stage: '2-6',
                texture: resources.painting_cows_thumb,
                type: 'stageSelector'
            }]
        }
        super(game, stageData)
    }
}