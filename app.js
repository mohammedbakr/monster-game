new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunnig: false,
        turns: [],
    },
    methods: {
        startGame: function() {
            this.gameIsRunnig = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            const damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monstre for ${damage}`
            });
            if (this.checkWin()) { // for not getting (-) and not return
                // then we must check
                return;
            }
            this.monsterAttack(); 
        },
        specialAttack: function() {
            const damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: `Player hits Monstre hard for ${damage}`
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack(); 
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: `Player heals for 10`
                });
            }else {
                this.playerHealth =  100;
            }
            this.monsterAttack(); 
        },
        giveUp: function() {
            this.gameIsRunnig = false;
        },
        monsterAttack: function() {
            const damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: `Monster hits Player for ${damage}`
            });
            this.checkWin; // don't need check, cuz no code after this method
        },
        calculateDamage: function(max, min){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('you won!, New Game?')) {
                    this.startGame();
                }else {
                    this.gameIsRunnig = false;
                }
                return true; // return boolean, check above if for checkwin
            }else if (this.playerHealth <= 0) {
                if (confirm('you lost!, New Game?')) {
                    this.startGame();
                }else {
                    this.gameIsRunnig = false;
                }
                return true;
            }
            return false;
        }
    },
    computed: {

    },
});
