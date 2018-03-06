import StageSelectorScene from '../stage_selector'
import resources from '../../resources'

export default class StageSelector1 extends StageSelectorScene {
    static getResources() {
        return super.getResources().concat([resources.paper_happy_thumb, resources.paper_vase_thumb, resources.paper_fish_thumb, resources.paper_peacock_thumb, resources.paper_magpie_thumb, resources.paper_horse_thumb])
    }
    constructor(game) {
        let stageData = {
            title: '还    原',
            desc: '把 错 乱 的 窗 花 回 到 最 初 的 状 态',
            scenes: [{
                scene: 'scene1-1',
                stage: '1-1',
                texture: resources.paper_happy_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1-2',
                stage: '1-2',
                texture: resources.paper_vase_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1-3',
                stage: '1-3',
                texture: resources.paper_fish_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1-4',
                stage: '1-4',
                texture: resources.paper_peacock_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1-5',
                stage: '1-5',
                texture: resources.paper_magpie_thumb,
                type: 'stageSelector'
            }, {
                scene: 'scene1-6',
                stage: '1-6',
                texture: resources.paper_horse_thumb,
                type: 'stageSelector'
            }]
        }
        super(game, stageData)
    }
}