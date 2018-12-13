// Create game object
var Game = {

    //////////////////
    /// GAME STATS ///
    //////////////////

    wins: 0, // wins
    xpGain: 0, // will increase as you beat enemies
    playerBaseHP: 0,
    enemyBaseHP: 0,
    playerCharacter: {}, // who is the player playing
    enemyCharacter: {}, //who is the player fighting

    //////////////////
    /// CHARACTERS ///
    //////////////////

    fighters: [ //SO UNBALANCED
        anakin = {
            name: "Anakin",
            fightText: "I don't like sand!",
            hp: 30,
            atk: 40,
            cAtk: 20,
            winsToUnlock: 0,
            isUnlocked: true,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/anakin/standing.jpg",
            fightPic: "assets/images/anakin/fighting.png",
            diePic: "assets/images/anakin/dying.png"
        },

        sandperson = {
            name: "Sand Person",
            fightText: "*WAVES ARMS ANGRILY*",
            hp: 10,
            atk: 30,
            cAtk: 20,
            winsToUnlock: 0,
            isUnlocked: true,
            isPC: false,
            isEnemy: true,
            standPic: "assets/images/sandPerson/standing.png",
            fightPic: "assets/images/sandPerson/fighting.jpg",
            diePic: "assets/images/sandPerson/dying.jpg"
        },

        // droid= {name: "Droid",
        //         fightText: "Kiss my shiny metal ass",
        //         hp: 20,
        //         atk: 20,
        //         cAtk: 40,
        //         winsToUnlock: 0,
        //         isUnlocked: true,
        //         isPC: false,
        //         standPic: "assets/images/droid/standing",
        //         fightPic: "assets/images/droid/fighting",
        //         diePic: "assets/images/droid/dying"},

        countdooku = {
            name: "Count Dooku",
            fightText: "Give me that arm!",
            hp: 40,
            atk: 50,
            cAtk: 20,
            winsToUnlock: 2,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/dooku/standing.png",
            fightPic: "assets/images/dooku/fighting.png",
            diePic: "assets/images/dooku/dying.png"
        },

        youngling = {
            name: "Youngling",
            fightText: "Mister Skywalker, is that you?",
            hp: 1,
            atk: 1,
            cAtk: 0,
            winsToUnlock: 4,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/youngling/standing.png",
            fightPic: "assets/images/youngling/fighting.jpeg",
            diePic: "assets/images/youngling/dying.png"
        },

        macewindu = {
            name: "Mace Windu",
            fightText: "You'll never be a Jedi Master!",
            hp: 70,
            atk: 60,
            cAtk: 50,
            winsToUnlock: 6,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/maceWindu/standing.jpg",
            fightPic: "assets/images/maceWindu/fighting.png",
            diePic: "assets/images/maceWindu/dying.png"
        },

        padme = {
            name: "Padme",
            fightText: "No Annie Please!",
            hp: 1,
            atk: 4,
            cAtk: 0,
            winsToUnlock: 8,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/padme/standing.jpeg",
            fightPic: "assets/images/padme/fighting.jpg",
            diePic: "assets/images/padme/dying.jpg"
        },

        obiwankenobi = {
            name: "Obi Wan Kenobi",
            fightText: "Don't try it, I have the high ground!",
            hp: 6,
            atk: 7,
            cAtk: 5,
            winsToUnlock: 9,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/obiWanKenobi/standing.png",
            fightPic: "assets/images/obiWanKenobi/fighting.jpg",
            diePic: "assets/images/obiWanKenobi/dying.png"
        },

        ewoks = {
            name: "Ewoks",
            fightText: "GRUB GRUB GRUB",
            hp: 20,
            atk: 20,
            cAtk: 20,
            winsToUnlock: 20,
            isUnlocked: false,
            isPC: false,
            isEnemy: false,
            standPic: "assets/images/ewoks/standing.png",
            fightPic: "assets/images/ewoks/fighting.jpg",
            diePic: "assets/images/ewoks/dying.jpg"
        },
    ],

    ///////////////////
    /// BACKGROUNDS ///
    ///////////////////

    backgrounds: [
        "./assets/images/backgrounds/1.jpg",
        "./assets/images/backgrounds/2.jpg",
        "./assets/images/backgrounds/3.jpeg",
        "./assets/images/backgrounds/4.jpeg",
        "./assets/images/backgrounds/5.jpg",
        "./assets/images/backgrounds/6.jpeg",
        "./assets/images/backgrounds/7.jpeg",
        "./assets/images/backgrounds/8.jpg",
        "./assets/images/backgrounds/9.jpeg",
        "./assets/images/backgrounds/10.jpg"
    ],

    ///////////////
    /// METHODS ///
    ///////////////

    reset: function () {
        // reset stats
        this.xpGain = 0;
        $("#xp").text(this.xpGain);

        // show start menu
        $("#startMenu").modal('show');
        // display fighters on page
        this.displayFighters();

        // pick a random background image
        var bkgdIndex = Math.floor(Math.random() * this.backgrounds.length);
        var bkgd = this.backgrounds[bkgdIndex];
        $(".main").css('background-image', "url('" + bkgd + "')");
    },

    displayFighters: function(){
        // reset character menus
        $("#fighterMenu").empty();
        $("#fighterPics").empty();

        this.fighters.forEach(fighter => {
            // check and see if the character is unlocked
            if (fighter.isUnlocked) {
                // bring in images for each fighter, set class and src, append to the fighter menu in modal
                $("<img>", {
                    "class": "fighterMenuImage",
                    "src": fighter.standPic,
                    "id": fighter.name
                }).appendTo("#fighterMenu");
                // and into nav
                $("<img>", {
                    "class": "enemyImage",
                    "src": fighter.standPic,
                    "id": fighter.name
                }).appendTo("#fighterPics");
            } else {
                // put black box if character is not unlocked
                $("<div>", {
                    "class": "fighterMenuImage locked",
                    "style": "background-color: black; color: gray; text-align: center",
                    "text": "Locked"
                }).appendTo("#fighterMenu");
                // and into nav
                $("<div>", {
                    "class": "enemyImage locked",
                    "style": "background-color: black; color: gray; text-align: center",
                    "text": "Locked"
                }).appendTo("#fighterPics");
            }
        });
    },

    hideStartMenu: function () {
        //on click of character picture in popup
        //change start menu to display none
        $("#startMenu").modal("hide");
    },

    pickCharacter: function (targetChar) {
        // remove player character of current player character
        this.playerCharacter.isPC = false;
        // set new player character
        this.playerCharacter = search(targetChar, Game.fighters);
        console.log(this.playerCharacter);
    },

    pickEnemy: function (targetChar) {
        // remove player character of current enemy character
        this.enemyCharacter.isEnemy = false;
        // set new player character
        this.enemyCharacter = search(targetChar, Game.fighters);
        console.log(this.enemyCharacter);
    },

    setCharacter: function (targetChar) {
        $(".playerFighter").html(
            $("<img>", {
                "class": "playerFighterImg",
                "src": this.playerCharacter.standPic,
            })
        );
        Game.playerBaseHP = this.playerCharacter.hp;
        console.log("base player hp",Game.playerBaseHP);
        $("#playerHealth").attr("aria-valuenow",100);
        $("#playerHealth").text(this.playerCharacter.hp);
        this.updateProgressBar("player");
    },

    setEnemy: function (targetChar) {
        $(".enemyFighter").html(
            $("<img>", {
                "class": "enemyFighterImg",
                "src": this.enemyCharacter.standPic,
            })
        );
        this.enemyCharacter.hp = Math.round(Math.abs(this.enemyCharacter.hp)); //makes enemies stronger every time you kill them
        Game.enemyBaseHP = this.enemyCharacter.hp;
        console.log("base enemy hp",Game.enemyBaseHP);
        $("#enemyHealth").attr("aria-valuenow",100);
        $("#enemyHealth").text(this.enemyCharacter.hp);
        this.updateProgressBar("enemy");
    },

    attack: function () {
        // log stats
        console.log(this.playerCharacter.name + ": hp - "+ this.playerCharacter.hp + ", atk - " + this.playerCharacter.atk);

        $(".playerFighterImg").attr("src", this.playerCharacter.fightPic);
        console.log($(".playerFighterImg").attr("src"));
        this.enemyCharacter.hp -= this.playerCharacter.atk;
        console.log("enemy hp", this.enemyCharacter.hp);

        Game.updateProgressBar("enemy");

        setTimeout(function () {
            $(".playerFighterImg").attr("src", Game.playerCharacter.standPic);
            console.log("running player animation");
        }, 500);

        if (this.enemyCharacter.hp > 0 && this.playerCharacter.hp > 0) {

            setTimeout(function () {
                $(".enemyFighterImg").attr("src", Game.enemyCharacter.fightPic);
                Game.playerCharacter.hp -= Game.enemyCharacter.cAtk;
                Game.updateProgressBar("player");
                console.log("player hp", Game.playerCharacter.hp);
            }, 1000);

            //some animation
            setTimeout(function () {
                $(".enemyFighterImg").attr("src", Game.enemyCharacter.standPic);
            }, 1500);

        } else if (this.enemyCharacter.hp <= 0) {
            setTimeout(function () {
                Game.win();
            }, 1000);
        } else if (this.playerCharacter.hp <= 0) {
            setTimeout(function () {
                Game.lose();
            }, 1000);
        }
    },

    updateProgressBar: function(who){
        if (who == "player"){
            var percent = calcPercent(this.playerCharacter.hp,this.playerBaseHP);
            $("#playerHealth").attr("aria-valuenow",percent);
            $("#playerHealth").css("width",percent+"%");
        }
        else {
            var percent = calcPercent(this.enemyCharacter.hp,this.enemyBaseHP);
            $("#enemyHealth").attr("aria-valuenow",percent);
            $("#enemyHealth").css("width",percent+"%");
        }
    },

    win: function () {
        // show enemy dying
        $(".enemyFighterImg").attr("src", Game.enemyCharacter.diePic);

        // increase wins
        Game.wins++;
        $("#wins").text(Game.wins);
        //check to see if new players unlock
        this.fighters.forEach(fighter => {
            // unlock new characters
            if (fighter.winsToUnlock <= Game.wins) {
                fighter.isUnlocked = true;
            } else {
                fighter.isUnlocked = false;
            }
        });
        

        // increase XP
        Game.xpGain += 50;
        $("#xp").text(Game.xpGain);

        // increase player stats
        Game.playerCharacter.hp *= 1.1;
        Game.playerCharacter.atk *= 1.1;
        setTimeout(function () {
            alert(Game.enemyCharacter.name + " defeated!\nChoose another enemy to fight, or reset to pick another fighter!\nBut be careful, enemies get stronger each time they fight!")
            $(".enemyFighter").empty();
        }, 1000);

        setTimeout(function(){
            Game.displayFighters();
        }, 1500)
    },

    lose: function () {
        $(".playerFighterImg").attr("src", Game.playerCharacter.diePic);
        $("#xp").text(Game.xpGain);
        this.xpGain = 0;
        setTimeout(function () {
            alert("You died! Press reset to start over.") 
        }, 1000);
    }
};

// start game
Game.reset();

/////////////////
/// LISTENERS ///
/////////////////

$("#startButton").on("click", function () {
    Game.hideStartMenu();
    Game.setCharacter();
})

$(document).on("click",".fighterMenuImage", function () {
    var id = this.id;
    var islocked = $(this).hasClass("locked");
    if (islocked) {
        console.log("character locked");
    } else {
        Game.pickCharacter(id);
        activateFighter(this);
    }
});

$(document).on("click", ".enemyImage",function () {
    console.log("clicked enemy image");
    var id = this.id;
    var islocked = $(this).hasClass("locked");
    if (islocked) {
        console.log("character locked");
    } else {
        Game.pickEnemy(id);
        activateEnemy(this);
        Game.setEnemy();
    }
});

$("#attackButton").on("click", function () {
    if($(".enemyFighter").html()){
        Game.attack();
    }
    else{
        alert("You need to select an enemy!");
    }
});

$("#resetButton").on("click",function(){
    Game.reset();
})

/////////////////
/// FUNCTIONS ///
/////////////////

function search(key, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === key) {
            return array[i];
        }
    }
}

function activateFighter(img) {
    items = document.querySelectorAll('.fighterMenuImage.active');
    if (items.length) {
        items[0].className = 'fighterMenuImage';
    }
    img.className = 'fighterMenuImage active';
};

function activateEnemy(img) {
    items = document.querySelectorAll('.enemyImage.active');
    if (items.length) {
        items[0].className = 'enemyImage';
    }
    img.className = 'enemyImage active';
}

function calcPercent(current,max){
    var percent = current/max*100;
    return percent;
}