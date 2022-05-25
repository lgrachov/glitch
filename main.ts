namespace SpriteKind {
    export const Actor = SpriteKind.create()
    export const PlayerBullet = SpriteKind.create()
    export const SlowProjectile = SpriteKind.create()
    export const SlowPlayerBullet = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", true)
    sprites.setDataNumber(sprite, "Health", 2)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        if (Jumps >= 1) {
            mySprite.vy = -161
            Jumps += -1
        }
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        Time_Freeze = true
        info.changeLifeBy(-1)
        timer.after(4000, function () {
            Time_Freeze = false
        })
    }
})
sprites.onOverlap(SpriteKind.PlayerBullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 750)
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    otherSprite.startEffect(effects.disintegrate, 500)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        otherSprite.destroy(effects.disintegrate, 750)
    }
})
sprites.onOverlap(SpriteKind.SlowPlayerBullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 750)
    sprites.changeDataNumberBy(otherSprite, "Health", -1)
    otherSprite.startEffect(effects.disintegrate, 500)
    if (sprites.readDataNumber(otherSprite, "Health") == 0) {
        otherSprite.destroy(effects.disintegrate, 750)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        if (Bulllets > 0) {
            Bulllets += -1
            if (Direction == "L") {
                projectile = sprites.createProjectileFromSprite(img`
                    6 5 5 
                    7 . 5 
                    7 7 6 
                    `, mySprite, -80, 0)
                projectile.setKind(SpriteKind.PlayerBullet)
            } else if (Direction == "R") {
                projectile = sprites.createProjectileFromSprite(img`
                    6 5 5 
                    7 . 5 
                    7 7 6 
                    `, mySprite, 80, 0)
                projectile.setKind(SpriteKind.PlayerBullet)
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        Direction = "L"
    }
})
scene.onOverlapTile(SpriteKind.Actor, assets.tile`myTile34`, function (sprite, location) {
    color.FadeToBlack.startScreenEffect(1500)
    Game_Started = false
    timer.after(1750, function () {
        info.pauseCountup()
        tiles.destroySpritesOfKind(SpriteKind.Enemy)
        tiles.destroySpritesOfKind(SpriteKind.Projectile)
        tiles.destroySpritesOfKind(SpriteKind.SlowProjectile)
        tiles.setSmallTilemap(tilemap`level24`)
        for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
            if (Math.percentChance(30)) {
                tiles.setTileAt(value, assets.tile`myTile36`)
            }
        }
        color.clearFadeEffect()
    })
    timer.after(2000, function () {
        story.printText("SIMULATION OVER. You finished with a final time of " + info.getTimeElapsed() + " seconds.", 80, 69, 3, 0, story.TextSpeed.Slow)
        console.log("a")
    })
    timer.after(10000, function () {
        game.reset()
    })
})
scene.onHitWall(SpriteKind.Actor, function (sprite, location) {
    if (Game_Started) {
        if (mySprite.vy > 200) {
            scene.cameraShake(2, 200)
            info.changeLifeBy(-1)
            tiles.setTileAt(location, assets.tile`myTile36`)
            tiles.setWallAt(location, false)
        }
    }
})
scene.onOverlapTile(SpriteKind.Actor, assets.tile`myTile5`, function (sprite, location) {
    textSprite3.setText("Room 4")
    console.log("check")
    tiles.setSmallTilemap(tilemap`level21`)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(7)) {
            tiles.setTileAt(value, assets.tile`myTile25`)
        }
    }
    for (let value2 of tiles.getTilesByType(assets.tile`myTile25`)) {
        tiles.setWallAt(value2, true)
    }
    Variation()
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    controller.moveSprite(mySprite, 150, 0)
    mySprite.ay = 350
    if (sprites.readDataBoolean(mySprite2, "Alive?") == false) {
        mySprite2 = sprites.create(img`
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 4 7 7 4 1 1 
            7 4 4 7 7 4 4 7 
            7 4 3 7 7 3 4 7 
            7 3 3 7 7 3 3 7 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    } else {
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    }
    if (sprites.readDataBoolean(mySprite3, "Alive?") == false) {
        mySprite3 = sprites.create(img`
            7 3 3 7 7 3 3 7 
            7 4 3 7 7 3 4 7 
            7 4 4 7 7 4 4 7 
            1 1 4 7 7 4 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    } else {
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    }
    if (sprites.readDataBoolean(mySprite4, "Alive?") == false) {
        mySprite4 = sprites.create(img`
            7 7 7 1 1 1 1 1 
            3 4 4 1 1 1 1 1 
            3 3 4 4 1 1 1 1 
            7 7 7 7 7 7 1 1 
            7 7 7 7 7 7 1 1 
            3 3 4 4 1 1 1 1 
            3 4 4 1 1 1 1 1 
            7 7 7 1 1 1 1 1 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite4, assets.tile`myTile4`)
    } else {
        tiles.placeOnRandomTile(mySprite4, assets.tile`myTile4`)
    }
    mySprite5 = sprites.create(img`
        1 1 1 1 1 7 7 7 
        1 1 1 1 1 4 4 3 
        1 1 1 1 4 4 3 3 
        1 1 7 7 7 7 7 7 
        1 1 7 7 7 7 7 7 
        1 1 1 1 4 4 3 3 
        1 1 1 1 1 4 4 3 
        1 1 1 1 1 7 7 7 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(mySprite5, assets.tile`myTile29`)
    Jumps = 3
    Set_Colors()
})
function Variation () {
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(30)) {
            tiles.setTileAt(value, assets.tile`myTile36`)
        }
    }
}
controller.player2.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        for (let value3 of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setWallAt(value3, false)
        }
        for (let value4 of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setTileAt(value4, assets.tile`myTile`)
        }
        tiles.setSmallTilemap(tilemap`level13`)
        for (let value5 of tiles.getTilesByType(assets.tile`myTile`)) {
            if (Math.percentChance(7)) {
                tiles.setTileAt(value5, assets.tile`myTile25`)
            }
        }
        for (let value6 of tiles.getTilesByType(assets.tile`myTile25`)) {
            tiles.setWallAt(value6, true)
        }
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
        Variation()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Game_Started) {
        Direction = "R"
    }
})
sprites.onOverlap(SpriteKind.Actor, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Actor, SpriteKind.SlowProjectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeLifeBy(-1)
})
scene.onHitWall(SpriteKind.PlayerBullet, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    tiles.setWallAt(location, false)
})
scene.onOverlapTile(SpriteKind.Actor, assets.tile`myTile21`, function (sprite, location) {
    textSprite3.setText("Room 3")
    console.log("check")
    tiles.setSmallTilemap(tilemap`level19`)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(7)) {
            tiles.setTileAt(value, assets.tile`myTile25`)
        }
    }
    for (let value2 of tiles.getTilesByType(assets.tile`myTile25`)) {
        tiles.setWallAt(value2, true)
    }
    Variation()
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    controller.moveSprite(mySprite, 120, 0)
    mySprite.ay = 400
    if (sprites.readDataBoolean(mySprite2, "Alive?") == false) {
        mySprite2 = sprites.create(img`
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 4 7 7 4 1 1 
            7 4 4 7 7 4 4 7 
            7 4 3 7 7 3 4 7 
            7 3 3 7 7 3 3 7 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    } else {
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    }
    if (sprites.readDataBoolean(mySprite3, "Alive?") == false) {
        mySprite3 = sprites.create(img`
            7 3 3 7 7 3 3 7 
            7 4 3 7 7 3 4 7 
            7 4 4 7 7 4 4 7 
            1 1 4 7 7 4 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    } else {
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    }
    mySprite4 = sprites.create(img`
        7 7 7 1 1 1 1 1 
        3 4 4 1 1 1 1 1 
        3 3 4 4 1 1 1 1 
        7 7 7 7 7 7 1 1 
        7 7 7 7 7 7 1 1 
        3 3 4 4 1 1 1 1 
        3 4 4 1 1 1 1 1 
        7 7 7 1 1 1 1 1 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(mySprite4, assets.tile`myTile4`)
    Jumps = 3
    Set_Colors()
})
function Set_Colors () {
    color.setColor(1, color.rgb(15, 42, 63))
    color.setColor(2, color.rgb(32, 57, 79))
    color.setColor(3, color.rgb(246, 214, 189))
    color.setColor(4, color.rgb(195, 163, 138))
    color.setColor(5, color.rgb(153, 117, 119))
    color.setColor(6, color.rgb(129, 98, 113))
    color.setColor(7, color.rgb(78, 73, 95))
}
info.onLifeZero(function () {
    game.over(false, color.RotatePalette)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    tiles.setWallAt(location, false)
})
scene.onOverlapTile(SpriteKind.Actor, assets.tile`myTile32`, function (sprite, location) {
    five = 5
    textSprite3.setText("Room 5")
    console.log("check")
    tiles.setSmallTilemap(tilemap`level23`)
    for (let value of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(7)) {
            tiles.setTileAt(value, assets.tile`myTile25`)
        }
    }
    for (let value2 of tiles.getTilesByType(assets.tile`myTile25`)) {
        tiles.setWallAt(value2, true)
    }
    Variation()
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    controller.moveSprite(mySprite, 150, 0)
    mySprite.ay = 350
    if (sprites.readDataBoolean(mySprite2, "Alive?") == false) {
        mySprite2 = sprites.create(img`
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 4 7 7 4 1 1 
            7 4 4 7 7 4 4 7 
            7 4 3 7 7 3 4 7 
            7 3 3 7 7 3 3 7 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    } else {
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    }
    if (sprites.readDataBoolean(mySprite3, "Alive?") == false) {
        mySprite3 = sprites.create(img`
            7 3 3 7 7 3 3 7 
            7 4 3 7 7 3 4 7 
            7 4 4 7 7 4 4 7 
            1 1 4 7 7 4 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    } else {
        tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    }
    if (sprites.readDataBoolean(mySprite4, "Alive?") == false) {
        mySprite4 = sprites.create(img`
            7 7 7 1 1 1 1 1 
            3 4 4 1 1 1 1 1 
            3 3 4 4 1 1 1 1 
            7 7 7 7 7 7 1 1 
            7 7 7 7 7 7 1 1 
            3 3 4 4 1 1 1 1 
            3 4 4 1 1 1 1 1 
            7 7 7 1 1 1 1 1 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite4, assets.tile`myTile4`)
    } else {
        tiles.placeOnRandomTile(mySprite4, assets.tile`myTile4`)
    }
    if (sprites.readDataBoolean(mySprite5, "Alive?") == false) {
        mySprite5 = sprites.create(img`
            1 1 1 1 1 7 7 7 
            1 1 1 1 1 4 4 3 
            1 1 1 1 4 4 3 3 
            1 1 7 7 7 7 7 7 
            1 1 7 7 7 7 7 7 
            1 1 1 1 4 4 3 3 
            1 1 1 1 1 4 4 3 
            1 1 1 1 1 7 7 7 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite5, assets.tile`myTile29`)
    } else {
        tiles.placeOnRandomTile(mySprite5, assets.tile`myTile29`)
    }
    Jumps = 3
    Set_Colors()
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", false)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    sprites.setDataBoolean(sprite, "Alive?", false)
})
function Shooty () {
    if (five == 5) {
        if (sprites.readDataBoolean(mySprite2, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite2, 0, -120)
            timer.after(250, function () {
                projectile2 = sprites.createProjectileFromSprite(img`
                    5 5 5 
                    6 6 6 
                    7 7 7 
                    `, mySprite2, 0, -120)
            })
        }
        if (sprites.readDataBoolean(mySprite3, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite3, 0, 120)
            timer.after(250, function () {
                projectile2 = sprites.createProjectileFromSprite(img`
                    5 5 5 
                    6 6 6 
                    7 7 7 
                    `, mySprite2, 0, 120)
            })
        }
        if (sprites.readDataBoolean(mySprite4, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite4, 120, 0)
            timer.after(250, function () {
                projectile2 = sprites.createProjectileFromSprite(img`
                    5 5 5 
                    6 6 6 
                    7 7 7 
                    `, mySprite2, 120, 0)
            })
        }
        if (sprites.readDataBoolean(mySprite5, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite5, -120, 0)
            timer.after(250, function () {
                projectile2 = sprites.createProjectileFromSprite(img`
                    5 5 5 
                    6 6 6 
                    7 7 7 
                    `, mySprite2, -120, 0)
            })
        }
    } else {
        if (sprites.readDataBoolean(mySprite2, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite2, 0, -100)
        }
        if (sprites.readDataBoolean(mySprite3, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite3, 0, 100)
        }
        if (sprites.readDataBoolean(mySprite4, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite4, 100, 0)
        }
        if (sprites.readDataBoolean(mySprite5, "Alive?") == true) {
            projectile2 = sprites.createProjectileFromSprite(img`
                5 5 5 
                6 6 6 
                7 7 7 
                `, mySprite5, -100, 0)
        }
    }
}
blockMenu.onMenuOptionSelected(function (option, index) {
    if (option == "How To Play") {
        game.setDialogFrame(img`
            6666666666666666666666
            6222222222222222222226
            6122222222222222222216
            6112222222222222222116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            611ffffffffffffffff116
            61ffffffffffffffffff16
            6ffffffffffffffffffff6
            6666666666666666666666
            `)
        game.showLongText("Move with WASD or the ARROW KEYS. Shoot the canons with A. It takes two shots to disable a canon. You can also shoot and destroy the terrain. Slow down time with B. But every time that you use this ability, you lose part of your health. Reach the darker flag to move onto the next level. Regenerate the terrain with I. Move as fast as you can. Each level, you evolve. Such as, your speed, or jump height can increase. Defeat the final room to finish your run. Overall, you can slow down TIME and you evolve over TIME.", DialogLayout.Center)
    } else if (option == "Play") {
        color.FadeToBlack.startScreenEffect(500)
        timer.after(1000, function () {
            blockMenu.setControlsEnabled(false)
            blockMenu.closeMenu()
            tiles.setSmallTilemap(tilemap`level1`)
            mySprite = sprites.create(img`
                6 6 6 6 5 5 5 5 
                6 2 2 2 2 2 2 5 
                6 2 5 2 2 5 2 5 
                6 2 6 2 2 6 2 5 
                7 2 7 2 2 7 2 6 
                7 2 7 2 2 7 2 6 
                7 2 2 2 2 2 2 6 
                7 7 7 7 6 6 6 6 
                `, SpriteKind.Actor)
            info.setLife(20)
            for (let value7 of tiles.getTilesByType(assets.tile`myTile`)) {
                if (Math.percentChance(7)) {
                    tiles.setTileAt(value7, assets.tile`myTile25`)
                }
            }
            for (let value8 of tiles.getTilesByType(assets.tile`myTile25`)) {
                tiles.setWallAt(value8, true)
            }
            Variation()
            sprites.setDataString(mySprite, "Type", "Player")
            tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
            Bulllets = 15
            controller.moveSprite(mySprite, 65, 0)
            mySprite.ay = 500
            textSprite2 = textsprite.create(convertToText(Bulllets), 0, 4)
            textSprite3 = textsprite.create("Room 1", 0, 4)
            textSprite3.setPosition(120, 4)
            mySprite2 = sprites.create(img`
                1 1 1 1 1 1 1 1 
                1 1 1 1 1 1 1 1 
                1 1 1 7 7 1 1 1 
                1 1 1 7 7 1 1 1 
                1 1 4 7 7 4 1 1 
                7 4 4 7 7 4 4 7 
                7 4 3 7 7 3 4 7 
                7 3 3 7 7 3 3 7 
                `, SpriteKind.Enemy)
            tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
            textSprite2.setPosition(45, 4)
            textSprite2.setIcon(img`
                6 5 5 
                7 . 5 
                7 7 6 
                `)
            textSprite.destroy()
            Jumps = 3
            color.clearFadeEffect()
            Set_Colors()
            info.startCountup(true)
            Game_Started = true
        })
    } else if (option == "About") {
        game.setDialogFrame(img`
            6666666666666666666666
            6222222222222222222226
            6122222222222222222216
            6112222222222222222116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            6113333333333333333116
            611ffffffffffffffff116
            61ffffffffffffffffff16
            6ffffffffffffffffffff6
            6666666666666666666666
            `)
        game.showLongText("You play as cuboid robot. You have been specifically designed to be used for testing and have been fitted with a prototype device that can slow down time. However like all technology, it is flawed. Since it is just a prototype, it can GLITCH, and leaves clones of yourself in frozen in TIME. However, timed just right, this can be a big assist. Being a robot, you also have extreme physical strength. This gives you the ability to break land if you jump on it at high speeds. However this also reduces your health. This is just one big simulation, that you have to complete as fast as possible. Enter your fastest times in the comments. Made in 3 days for the Makecode Arcade Game Jam", DialogLayout.Center)
    }
})
scene.onOverlapTile(SpriteKind.Actor, assets.tile`myTile1`, function (sprite, location) {
    textSprite3.setText("Room 2")
    console.log("2")
    tiles.setSmallTilemap(tilemap`level17`)
    for (let value9 of tiles.getTilesByType(assets.tile`myTile`)) {
        if (Math.percentChance(7)) {
            tiles.setTileAt(value9, assets.tile`myTile25`)
        }
    }
    for (let value22 of tiles.getTilesByType(assets.tile`myTile25`)) {
        tiles.setWallAt(value22, true)
    }
    Variation()
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile0`)
    controller.moveSprite(mySprite, 90, 0)
    mySprite.ay = 450
    if (sprites.readDataBoolean(mySprite2, "Alive?") == false) {
        mySprite2 = sprites.create(img`
            1 1 1 1 1 1 1 1 
            1 1 1 1 1 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 1 7 7 1 1 1 
            1 1 4 7 7 4 1 1 
            7 4 4 7 7 4 4 7 
            7 4 3 7 7 3 4 7 
            7 3 3 7 7 3 3 7 
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    } else {
        tiles.placeOnRandomTile(mySprite2, assets.tile`myTile6`)
    }
    mySprite3 = sprites.create(img`
        7 3 3 7 7 3 3 7 
        7 4 3 7 7 3 4 7 
        7 4 4 7 7 4 4 7 
        1 1 4 7 7 4 1 1 
        1 1 1 7 7 1 1 1 
        1 1 1 7 7 1 1 1 
        1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(mySprite3, assets.tile`myTile7`)
    Jumps = 3
    Set_Colors()
})
let VY: Sprite = null
let counter = 0
let Moosic = false
let textSprite2: TextSprite = null
let projectile2: Sprite = null
let mySprite5: Sprite = null
let mySprite4: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let textSprite3: TextSprite = null
let projectile: Sprite = null
let Direction = ""
let Bulllets = 0
let Time_Freeze = false
let mySprite: Sprite = null
let Jumps = 0
let textSprite: TextSprite = null
let Game_Started = false
let five = 0
let Points = 0
if (blockSettings.exists("Points")) {
    Points = blockSettings.readNumber("Points")
} else {
    Points = 0
}
five = 0
Game_Started = false
Game_Started = false
Set_Colors()
blockMenu.showMenu(["Play", "How To Play", "About"], MenuStyle.List, MenuLocation.BottomHalf)
scene.setBackgroundColor(2)
blockMenu.setColors(2, 3)
textSprite = textsprite.create("G L I T C H", 0, 4)
textSprite.setMaxFontHeight(11)
let Textsprite_Front = textsprite.create("G L I T C H", 0, 7)
Textsprite_Front.setMaxFontHeight(11)
let TextSprite_Back = textsprite.create("G L I T C H", 0, 5)
TextSprite_Back.setMaxFontHeight(11)
textSprite.setPosition(75, 18)
Textsprite_Front.setPosition(75, 18)
TextSprite_Back.setPosition(75, 18)
TextSprite_Back.z = textSprite.z - 10
story.spriteMoveToLocation(Textsprite_Front, 80, 23, 10)
timer.background(function () {
    story.spriteMoveToLocation(TextSprite_Back, 72, 13, 10)
})
timer.after(750, function () {
    story.spriteMoveToLocation(Textsprite_Front, 75, 18, 75)
    timer.background(function () {
        story.spriteMoveToLocation(TextSprite_Back, 75, 18, 85)
    })
    timer.after(10, function () {
        TextSprite_Back.destroy(effects.ashes, 200)
        timer.background(function () {
            Textsprite_Front.destroy(effects.ashes, 200)
        })
    })
})
timer.after(500, function () {
	
})
game.onUpdate(function () {
    if (Game_Started) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            Jumps = 3
        }
    }
})
game.onUpdate(function () {
    if (Time_Freeze == true) {
        for (let value92 of sprites.allOfKind(SpriteKind.Projectile)) {
            value92.setKind(SpriteKind.SlowProjectile)
            value92.setVelocity(value92.vx * 0.1, value92.vy * 0.1)
        }
        for (let value92 of sprites.allOfKind(SpriteKind.PlayerBullet)) {
            value92.setKind(SpriteKind.SlowPlayerBullet)
            value92.setVelocity(value92.vx * 0.1, value92.vy * 0.1)
        }
    } else if (Time_Freeze == false) {
        for (let value10 of sprites.allOfKind(SpriteKind.SlowProjectile)) {
            value10.setKind(SpriteKind.Projectile)
            value10.setVelocity(value10.vx * 10, value10.vy * 10)
        }
        for (let value92 of sprites.allOfKind(SpriteKind.SlowPlayerBullet)) {
            value92.setKind(SpriteKind.PlayerBullet)
            value92.setVelocity(value92.vx * 10, value92.vy * 10)
        }
    }
})
game.onUpdate(function () {
    if (Game_Started) {
        textSprite2.setText("")
        textSprite2.setText(convertToText(Bulllets))
    }
})
game.onUpdate(function () {
    timer.background(function () {
        if (Game_Started) {
            if (!(Moosic)) {
                Moosic = true
                music.setVolume(20)
                music.playTone(196, music.beat(BeatFraction.Half))
                music.playTone(156, music.beat(BeatFraction.Half))
                music.playTone(131, music.beat(BeatFraction.Half))
                music.playTone(156, music.beat(BeatFraction.Half))
                music.playTone(131, music.beat(BeatFraction.Half))
                music.playTone(196, music.beat(BeatFraction.Half))
                music.playTone(131, music.beat(BeatFraction.Half))
                music.playTone(196, music.beat(BeatFraction.Half))
                music.playTone(156, music.beat(BeatFraction.Half))
                music.playTone(196, music.beat(BeatFraction.Half))
                music.playTone(131, music.beat(BeatFraction.Half))
                music.playTone(156, music.beat(BeatFraction.Half))
                Moosic = false
            }
        }
    })
})
game.onUpdate(function () {
    if (Game_Started) {
        if (!(Time_Freeze)) {
            music.setVolume(150)
            music.setTempo(150)
        } else {
            music.setVolume(100)
            music.setTempo(50)
        }
    }
})
game.onUpdateInterval(1500, function () {
    if (Game_Started) {
        if (Math.percentChance(25)) {
            tiles.setTileAt(tiles.locationOfSprite(mySprite), assets.tile`myTile37`)
            tiles.setWallAt(tiles.locationOfSprite(mySprite), true)
        }
    }
})
game.onUpdateInterval(500, function () {
    if (Game_Started) {
        if (!(Time_Freeze)) {
            Shooty()
        } else {
            counter += 1
            if (five == 0) {
                if (counter == 3) {
                    counter = 0
                    Shooty()
                }
            } else {
                if (counter == 2) {
                    counter = 0
                    Shooty()
                }
            }
        }
    }
})
game.onUpdateInterval(100, function () {
    if (Game_Started) {
        VY = mySprite
    }
})
