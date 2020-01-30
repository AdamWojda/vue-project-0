new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        attacks: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attacks = [];
        },
        attack: function() {
            // Damage monster.
            this.playerAttacks(3, 10);
            // If player looses stop the method.
            if ( this.checkWin() ) {
                return;
            }
            this.monsterAttacks();
            // Nothing to stop, player wins.
            this.checkWin();
        },
        specialAttack: function() {
            // Damage monster.
            this.playerAttacks(10, 20, true);
            // If player looses stop the method.
            if ( this.checkWin() ) {
                return;
            }
            this.monsterAttacks();
            // Nothing to stop, player wins.
            this.checkWin();
        },
        heal: function() {
            if ( this.playerHealth <= 89 ) {
                this.playerHealth += 10;
                if ( this.monsterHealth !== 100 ) {
                    this.monsterHealth += 3;
                }
            } else {
                this.monsterAttacks();
                this.checkWin();
            }
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attacks = [];
        },
        monsterAttacks: function() {
            // Damage.
            const $damage = this.calculateDamage(5, 12);
            // Damage player.
            this.playerHealth -= $damage;
            this.attacks.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + $damage
            })
        },
        playerAttacks: function(min, max, special = false) {
            // Damage.
            const $damage = this.calculateDamage(min, max);
            // Damage monster.
            this.monsterHealth -= $damage;
            this.attacks.unshift({
                isPlayer: true,
                text: special ? 'Player hits monster HARD for ' + $damage : 'Player hits monster for ' + $damage
            })
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor( Math.random() * max ) + 1, min);
        },
        checkWin: function() {
            // If health drops to zero, we should display some message.
            if ( 0 >= this.monsterHealth ) {
                confirm( 'Won!, new game?' ) ? this.startGame() : this.gameIsRunning = false;
                return true;
            }
            // If health drops to zero, we should display some message.
            if ( 0 >= this.playerHealth ) {
                confirm( 'You took a hit... wanna try again?' ) ? this.startGame() : this.gameIsRunning = false;
                return true;
            }
            return false;
        }
    }
});
