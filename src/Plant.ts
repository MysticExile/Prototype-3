import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Plant extends PIXI.Sprite {

    game: Game
    private plantName: string
    private secondaryTexture: PIXI.Texture
    private tertiaryTexture: PIXI.Texture
    private primaryTexture: PIXI.Texture
    private isHit: boolean

    constructor(texture: PIXI.Texture, secondaryTexture: PIXI.Texture, tertiaryTexture: PIXI.Texture, game: Game) {
        super(texture);
        this.primaryTexture = texture;
        this.secondaryTexture = secondaryTexture;
        this.tertiaryTexture = tertiaryTexture;
        this.isHit = false;
        this.game = game;
        this.y = this.game.getRandomInt(0, 450);
        this.x = this.game.getRandomInt(800, 950);
        this.width = 50
        this.height = 70
    }

    setPlantName(plantName: string) {
        this.plantName = plantName;
    }

    getPlantName() {
        return this.plantName;
    }

    getIsHit() {
        return this.isHit;
    }

    hit(modulo: number) {
        if (modulo % 2 == 0) {
            this.texture = this.secondaryTexture;
            this.plantName = "Violet";
        }
        else {
            this.texture = this.tertiaryTexture;
            this.plantName = "Zonnebloem";
        }
        this.isHit = true;
    }

    update(delta: number) {
        this.x -= 2
        if (this.x <= -100) {
            this.isHit = true;
        }
    }
}