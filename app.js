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
 * Returns Damage caused
 * @param {Number} min min possible damage value
 * @param {Number} max max possible damage value
 * @returns {Number} Damage caused by player to monster
 */
const getDamage = (min, max) => Math.floor(
  Math.random() * (max - min)
) + min;

// create vue app
const app = Vue.createApp({
  data() {
    return {
      playerHealth: FULL_HEALTH,
      monsterHealth: FULL_HEALTH,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
  },
  methods: {
    attackMonster() {
      // calculate the damage
      const damage = getDamage(MIN_DAMAGE_PLAYER, MAX_DAMAGE_PLAYER);

      // affect the monster health
      this.monsterHealth -= damage;

      // call the attack by the monster
      this.attackPlayer();
    },
    attackPlayer() {
      // calculate the damage
      const damage = getDamage(MIN_DAMAGE_MONSTER, MAX_DAMAGE_MONSTER);

      // affect the player health
      this.playerHealth -= damage;
    },
  },
});

// mount app in DOM
app.mount('#game');
