import * as PIXI from 'pixi.js'

export class UI extends PIXI.Container {

    private scoreField: PIXI.Text
    private score: number

    constructor() {
        super()
        this.score = 0;
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#000000']
        })

        this.scoreField = new PIXI.Text(`Score : 0`, style)
        this.addChild(this.scoreField)
        this.scoreField.x = 300
        this.scoreField.y = 10
    }

    addScore(n: number) {
        this.score += n
        this.scoreField.text = `Score : ${this.score}`
    }
}