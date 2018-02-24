import Engine from 'prime/engine'
import Menu from 'app/scenes/menu'
import Stage from 'app/scenes/stage'
import Scene1_1 from 'app/scenes/stage1/scene1'
import Scene1_2 from 'app/scenes/stage1/scene2'
import Scene1_3 from 'app/scenes/stage1/scene3'
import Scene1_4 from 'app/scenes/stage1/scene4'
import Scene1_5 from 'app/scenes/stage1/scene5'
import Scene1_6 from 'app/scenes/stage1/scene6'
import Adapter from 'app/adapter'

let game = new Engine({ debug: false, stageScaleMode: 'cover', fps: 60, orientation: 'landscape' })
game.setStageSize(1780, 750)
Adapter.setStorage('scene1_1_active', true)
game.launch(Stage)
game.on('switchScene', (sceneName, ...args) => {
    game.pause()
    game._context.fillStyle = '#383838'
    game._context.fillRect(0, 0, game._canvas.width, game._canvas.height)
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
        case 'scene1_4':
            return game.launch(Scene1_4, ...args)
        case 'scene1_5':
            return game.launch(Scene1_5, ...args)
        case 'scene1_6':
            return game.launch(Scene1_6, ...args)
    }
})
game.on('error', ({ message, stack }) => {
    console.error(message)
})