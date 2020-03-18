new Vue({
	el: '#app',
	data: {
		show: true,
		isActive: false,
		isPlayer: true,
		myHealth: 100,
		attack: '',
		specialAttack: '',
		heal: '',
		monsterHealth: 100,
		monsterAttack: '',
		gameHistory: [],
		playerTurn: 'player-turn',
		monsterTurn: 'monster-turn'
	},
	methods: {
		gameReset: function() {
			this.monsterHealth = 100;
			this.myHealth = 100;
			this.show = true;
			this.gameHistory = [];
			this.isActive = false;
			this.isPlayer = true;
		},
		randomNum: function(max,min) {
			return (Math.floor(Math.random() * (max - min)) + min);
		},
		playerAttackLog: function(value) {
			this.gameHistory.unshift('Player hits monster for ' + value);
		},
		giveUp: function() {
			this.gameReset();
			alert('You gave up! Do you want to play again');
		}
	},
	watch: {
		monsterHealth: function() {
			if(this.monsterHealth <= 0) {
				this.gameReset();
				alert('Game is over. Click start new game to begin');
			}
		},
		myHealth: function() {
			if(this.myHealth <= 0) {
				this.gameReset();
				alert('Game is over. Click start new game to begin');
			}
		},
		isPlayer: function() {
			if(!this.isPlayer) {
				this.monsterAttack = this.randomNum(15, 10);
				this.monsterAttackLog;
				this.myHealth = this.myHealth - this.monsterAttack;
				this.isPlayer = !this.isPlayer;
			}
		}
	},
	computed: {
		showLog: function() {
			return this.isActive = true;
		},
		playerHealLog: function() {
			this.gameHistory.unshift('Player heals himself for ' + this.heal);
		},
		monsterAttackLog: function() {
			this.gameHistory.unshift('Monster hits player for ' + this.monsterAttack);
		}
	}
});