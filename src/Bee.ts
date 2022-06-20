import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Bee extends PIXI.Sprite {

    game: Game
    private xspeed = 0
    private yspeed = 0

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = 0
        this.y = 225

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    update() {
        this.x += this.xspeed
        this.y += this.yspeed
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "ARROWLEFT":
                this.xspeed = -3
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 3
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -3
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 3
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}