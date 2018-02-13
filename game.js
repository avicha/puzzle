import Engine from 'prime/engine'
import Menu from 'app/scenes/menu'
import Stage from 'app/scenes/stage'
import Scene1_1 from 'app/scenes/stage1/scene1'
import Scene1_2 from 'app/scenes/stage1/scene2'
import Scene1_3 from 'app/scenes/stage1/scene3'
import Adapter from 'app/adapter'

let game = new Engine({ debug: false, stageScaleMode: 'cover', fps: 60, orientation: 'landscape' })
game.setStageSize(1780, 750)
Adapter.setStorage('scene1_1_active', true)
game.launch(Stage)
game.on('switchScene', (sceneName, ...args) => {
    game.pause()
    game._context.fillStyle = '#383838'
    game._context.fillRect(game.renderScreenZone.left, game.renderScreenZone.top, game.renderScreenZone.width, game.renderScreenZone.height)
    switch (sceneName) {
        case 'menu':
            return game.launch(Menu, ...args)
        case 'stage':
            return game.launch(Stage, ...args)
        case 'scene1_1':
            return game.launch(Scene1_1, ...args)
        case 'scene1_2':
            return game.launch(Scene1_2, ...args)
        case 'scene1_3':
            return game.launch(Scene1_3, ...args)
    }
})
game.on('error', ({ message, stack }) => {
    console.error(message)
})