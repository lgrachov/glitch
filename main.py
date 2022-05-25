@namespace
class SpriteKind:
    Actor = SpriteKind.create()
    PlayerBullet = SpriteKind.create()
    SlowProjectile = SpriteKind.create()

def on_on_created(sprite):
    sprites.set_data_boolean(sprite, "Alive?", True)
    sprites.set_data_number(sprite, "Health", 2)
sprites.on_created(SpriteKind.enemy, on_on_created)

def on_up_pressed():
    global Jumps
    if Game_Started:
        if Jumps >= 1:
            mySprite.vy = -161
            Jumps += -1
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_b_pressed():
    global Time_Freeze
    if Game_Started:
        Time_Freeze = True
        
        def on_after():
            global Time_Freeze
            Time_Freeze = False
        timer.after(4000, on_after)
        
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy(effects.disintegrate, 750)
    sprites.change_data_number_by(otherSprite, "Health", -1)
    otherSprite.start_effect(effects.disintegrate, 500)
    if sprites.read_data_number(otherSprite, "Health") == 0:
        otherSprite.destroy(effects.disintegrate, 750)
sprites.on_overlap(SpriteKind.PlayerBullet, SpriteKind.enemy, on_on_overlap)

def on_a_pressed():
    global Bulllets, projectile
    if Game_Started:
        if Bulllets > 0:
            Bulllets += -1
            if Direction == "L":
                projectile = sprites.create_projectile_from_sprite(img("""
                        6 5 5 
                                            7 . 5 
                                            7 7 6
                    """),
                    mySprite,
                    -80,
                    0)
                projectile.set_kind(SpriteKind.PlayerBullet)
            elif Direction == "R":
                projectile = sprites.create_projectile_from_sprite(img("""
                        6 5 5 
                                            7 . 5 
                                            7 7 6
                    """),
                    mySprite,
                    80,
                    0)
                projectile.set_kind(SpriteKind.PlayerBullet)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    global Direction
    if Game_Started:
        Direction = "L"
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_player2_button_up_pressed():
    if Game_Started:
        for value3 in tiles.get_tiles_by_type(assets.tile("""
            myTile25
        """)):
            tiles.set_wall_at(value3, False)
        for value4 in tiles.get_tiles_by_type(assets.tile("""
            myTile25
        """)):
            tiles.set_tile_at(value4, assets.tile("""
                myTile
            """))
        tiles.set_small_tilemap(tilemap("""
            level13
        """))
        for value5 in tiles.get_tiles_by_type(assets.tile("""
            myTile
        """)):
            if Math.percent_chance(7):
                tiles.set_tile_at(value5, assets.tile("""
                    myTile25
                """))
        for value6 in tiles.get_tiles_by_type(assets.tile("""
            myTile25
        """)):
            tiles.set_wall_at(value6, True)
        tiles.place_on_random_tile(mySprite, assets.tile("""
            myTile0
        """))
controller.player2.on_button_event(ControllerButton.UP,
    ControllerButtonEvent.PRESSED,
    on_player2_button_up_pressed)

def on_right_pressed():
    global Direction
    if Game_Started:
        Direction = "R"
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy(effects.disintegrate, 500)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.Actor, SpriteKind.projectile, on_on_overlap2)

def on_hit_wall(sprite, location):
    tiles.set_tile_at(location, assets.tile("""
        myTile
    """))
    tiles.set_wall_at(location, False)
scene.on_hit_wall(SpriteKind.PlayerBullet, on_hit_wall)

def on_overlap_tile(sprite, location):
    global mySprite2, mySprite3, mySprite4, Jumps
    print("check")
    tiles.set_small_tilemap(tilemap("""
        level19
    """))
    for value in tiles.get_tiles_by_type(assets.tile("""
        myTile
    """)):
        if Math.percent_chance(7):
            tiles.set_tile_at(value, assets.tile("""
                myTile25
            """))
    for value2 in tiles.get_tiles_by_type(assets.tile("""
        myTile25
    """)):
        tiles.set_wall_at(value2, True)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        myTile0
    """))
    controller.move_sprite(mySprite, 120, 0)
    mySprite.ay = 500
    mySprite2 = sprites.create(img("""
            1 1 1 1 1 1 1 1 
                    1 1 1 1 1 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 4 7 7 4 1 1 
                    7 4 4 7 7 4 4 7 
                    7 4 3 7 7 3 4 7 
                    7 3 3 7 7 3 3 7
        """),
        SpriteKind.enemy)
    tiles.place_on_random_tile(mySprite2, assets.tile("""
        myTile6
    """))
    mySprite3 = sprites.create(img("""
            7 3 3 7 7 3 3 7 
                    7 4 3 7 7 3 4 7 
                    7 4 4 7 7 4 4 7 
                    1 1 4 7 7 4 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 1 1 1 1 1 
                    1 1 1 1 1 1 1 1
        """),
        SpriteKind.enemy)
    tiles.place_on_random_tile(mySprite3, assets.tile("""
        myTile7
    """))
    mySprite4 = sprites.create(img("""
            7 7 7 1 1 1 1 1 
                    3 4 4 1 1 1 1 1 
                    3 3 4 4 1 1 1 1 
                    7 7 7 7 7 7 1 1 
                    7 7 7 7 7 7 1 1 
                    3 3 4 4 1 1 1 1 
                    3 4 4 1 1 1 1 1 
                    7 7 7 1 1 1 1 1
        """),
        SpriteKind.enemy)
    tiles.place_on_random_tile(mySprite4, assets.tile("""
        myTile4
    """))
    Jumps = 3
    Set_Colors()
scene.on_overlap_tile(SpriteKind.Actor,
    assets.tile("""
        myTile21
    """),
    on_overlap_tile)

def Set_Colors():
    color.set_color(1, color.rgb(15, 42, 63))
    color.set_color(2, color.rgb(32, 57, 79))
    color.set_color(3, color.rgb(246, 214, 189))
    color.set_color(4, color.rgb(195, 163, 138))
    color.set_color(5, color.rgb(153, 117, 119))
    color.set_color(6, color.rgb(129, 98, 113))
    color.set_color(7, color.rgb(78, 73, 95))

def on_life_zero():
    game.over(False, color.rotate_palette)
info.on_life_zero(on_life_zero)

def on_hit_wall2(sprite, location):
    tiles.set_tile_at(location, assets.tile("""
        myTile
    """))
    tiles.set_wall_at(location, False)
scene.on_hit_wall(SpriteKind.projectile, on_hit_wall2)

def on_on_destroyed(sprite):
    sprites.set_data_boolean(sprite, "Alive?", False)
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

def on_on_destroyed2(sprite):
    sprites.set_data_boolean(sprite, "Alive?", False)
sprites.on_destroyed(SpriteKind.player, on_on_destroyed2)

def Shooty():
    global projectile2
    if sprites.read_data_boolean(mySprite2, "Alive?") == True:
        projectile2 = sprites.create_projectile_from_sprite(img("""
                5 5 5 
                            6 6 6 
                            7 7 7
            """),
            mySprite2,
            0,
            -100)
    if sprites.read_data_boolean(mySprite3, "Alive?") == True:
        projectile2 = sprites.create_projectile_from_sprite(img("""
                5 5 5 
                            6 6 6 
                            7 7 7
            """),
            mySprite3,
            0,
            100)
    if sprites.read_data_boolean(mySprite4, "Alive?") == True:
        projectile2 = sprites.create_projectile_from_sprite(img("""
                5 5 5 
                            6 6 6 
                            7 7 7
            """),
            mySprite4,
            100,
            0)

def on_menu_option_selected(option, index):
    if option == "How To Play":
        game.set_dialog_frame(img("""
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
        """))
        game.show_long_text("Move with WASD or the ARROW KEYS. Shoot the canons with A. It takes two shots to disable a canon. You can also shoot and destroy the terrain.Slow down time with B. Reach the darker flag to move onto the next level. Regenerate the terrain with I. Move as fast as you can. Each level, you evolve. Such as, your speed, or jump height can increase. Overall, you can slow down TIME and you evolve over TIME.",
            DialogLayout.CENTER)
    elif option == "Play":
        color.fade_to_black.start_screen_effect(500)
        
        def on_after2():
            global mySprite, Bulllets, textSprite2, mySprite2, Jumps, Game_Started
            blockMenu.set_controls_enabled(False)
            blockMenu.close_menu()
            tiles.set_small_tilemap(tilemap("""
                level1
            """))
            mySprite = sprites.create(img("""
                    6 6 6 6 5 5 5 5 
                                    6 2 2 2 2 2 2 5 
                                    6 2 5 2 2 5 2 5 
                                    6 2 6 2 2 6 2 5 
                                    7 2 7 2 2 7 2 6 
                                    7 2 7 2 2 7 2 6 
                                    7 2 2 2 2 2 2 6 
                                    7 7 7 7 6 6 6 6
                """),
                SpriteKind.Actor)
            info.set_life(5)
            for value7 in tiles.get_tiles_by_type(assets.tile("""
                myTile
            """)):
                if Math.percent_chance(7):
                    tiles.set_tile_at(value7, assets.tile("""
                        myTile25
                    """))
            for value8 in tiles.get_tiles_by_type(assets.tile("""
                myTile25
            """)):
                tiles.set_wall_at(value8, True)
            sprites.set_data_string(mySprite, "Type", "Player")
            tiles.place_on_random_tile(mySprite, assets.tile("""
                myTile0
            """))
            Bulllets = 10
            controller.move_sprite(mySprite, 65, 0)
            mySprite.ay = 500
            textSprite2 = textsprite.create(convert_to_text(Bulllets), 0, 4)
            mySprite2 = sprites.create(img("""
                    1 1 1 1 1 1 1 1 
                                    1 1 1 1 1 1 1 1 
                                    1 1 1 7 7 1 1 1 
                                    1 1 1 7 7 1 1 1 
                                    1 1 4 7 7 4 1 1 
                                    7 4 4 7 7 4 4 7 
                                    7 4 3 7 7 3 4 7 
                                    7 3 3 7 7 3 3 7
                """),
                SpriteKind.enemy)
            tiles.place_on_random_tile(mySprite2, assets.tile("""
                myTile6
            """))
            textSprite2.set_position(45, 4)
            textSprite2.set_icon(img("""
                6 5 5 
                                7 . 5 
                                7 7 6
            """))
            textSprite.destroy()
            Jumps = 3
            color.clear_fade_effect()
            Set_Colors()
            info.start_countup(True)
            Game_Started = True
        timer.after(1000, on_after2)
        
blockMenu.on_menu_option_selected(on_menu_option_selected)

def on_overlap_tile2(sprite, location):
    global mySprite2, mySprite3, Jumps
    print("2")
    tiles.set_small_tilemap(tilemap("""
        level17
    """))
    for value9 in tiles.get_tiles_by_type(assets.tile("""
        myTile
    """)):
        if Math.percent_chance(7):
            tiles.set_tile_at(value9, assets.tile("""
                myTile25
            """))
    for value22 in tiles.get_tiles_by_type(assets.tile("""
        myTile25
    """)):
        tiles.set_wall_at(value22, True)
    tiles.place_on_random_tile(mySprite, assets.tile("""
        myTile0
    """))
    controller.move_sprite(mySprite, 90, 0)
    mySprite.ay = 500
    mySprite2 = sprites.create(img("""
            1 1 1 1 1 1 1 1 
                    1 1 1 1 1 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 4 7 7 4 1 1 
                    7 4 4 7 7 4 4 7 
                    7 4 3 7 7 3 4 7 
                    7 3 3 7 7 3 3 7
        """),
        SpriteKind.enemy)
    tiles.place_on_random_tile(mySprite2, assets.tile("""
        myTile6
    """))
    mySprite3 = sprites.create(img("""
            7 3 3 7 7 3 3 7 
                    7 4 3 7 7 3 4 7 
                    7 4 4 7 7 4 4 7 
                    1 1 4 7 7 4 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 7 7 1 1 1 
                    1 1 1 1 1 1 1 1 
                    1 1 1 1 1 1 1 1
        """),
        SpriteKind.enemy)
    tiles.place_on_random_tile(mySprite3, assets.tile("""
        myTile7
    """))
    Jumps = 3
    Set_Colors()
scene.on_overlap_tile(SpriteKind.Actor,
    assets.tile("""
        myTile1
    """),
    on_overlap_tile2)

textSprite2: TextSprite = None
projectile2: Sprite = None
mySprite4: Sprite = None
mySprite3: Sprite = None
mySprite2: Sprite = None
projectile: Sprite = None
Direction = ""
Bulllets = 0
Time_Freeze = False
mySprite: Sprite = None
Jumps = 0
textSprite: TextSprite = None
Game_Started = False
counter = 0
Game_Started = False
Game_Started = False
Set_Colors()
blockMenu.show_menu(["Play", "How To Play"],
    MenuStyle.LIST,
    MenuLocation.BOTTOM_HALF)
scene.set_background_color(2)
blockMenu.set_colors(2, 3)
textSprite = textsprite.create("GLITCH", 0, 3)
textSprite.set_position(55, 18)
textSprite.set_max_font_height(10)

def on_on_update():
    if Time_Freeze == True:
        for value92 in sprites.all_of_kind(SpriteKind.projectile):
            value92.set_kind(SpriteKind.SlowProjectile)
            value92.set_velocity(value92.vx * 0.1, value92.vy * 0.1)
    elif Time_Freeze == False:
        for value10 in sprites.all_of_kind(SpriteKind.SlowProjectile):
            value10.set_kind(SpriteKind.projectile)
            value10.set_velocity(value10.vx * 10, value10.vy * 10)
game.on_update(on_on_update)

def on_on_update2():
    global Jumps
    if Game_Started:
        if mySprite.is_hitting_tile(CollisionDirection.BOTTOM):
            Jumps = 3
game.on_update(on_on_update2)

def on_on_update3():
    if Game_Started:
        textSprite2.set_text("")
        textSprite2.set_text(convert_to_text(Bulllets))
game.on_update(on_on_update3)

def on_update_interval():
    global counter
    if Game_Started:
        if not (Time_Freeze):
            Shooty()
        else:
            counter += 1
            if counter == 3:
                counter = 0
                Shooty()
game.on_update_interval(500, on_update_interval)
