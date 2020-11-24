<template>
  <div class="board-wrapper">
    <div class="table">
      <div class="table-head">
        <div class="table-row">
          <div><font-awesome-icon icon="angle-left" /></div>
          <!-- <div class="display">{{ GET_LOCALE[GET_CURRENT_LOCALE].BOARD.table_title }} <span>23h 22m 15s</span></div> -->
          <div class="display">{{ GET_LOCALE[GET_CURRENT_LOCALE].BOARD.table_title }} <span id="leaderboard-timer"></span></div>
          <div><font-awesome-icon icon="angle-right" /></div>
        </div>
        <div class="table-row table-row-cells">
          <div v-for="(key, ind) in GET_LOCALE[GET_CURRENT_LOCALE].BOARD.columns"
               :key="ind"
               :class="{'mobile_hidden': key === 'Bet Amount' || key === 'Всего Поставлено' || key === 'Bonus'}">
            {{ key }}
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="table-row table-row-cells" v-for="(el, ind) in GET_BOARD" :key="ind">
          <div>
            <div v-show="ind === 0"><img src="../assets/leaderboard/1st.png" alt="First place"></div>
            <div v-show="ind === 1"><img src="../assets/leaderboard/2nd.png" alt="Second place"></div>
            <div v-show="ind === 2"><img src="../assets/leaderboard/3rd.png" alt="Third place"></div>
            <div class="default_text non-prize-place" v-show="ind > 2">{{ ind + 1 }}</div>
          </div>
          <div :class="{'golden_user': ind === 0, 'prize_user': ind > 0 && ind < 3, 'default_user': ind >= 3}">{{ el.bettor }}</div>
          <div class="mobile_hidden cell_bet_amount">{{ el.bet_amount }}</div>
          <div>
            <div v-if="(el.profit - el.bet_amount)>=0" class="amount">{{ Number(el.profit).toFixed(4) }}</div>
            <div v-else class="amount_red">{{ Number(el.profit).toFixed(4) }}</div>
          </div>
          <div class="bonus mobile_hidden">{{ bonus(ind) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from '@/utils/network';
import { mapGetters, mapActions } from 'vuex';
const dfuse_api = require('@/utils/dfuse');

export default {
  data() {
    return {
      leaderboard_bonus_total: 0,
      leader_bonus_ratios: [0.3, 0.25, 0.2, 0.15, 0.1]
    };
  },

  mounted() {
    dfuse_api.updateDailyLeaderboard(this);
    dfuse_api.subscribeBalance(false, "eosio.token", network.leaderboard_contract, "EOS", this, (obj, x) => {obj.leaderboard_bonus_total = x});

    /* timer start*/
    var currentTimer;
    getSecondsToday();

    function getSecondsToday() {
      var now = new Date();
      var nowUTC = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();
      currentTimer = (nowUTC > 45000) ? (131400 - nowUTC) : (45000 - nowUTC);
      return currentTimer;
    }

    function displayTimer(){
      var currentDate = new Date;
      currentDate.setHours(0, 0, currentTimer);
      var h = currentDate.getHours();
      var m = currentDate.getMinutes();
      var s = currentDate.getSeconds();
      var showTimer;
      h = (h < 10) ? "0" + h : h;
      m = (m < 10) ? "0" + m : m;
      s = (s < 10) ? "0" + s : s;
      showTimer = h + "h " + m + "m " + s + "s";
      document.getElementById("leaderboard-timer").innerText = showTimer;
      document.getElementById("leaderboard-timer").textContent = showTimer;
      setTimeout(displayTimer, 1000);
      currentTimer--;
    }

    displayTimer();
    /* timer end */
  },

  methods: {

    ...mapActions(['UPDATE_LEADERBOARD']),

    bonus(index) {
      return Number(index < this.leader_bonus_ratios.length ? this.leaderboard_bonus_total * this.leader_bonus_ratios[index] : 0).toFixed(4);
    }
  },

  computed: {
    ...mapGetters(['GET_BOARD', 'GET_LOCALE', 'GET_CURRENT_LOCALE'])
  }
}

/*var currentTimer;

getSecondsToday();

function getSecondsToday() {
  var now = new Date();
  var nowUTC = now.getUTCHours() * 3600 + now.getUTCMinutes() * 60 + now.getUTCSeconds();

  currentTimer = (nowUTC > 45000) ? (131400 - nowUTC) : (45000 - nowUTC);

    return currentTimer;
}

function displayTimer(){

  var currentDate = new Date;

  currentDate.setHours(0, 0, currentTimer);

  var h = currentDate.getHours();
    var m = currentDate.getMinutes();
    var s = currentDate.getSeconds();
    var showTimer;

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    showTimer = h + "h " + m + "m " + s + "s";

  document.getElementById("leaderboard-timer").innerText = showTimer;
  document.getElementById("leaderboard-timer").textContent = showTimer;

    setTimeout(displayTimer, 1000);

    currentTimer--;
}

displayTimer();*/
</script>

<style scoped>
.board-wrapper {
  width: 522px;
  height:418px;
  border-radius:3px;
  background:rgba(255, 255, 255, 0.05);
}

.board-wrapper:hover {
  border-color: #fff;
}

.board-wrapper .table .table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.board-wrapper .table .table-row-cells {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.board-wrapper .table .table-head {
  padding: 15px 30px 0;
/*  background-color: #030615;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;*/
}
.board-wrapper .table .table-body .table-row {
  padding: 0 30px;
  font-family: 'hel-r';
}

.board-wrapper .table .table-head div {
  color: #5d6d94;
  font-family: 'hel-r';
  font-size: 16px;
}
.board-wrapper .table .table-head .table-row-cells div {
  color: #5d6d94;
  font-family: 'hel-l';
  font-size: 16px;
  font-weight: 300;
}

.board-wrapper .table .table-body .table-row-cells div{
  word-wrap:break-word;
}
.board-wrapper .table .table-body .table-row-cells > div:first-child,
.board-wrapper .table .table-head .table-row-cells > div:first-child{
  width:65px;
  margin-right:10px;
}
.board-wrapper .table .table-body .table-row-cells > div:nth-child(2),
.board-wrapper .table .table-head .table-row-cells > div:nth-child(2){
  width:120px;
  margin-right:10px;
}
.board-wrapper .table .table-body .table-row-cells > div:nth-child(3),
.board-wrapper .table .table-head .table-row-cells > div:nth-child(3){
  width:90px;
  margin-right:10px;
}
.board-wrapper .table .table-body .table-row-cells > div:nth-child(4),
.board-wrapper .table .table-head .table-row-cells > div:nth-child(4){
  width:90px;
  margin-right:10px;
}
.bonus.mobile_hidden,
.board-wrapper .table .table-head .table-row-cells div:last-child.mobile_hidden{
  width:60px;
}

.board-wrapper .table .table-body .table-row{
  margin-top:32px;
  margin-bottom:16px;
}
.board-wrapper .table .table-body .table-row:first-child{
  margin-top:15px;
}
.board-wrapper .table .table-body .table-row:nth-child(2){
  margin-top:36px;
}
.game .board-wrapper .table .table-body .table-row:nth-child(n + 6){
  display:none;
}

/*.board-wrapper .table .table-body .table-row:nth-child(even) {
  background: #030615;
}

.board-wrapper .table .table-body .table-row:nth-child(odd) {
  background: #0d1023;
}*/

.board-wrapper .table .table-head .table-row > div svg {
  font-size: 30px;
  transition: color .3s ease-in-out;
  cursor: pointer;
}

.board-wrapper .table .table-head .table-row > div span {
  color: #fff;
}

.board-wrapper .table .table-head .table-row > div svg:hover {
  color: #fff;
}

.board-wrapper .table .table-head .table-row:first-child {
  margin-bottom: 30px;
}

.golden_user {
  color: #ffa704!important;
}

.prize_user,
.default_user{
  color: #ffffff;
}
.board-wrapper .table .table-body .non-prize-place,
.board-wrapper .table .table-body .default_user{
  font-family: 'hel-l';
  font-size: 16px;
  font-weight: 300;
}

.default_text {
  color: #5d6d94;
}
.cell_bet_amount{
  color:#fff;
}

.amount {
  color: #2cff40;
}

.amount_red {
  color: #dddd;
}

.bonus {
  color: #41e1ef;
}

.leaderboard-timer{
  font-family:'hel-r';
  font-size:16px;
  color:#fff;
}


/*@media screen and (max-width: 1620px) {
  .board-wrapper {
    width: 70%;
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 960px) {
    .board-wrapper {
      width: 100%!important;
    }
  }


@media screen and (max-width: 780px) {
  .table {
    width: 80vw!important;
    margin: 0 auto;
  }
  .mobile_hidden {
    display: none;
  }
}

@media screen and (max-width: 560px) {
  .table {
    width: 95vw!important;
  }
  .table-row {
    padding: 20px 15px!important;
  }
  .table-head {
    padding: 20px 10px 10px!important;
  }
  .board-wrapper .table .table-head .table-row:last-child > div {
    width: calc(100% / 3);
  }
  .display {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .board-wrapper .table .table-body .table-row > div, .board-wrapper .table .table-head:last-child .table-row > div {
    width: calc(100% / 3)!important;
    text-align: center;
  }
}*/


</style>
