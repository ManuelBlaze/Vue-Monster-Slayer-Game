/**
 * Full health number
 * @constant
 * @type {Number}
 * @default
 */
const FULL_HEALTH = 100;

/**
 * Min damage caused by player number
 * @constant
 * @type {Number}
 * @default
 */
const MIN_DAMAGE_PLAYER = 5;

/**
 * Max damage caused by player number
 * @constant
 * @type {Number}
 * @default
 */
const MAX_DAMAGE_PLAYER = 12;

/**
 * Min damage caused by monster number
 * @constant
 * @type {Number}
 * @default
 */
const MIN_DAMAGE_MONSTER = 8;

/**
 * Max damage caused by monster number
 * @constant
 * @type {Number}
 * @default
 */
const MAX_DAMAGE_MONSTER = 15;

/**
 * Min special attack damage
 * @constant
 * @type {Number}
 * @default
 */
const MIN_SPECIAL = 10;

/**
 * Max special attack damage
 * @constant
 * @type {Number}
 * @default
 */
const MAX_SPECIAL = 25;

/**
 * Min heal value
 * @constant
 * @type {Number}
 * @default
 */
const MIN_HEAL = 8;

/**
 * Max heal value
 * @constant
 * @type {Number}
 * @default
 */
const MAX_HEAL = 20;

/**
 * Returns ramdom value
 * @param {Number} min min possible value
 * @param {Number} max max possible value
 * @returns {Number} Random value
 */
const getRamdomValue = (min, max) => Math.floor(
  Math.random() * (max - min)
) + min;

// create vue app
const app = Vue.createApp({
  data() {
    return {
      playerHealth: FULL_HEALTH,
      monsterHealth: FULL_HEALTH,
      currentRound: 0,
      winner: null,
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // a draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // player lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // a draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // monster lost
        this.winner = 'player';
      }
    },
  },
  computed: {
    monsterBarStyles() {
      return {
        width: this.monsterHealth > 0 
          ? this.monsterHealth + '%'
          : '0%',
      };
    },
    playerBarStyles() {
      return {
        width: this.playerHealth > 0 
          ? this.playerHealth + '%'
          : '0%',
      };
    },
    mayUseSpecial() {
      return this.currentRound % 3 !== 0
    },
    checkPlayerHealth() {
      return this.playerHealth === FULL_HEALTH;
    }
  },
  methods: {
    restart() {
      this.playerHealth = FULL_HEALTH;
      this.monsterHealth = FULL_HEALTH;
      this.currentRound = 0;
      this.winner = null;
    },
    attackMonster() {
      // update current round
      this.currentRound ++;

      // calculate the damage
      const damage = getRamdomValue(MIN_DAMAGE_PLAYER, MAX_DAMAGE_PLAYER);

      // affect the monster health
      this.monsterHealth -= damage;

      // call the attack by the monster
      this.attackPlayer();
    },
    attackPlayer() {
      // calculate the damage
      const damage = getRamdomValue(MIN_DAMAGE_MONSTER, MAX_DAMAGE_MONSTER);

      // affect the player health
      this.playerHealth -= damage;
    },
    specialAttackMonster() {
      // update current round
      this.currentRound ++;

      // calculate the damage
      const damage = getRamdomValue(MIN_SPECIAL, MAX_SPECIAL);

      // affect the monster health
      this.monsterHealth -= damage;

      // call the attack by the monster
      this.attackPlayer();
    },
    healPlayer() {
      // update current round
      this.currentRound ++;

      // calculate the health value
      const heal = getRamdomValue(MIN_HEAL, MAX_HEAL);

      // verify if the heal traspass the health limit
      if (this.playerHealth + heal > FULL_HEALTH) {
        this.playerHealth = FULL_HEALTH;
      } else {
        // heal the player
        this.playerHealth += heal;
      }

      // call the attack by the monster
      this.attackPlayer();
    },
    surrender() {
      this.winner = 'monster';
    }
  },
});

// mount app in DOM
app.mount('#game');
