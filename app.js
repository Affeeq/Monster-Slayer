new Vue({
	el: '#app',
	data: {
		playerHealth: 100,
		monsterHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = [];
		},
		attack: function() {
			var damage = this.calcDamage(3,10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits monster for ' + damage
			});
			if(this.checkWin()) {
				return;
			}

			this.monsterAttacks();
		},
		specialAttack: function() {
			var damage = this.calcDamage(10,20)
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Player hits monster hard for ' + damage
			});
			if(this.checkWin()) {
				return;
			}

			this.monsterAttacks();
		},
		heal: function() {
			var myHeal = this.calcDamage(5,10);
			if(this.playerHealth + myHeal > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += myHeal;
			}
			this.turns.unshift({
				isPlayer: true,
				text: 'Player heals for ' + myHeal
			});
			this.monsterAttacks();
		},
		giveUp: function() {
			this.gameIsRunning = false;
		},
		monsterAttacks: function() {
			var damage = this.calcDamage(5, 12);
			this.playerHealth -= damage;
			this.checkWin();
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster hits player for ' + damage
			});
		},
		calcDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWin: function() {
			if(this.monsterHealth <= 0) {
				if(confirm('You won! New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return true;
			} else if(this.playerHealth <= 0) {
				if(confirm('You lost! New Game?')) {
					this.startGame();
				} else {
					this.gameIsRunning = false;
				}
				return false;
			}
		}
	}
});