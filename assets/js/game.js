// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemey-robot
// "LOSE" - Player robot's health is zero or less

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * 21) + 40;

    return value;
};

var fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip functino
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
    // Conditional Fight Recursive Function Call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    
        if (promptFight === "skip") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerInfo.playerMoney = playerInfo.money - 10;
                
                // return true if player wants to leave
                return true;
            }
        }   
}


//fight function (now with parameter for enemy's object holding name, health, and attack values)
var fight = function(enemy) {
    // repeat and execute as long as the eney-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        // ask player if they'd like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            // if true, leave fight by breaking loop
            break;
        }

        //if player choses to fight, then fight
        // if (promptFight === "fight" || promptFight === "FIGHT") {
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
            );

        // check enemy's health
        if (enemy.health <=0) {
            window.alert(enemy.name + " has died!");
            
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
            
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};


//function to start a new game
var startGame = function() {

    // reset player stats
    playerInfo.reset();

    //fight each enemy-robot by looping over them and fighting them one at a time
    for (var i=0; i < enemyInfo.length; i++) {
        // if player is still alive, keeping fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that array start at 0 so it needs to have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + ( i +1 ) );
            
            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);

            //use debugger to pause script from running and check what's going on at that moment in the code
            //debugger;

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if player is still alive and we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round? ");

                // if yes, take them to the store () function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        //if player isn't alive, stop the game
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }

    // after the loop ends, player is either out of heatlh or enemies to fight
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } else {
        window.alert("You've lost your robot in battle.");
    }

    // ask plater if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladitors! Come back soon!");
    }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. "
    );

    // use switch to carry out action 
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leave the store.");

            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to form player to pick a valid option
            shop();
            break;
    }
};

//function to set name
var getPlayerName= function() {
    var name = "";

    //loop to prompt the player until valid data is received
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    
    console.log("Your robot's name is " + name);
    return name;
}

/* END GAME FUNCTIONS */

/* GAME INFORMATION / VARIABLES */


// player information
var playerInfo = {
    name: getPlayerName(), 
    health: 100,
    attack: 10,
    money: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma! 
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -+ 7;
        } else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars");
        this.attack += 6;
        this.money -+ 7;
        } else {
            window.alert("You don't have enough money!");
        }
    }
};

// You can also log multiple values at once like this console.log(playerInfo.name, playerInfo.attack, playerInfo.health);
var enemyInfo = [
    {
      name: 'Roborto',
      attack: randomNumber(10, 14)
    },
    {
      name: 'Amy Android',
      attack: randomNumber(10, 14)
    },
    {
      name: 'Robo Trumble',
      attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

// start the game when the page loads
startGame();