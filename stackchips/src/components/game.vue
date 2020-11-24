<template>
  <section class="game">
    <div class="game_wrapper">
      <leaderboard class="board" />
      <div class="game_overlay">
        <div v-show="notifyIsVisible" class="bet_plugs">
          <transition name="slide-fade" appear v-for="(key, ind) in GET_ORDERS" :key="ind">
            <div v-show="GET_PLUGS_STATE" class="notify_plug">
              <p class="bet_result" :class="{bet_positive: key.payout !== '0.0000 EOS', bet_negative: key.payout === '0.0000 EOS'}">
                {{ BET_RESULT(key).eos }}
              </p>
              <p v-show="BET_RESULT(key).win" class="bet_token">{{ BET_RESULT(key).token }}</p>
              <p class="bet_count">{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.bet_plug_text.bet }} {{ key.amount }}</p>
            </div>
          </transition>
        </div>

        <transition name="slide-fade">
          <div v-if="notify.visible" class="notify_plug">
            <p :class="{title: true, notifErr: notify.type == 'error', notifSucc: notify.type == 'success'}">
              {{ notify.title }}
            </p>
            <p class="desc">{{ notify.desc }}</p>
          </div>
        </transition>

        <transition name="slide-fade" appear>
          <div v-show="upperNotify.visible" class="upper_notify">
            {{ upperNotify.info }}
          </div>
        </transition>

        <div class="form">
          <div class="form-group">
            <div>
              <!-- <h4 class="game_title">Classic Dice</h4> -->
              <label>Roll under to win</label>
              <div class="input-amount-group">
                <div class="input-group">
                  <input @change="checkBetamount" v-model="eos" />
                  <img v-if="modeEos" class="eos-logo eos-logo_eos" :src="eosLogo" />
                  <img v-else class="eos-logo eos-logo_token" :src="tokenLogo" />
                  <!-- <img class="eos-logo" :src="tokenLogo" /> -->
                </div>
                <ul class="amount-rate">
                  <li @click="setEOS(.5, $event.target)">1/2</li>
                  <li @click="setEOS(2, $event.target)">2x</li>
                  <li @click="setEOS(false, $event.target)">max</li>
                </ul>
              </div>
            </div>
            <div>
              <label>{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.payout_title }}</label>
              <div class="bet-cell">
                <span>{{payWin}}</span>
                <img v-if="modeEos" class="eos-logo" :src="eosLogo" />
                <img v-else class="eos-logo" :src="tokenLogo" />
                <!-- <img class="eos-logo" :src="tokenLogo" /> -->
              </div>
            </div>
          </div>
          <div class="info-container">
            <ul>
              <li>
                <label>{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.form_titles[0] }}</label>
                <span>{{rollUnder}}</span>
              </li>
              <li>
                <label>{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.form_titles[1] }}</label>
                <span>{{Number(payOut).toFixed(2)}}x</span>
              </li>
              <li>
                <label>{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.form_titles[2] }}</label>
                <span>{{winChance}}%</span>
              </li>
            </ul>
          </div>
        </div>

        <dice-slider :initial="rollUnder" :max="96" :min="2" />
        <div class="btn-roll">
          <div class="currentlucky-container">
            <span :class="{
                'animateUp': this.showUpAnimation,
                'animateDown': this.showDownAnimation }"
              class="token-animation">{{tokenAnim}}
            </span>
            <span>{{Number(currentLucky - staked - unstaking).toFixed(4)}}</span>
            <img v-if="modeEos" class="eos-logo" src="../assets/token.png" />
            <img v-else class="eos-logo" :src="tokenLogo" />
          </div>
          <button class="button" v-if="account" @click="makeBet($event.target)">{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.roll_btn }}</button>
          <button class="button" v-else @click="login($event.target)">LOGIN</button>
          <div class="currenteos-container">
            <span :class="{
                'animateUp': this.showUpAnimation,
                'animateDown': this.showDownAnimation
              }"
              class="eos-animation">{{animationTxt}}
            </span>
            <span>{{Number(currentEOS).toFixed(4)}}</span>
            <img v-if="modeEos" class="eos-logo" src="../assets/eos_active.png" />
            <img v-else class="eos-logo" src="../assets/eos_inactive.png" />
          </div>
        </div>
        <div class="autobet">
          <ul class="test toggle-bottom">
            <li>
              <span style="color: #4d5b7d;">{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.auto_bet.switch }}</span>
            </li>
            <li>
              <label class="switch-toggle outer">
                <input id="autobet" type="checkbox" name="autobet" value="0" v-model="autobet"/>
                <div>{{+this.autobet}}</div>
              </label>
            </li>
          </ul>
          <!-- <div class="popover__wrapper">
            <div id="question-mark-li" class="popover__title">
              <span class="question-mark" style="color: #41e1ef;">?</span>
            </div>
            <div class="push popover__content">
              <p class="popover__message">
                {{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.auto_bet.hint }}
              </p>
            </div>
          </div> -->
        </div>
      </div>

      <el-dialog :visible.sync="showAbout">
        <div v-if="GET_CURRENT_LOCALE === 'RU'" class="ru">
          <p class="dialog_title">Как играть</p>
            <ol class="dialog_list">
              <li>1. Убедитесь, что у вас есть учетная запись EOS. Для получения дополнительной информации о том, как её создать, <a href="//medium.com/dapppub/create-your-own-eos-account-easily-using-the-non-service-fee-dapp-signupeoseos-b15c5347f2fc" target="_blank">Кликните здесь</a>.</li>
              <li>2. Если вы еще этого не сделали, загрузите и установите <a href="//get-scatter.com/" target="_blank">Scatter</a>, кошелек EOS, который облегчает взаимодействие между пользователями и приложениями.</li>
              <li>3. Установите СВОЮ СТАВКУ. Это сумма EOS, на которую вы будете делать ставки.</li>
              <li>4. Настройте ползунок, чтобы изменить свой шанс на победу.</li>
              <li>5. Нажмите БРОСИТЬ КОСТЬ, чтобы сделать ставку.</li>
              <li>6. Если ваш номер меньше, чем ваш ROLL UND TO WIN, вы выигрываете!</li>
              <li>7. Если вы получили уведомление о том, что ваша транзакция не удалась, пожалуйста, убедитесь, что у вас достаточно процессора и пропускной способности, чтобы совершить транзакцию! Пожалуйста, используйте <a href="//eostoolkit.io/home" target="_blank">EOSToolkit</a> чтобы внести изменения в свой аккаунт!</li>
            </ol>
            <p class="dialog_desc">Вы можете просмотреть свой баланс EOS рядом с кнопкой ROLL DICE. Таблица под ползунком показывает последние ставки от всех игроков по всему миру.</p>
            <p class="dialog_desc">Остались вопросы? Обратитесь к нам по адресу <a href="https://t.me/StackChips" target="_blank">Телеграм</a> и мы будем рады помочь!</p>
        </div>
        <div v-if="GET_CURRENT_LOCALE === 'EN'" class="en">
          <p class="dialog_title">How To Play</p>
            <ol class="dialog_list">
              <li>1. Make sure you have an EOS account. For more information on how to create one, <a href="//medium.com/dapppub/create-your-own-eos-account-easily-using-the-non-service-fee-dapp-signupeoseos-b15c5347f2fc" target="_blank">click here</a>.</li>
              <li>2. If you haven’t already, download and install <a href="//get-scatter.com/" target="_blank">Scatter</a>, an EOS wallet that facilitates interaction between users and dApps.</li>
              <li>3. Set your BET AMOUNT. This is the amount of EOS you will be wagering.</li>
              <li>4. Adjust the slider to change your chance of winning.</li>
              <li>5. Click ROLL DICE to place your bet.</li>
              <li>6. If your number is lower than your ROLL UNDER TO WIN number, you win!</li>
              <li>7. If you get a notice that your transaction failed, please check that you have enough CPU & bandwidth to make the transaction! Please use <a href="//eostoolkit.io/home" target="_blank">EOSToolkit</a> to make any changes to your account!</li>
            </ol>
            <p class="dialog_desc">You can view your EOS balance next to the ROLL DICE button. The table below the slider bar shows recent bets from all players across the world.</p>
            <p class="dialog_desc">Still have questions? Reach out to us at <a href="https://t.me/StackChips" target="_blank">Telegram</a> and we’ll be happy to help!</p>
        </div>
      </el-dialog>

      <el-dialog class="dividends" :width="dialogWidth" :visible.sync="showDividends">
        <!-- <p class="dialog_title">{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.popups.dividends.title }}</p>
        <p class="dialog_desc">{{ GET_LOCALE[GET_CURRENT_LOCALE].GAME.popups.dividends.desc }} {{dividends}}</p> -->
        <div class="tabs">
          <div @click="switchTab('project')" class="tab active_tab">
            <font-awesome-icon icon="chart-bar" />
            <p class="title">Project Stats</p>
          </div>
          <div @click="switchTab('my')" class="tab">
            <font-awesome-icon icon="user-cog" />
            <p class="title">My Stats</p>
          </div>
          <div @click="switchTab('stake')" class="tab">
            <font-awesome-icon icon="shield-alt" />
            <p class="title">Stake</p>
          </div>
        </div>

        <transition name="fade">
          <div v-show="currentModal == 'project'" class="dashboard proj_dash">
            <div class="panel">
              <div class="info-icon">?</div>
              <p class="panel_title">Total Dividends Paid</p>
              <div class="panel_info">
                {{Number(totalDivsPaid).toFixed(4)}}<span class="bottom">EOS</span>
              </div>
            </div>
            <div class="panel panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Total Bets</p>
              <div class="panel_info">{{ total_bets }}</div>
            </div>
            <div class="panel panel-dark panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Total Mined</p>
              <div class="panel_info">
                <p>{{ mined_total() }}<span class="right">({{ Number(mined_total() / 10000000000).toFixed(2) }}%)</span></p><span class="bottom">STACK</span>
              </div>
            </div>
            <div class="panel panel-dark panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Total Prizes Paid</p>
              <div class="panel_info">
                {{ total_out }}<span class="bottom">EOS</span>
              </div>
            </div>
            <div class="panel panel-dark panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Leaderboard Pool</p>
              <div class="panel_info">
                {{ leaderboardBalance }}<span class="bottom">EOS</span>
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade" appear>
          <div v-show="currentModal == 'my'" class="dashboard my_dash">
            <div class="panel panel_wide">
              <div class="info-icon">?</div>
              <p class="panel_title">My Balance</p>
              <div class="bottom_part">
                <div class="panel_info">
                  {{ Number(this.total_paid).toFixed(4) }}<span class="bottom">EOS</span>
                </div>
                <div class="panel_info">
                  {{staked}}<span class="bottom">STACK<!--Staked ({{my_staked_share()}}%)--></span>
                </div>
              </div>
            </div>
            <div class="panel panel-dark panel_wide">
              <div class="info-icon">?</div>
              <p class="panel_title">My Dividends</p>
              <div class="panel_info">{{ my_accu_bonus() }}<br> <span class="bottom">EOS</span></div>
            </div>
            <div class="btn_overlay">
              <button @click="claimDividends()" class="button">get dividends</button>
            </div>
<!--             <div class="panel panel-dark panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Staked Token Share</p>
              <div class="panel_info">2000</div>
            </div>
            <div class="panel panel-dark panel_stricted">
              <div class="info-icon">?</div>
              <p class="panel_title">Expected Dividend Per My Share</p>
              <div class="panel_info">
                2000 <br> <span class="bottom">EOS</span>
              </div>
            </div> -->
          </div>
        </transition>

        <transition name="fade" appear>
          <div v-show="currentModal == 'stake'" class="dashboard stake_dash">
            <div class="panel panel_wide stake_dash_main-panel">
              <!-- <div class="info-icon">?</div> -->
              <p class="panel_title">Total Staked STACK</p>
              <div class="panel_info">
                {{ totalStaked }}<span class="bottom">STACK</span>
              </div>
            </div>
            <div class="panel panel_wide stake_dash_panel">
              <div class="info-icon">?</div>
              <div class="blocks">
                <div class="block panel_stricted">
                  <p class="block_title">Available to Stake</p>
                  <p class="block_price">{{ my_available_to_stake() }} STACK</p>
                  <div class="field">
                    <input @change="update_stake" v-model="to_stake">
                    <div class="img_box">
                      <img src="../assets/token.png" alt="token">
                    </div>
                  </div>
                  <div class="buttons">
                    <button @click="stakeTokens()" class="button btn_stakedash_stake">Stake</button>
                  </div>
                </div>
                <div class="block panel_stricted">
                  <p class="block_title">Available to Unstake</p>
                  <p class="block_price">{{ my_available_to_unstake() }} STACK</p>
                  <div class="buttons">
                    <div class="field">
                      <input @change="update_unstake" v-model="to_unstake">
                      <div class="img_box">
                        <img src="../assets/token.png" alt="token">
                      </div>
                    </div>
                  </div>
                  <div class="buttons">
                    <button @click="unstakeTokens()" class="button btn_stakedash_unstake">Unstake</button>
                  </div>
                  <p v-if="unstaking>0" class="unstaking_price">unstaking: {{ unstaking }} STACK</p>
                </div>
              </div>
            </div>
            <div class="panel panel_wide stake_dash_panel">
              <div class="info-icon">?</div>
              <p class="panel_title">Buy Tokens</p>
              <div class="fields">
                <div class="field">
                  <input @input="calcCurrency($event.target)" v-model="eos_count" type="text" data-target="eos">
                  <div class="img_box img_box-eos">
                    <img src="../assets/eos_active.png" alt="eos">
                  </div>
                </div>
                <div class="dashes">
                  <span></span>
                  <span></span>
                </div>
                <div class="field">
                  <input @input="calcCurrency($event.target)" v-model="token_count" type="text" data-target="token">
                  <div class="img_box img_box-token">
                    <img src="../assets/token.png" alt="token">
                  </div>
                </div>
              </div>
              <div class="btn_box">
                <button @click="buyTokens()" class="button btn_stakedash_buy">Buy</button>
              </div>
            </div>
          </div>
        </transition>

      </el-dialog>

      <el-dialog :width="dialogWidth" :visible.sync="showReferrals">
        <div v-if="GET_ACCOUNT.name" class="isAuth">
          <p class="dialog_title">Your personal link: </p>
          <input class="dialog_field" :value="refLink" type="text" readonly>
        </div>
        <div v-else class="isNotAuth">
          <p class="dialog_title">Please login to get your personal referral link. </p>
        </div>
      </el-dialog>

    </div>
  </section>
</template>

<script>
  import fetch from '@/utils/api';

  import eosLogo from '@/assets/eos_active.png';
  import tokenLogo from '@/assets/token.png';
  import eventHub from '@/utils/event';
  import network from '@/utils/network';

  // Importing maps from VUEX
  import { mapGetters, mapActions } from 'vuex';

  // Importing components
  import leaderboard from './leaderboard.vue';
  import orders from './orders.vue';

  // Importing Scatter and eosjs
  import ScatterJS, {Network} from 'scatterjs-core';
  import ScatterEOS from 'scatterjs-plugin-eosjs2';
  import ScatterLynx from 'scatterjs-plugin-lynx';
  import { Api, JsonRpc, RpcError } from 'eosjs';
  import createHash from 'create-hash';

  const dfuse_api = require('@/utils/dfuse');
  const scatter_api = require('@/utils/scatter');

  const presalePrice = 2000;

  ScatterJS.plugins( new ScatterEOS(), new ScatterLynx() );
  const EOSNetwork = ScatterJS.Network.fromJson({
      name: 'eos',
      token: {contract: "eosio.token", symbol: "EOS", decimals: 4, name: "EOS"},
      blockchain:'eos',
      host: network.host,
      port:443,
      protocol:'https',
      chainId: network.chainId
  });


  // DFUSE API
  const { EoswsClient, createEoswsSocket, InboundMessageType } = require("@dfuse/eosws-js");
  function waitFor(ms) {return new Promise((resolve) => setTimeout(resolve, ms))}

  const follow_client = new EoswsClient(createEoswsSocket(() =>
    new WebSocket(`wss://${network.dfuse_endpoint}/v1/stream?token=${network.dfuse_token}`))
  )

  export default {

    data() {
      return {
        connected: false,
        eosLogo,
        tokenLogo,
        modeEos: true,
        eos: 0.1,
        autobet: 0,
        rollUnder: 50,

        // player stats
        currentEOS: 0,
        currentLucky: 0,
        staked: 0,
        unstaking: 0,
        total_paid: 0,
        last_div_balance: 0,

        // game stats
        dividends: 0,
        poolBalance: 0,
        minerBalance: 0,
        totalStaked: 0,
        totalUnstaking: 0,
        totalDivsPaid: 0,
        leaderboardBalance: 0,
        teamfund: 0,
        total_bets: 0,
        total_in: 0,
        total_out: 0,
        presale_balance: 0,

        to_stake: 0,
        to_unstake: 0,
        buyTokensEos: 10,

        follow_bet: false,
        follow_seeds : [],

        timer: 0,
        animationTxt: 0,
        tokenAnim: '',
        actionTxt: 'ROLL DICE',
        showAbout: false,
        showSocial: false,
        showDividends: false,
        showNews: false,
        showReferrals: false,
        animating: false,
        showUpAnimation: false,
        showDownAnimation: false,
        sending: false,
        scatter: null,
        eosapi: null,
        result: null,
        rpc: null,
        currentModal: 'project',
        refLink: '',
        requiredFields: {},
        PLUG_COUNTDOWN: 5, // A count of seconds before starting transparentizing
        PLUG_INTERVAL: 50, // A speed of transparentizing notification
        notify: {
          title: '',
          desc: '',
          type: '',
          visible: false,
          duration: 5 // How much time in seconds notification will be visible
        },
        upperNotify: {
          info: '',
          visible: false,
          duration: 5
        },
        dialogWidth: "50%",
        notifyIsVisible: true,
        eos_count: 10,
        token_count: 0,
        account : null
      };
    },

    mounted() {
      /*if(window.innerWidth <= 1400 && window.innerWidth > 960) {
        this.dialogWidth = "60%";
      } else if(window.innerWidth <= 960 && window.innerWidth > 560) {
        this.dialogWidth = "80%";
      } else if(window.innerWidth <= 560) {
        this.dialogWidth = "90%";
      }*/

      this.scatter = ScatterJS.scatter;

      this.token_count = this.eos_count * this.GET_TOKEN_COURSE;

      eventHub.$on('ROLLUNDER_CHANGE', rollUnder => this.rollUnder = rollUnder);
      eventHub.$on('SHOW_ABOUT', () => this.showAbout = true);
      eventHub.$on('SHOW_DIVIDENDS', () => this.showDividends = true);
      eventHub.$on('SHOW_SOCIAL', () => this.showSocial = true);
      eventHub.$on('SHOW_NEWS', () => this.showNews = true);
      eventHub.$on('SHOW_REFERRALS', () => this.showReferrals = true);
      eventHub.$on('swapNotifyVisibility', () => this.swapNotifyVisibility());
      eventHub.$on('subscribeToPlayerData', () => this.subscribeToPlayerData());
      eventHub.$on('clearPlayerData', () => this.clearPlayerData());
      eventHub.$on('login', () => this.login());
      eventHub.$on('logout', () => this.logout());

      dfuse_api.subscribeBalance(false, "eosio.token", network.dice_contract, "EOS", this, (obj, x) => {obj.poolBalance = x});
      dfuse_api.subscribeBalance(false, "eosio.token", network.profits_contract, "EOS", this, (obj, x) => {obj.dividends = x});
      dfuse_api.subscribeBalance(false, "stacktokenxx", network.dice_contract, "STACK", this, (obj, x) => {obj.minerBalance = x});
      dfuse_api.subscribeBalance(false, "eosio.token", network.team_contract, "EOS", this, (obj, x) => {obj.teamfund = x});
      dfuse_api.subscribeBalance(false, "eosio.token", network.leaderboard_contract, "EOS", this, (obj, x) => {obj.leaderboardBalance = x});
      dfuse_api.subscribeBalance(false, "stacktokenxx", network.presale_contract, "STACK", this, (obj, x) => {obj.presale_balance = x});

      dfuse_api.updateTotalDividendsStats(this, (obj, staked, unstaking, total_paid) => {
        obj.totalStaked = staked;
        obj.totalUnstaking = unstaking;
        obj.totalDivsPaid = total_paid;
        // console.log("total div stats: ", obj.totalStaked, obj.totalUnstaking, obj.totalDivsPaid);
      });

      dfuse_api.updateGameStats(this, (obj, total_bets, total_in, total_out) => {
        obj.total_bets = total_bets;
        obj.total_in = total_in;
        obj.total_out = total_out;
        // console.log("game stats: total bets: ", this.total_bets, " in: ", this.total_in, " out: ", this.total_out);
      });

      if(JSON.parse(localStorage.getItem('notify')) !== null) {
        this.notifyIsVisble = JSON.parse(localStorage.getItem('notify'));
      }

      this.login();
    },

    methods: {

      ...mapActions(['CHANGE_PLUGS_STATE', 'DROP_ORDERS', 'CHANGE_ROLL', 'UPDATE_EOS', 'UPDATE_ACCOUNT']),

      login(el = false) {
        console.log("login");
        el ? this.btnAnim(el) : false;
        if (!this.connected) {
          this.scatter.connect(network.app_title).then(c => {
            if (!c) {
              console.log("Could not connect to Scatter");
              this.connected = false;
            } else {
              console.log("connected to Scatter...")

              window.ScatterJS = null;

              this.connected = true;
              this.requiredFields = {accounts: [EOSNetwork]};
              this.rpc = new JsonRpc(EOSNetwork.fullhost());
              // let eos = this.scatter.eos(EOSNetwork, Api, {rpc: this.rpc beta3:true});
              let eos = ScatterJS.eos(EOSNetwork, Api, {rpc: this.rpc, beta3:true});
              this.eosapi = eos;
              this.$store.commit('UPDATE_EOS', eos);

              this.getIdentity();
            }
            return true;
          });
        }
        this.getIdentity();
      },

      getIdentity() {
        if (!this.connected) return;
        this.scatter.getIdentity(this.requiredFields).then(() => {
          console.log("got identity from scatter");
          // const account = this.scatter.identity.accounts.find(account => account.blockchain === 'eos');
          const account = ScatterJS.account('eos');
          if (!account) return;
          this.account = account;
          this.$store.commit('UPDATE_ACCOUNT', account);

          this.subscribeToPlayerData();
          if (!this.follow_bet) this.followAllBets();
        }).catch(e => {
          this.$message.warning(e.message);
        });
      },

      logout(){
        console.log("logout");
        if (this.scatter) {
          this.scatter.forgetIdentity();
          this.account = null;
          this.$store.commit('UPDATE_ACCOUNT', {});
          this.clearPlayerData();
        }
      },

      calcCurrency (el) {
        if(el.dataset.target === 'eos') {
          this.eos_count > this.currentEOS ? this.eos_count = this.currentEOS : false;
          setTimeout(() => this.token_count = this.eos_count * this.GET_TOKEN_COURSE, 200);
        } else {
          // this.token_count > this.currentLucky ? this.token_count = this.currentLucky : false;
          setTimeout(() => this.eos_count = this.token_count / this.GET_TOKEN_COURSE, 200);
        }
      },

      swapNotifyVisibility () {
        this.notifyIsVisible = !this.notifyIsVisible;
        localStorage.setItem('notify', JSON.stringify(this.notifyIsVisible));
      },

      switchTab (modal) {
        this.currentModal = modal;
        const tabs = Array.from(document.querySelectorAll('.tab'));
        tabs.map(tab => tab.addEventListener('click', function() {
          this.classList.add('active_tab');
        }));
        tabs.map(tab => tab.classList.remove('active_tab'));
        //this.classList.add('active_tab');
      },

      btnAnim (el) {
        el.classList.remove('animate');
        el.classList.add('animate');
        setTimeout(() => el.classList.remove('animate'), 1500);
      },

      showNotification (options) {
        this.notify.title = options.title;
        this.notify.desc = options.desc;
        this.notify.type = options.type;
        this.notify.visible = true;
        setTimeout(() => this.notify.visible = false, this.notify.duration * 1000);
      },

      showUpperNotification (info) {
        this.upperNotify.info = info;
        this.upperNotify.visible = true;
        setTimeout(() => this.upperNotify.visible = false, this.upperNotify.duration * 1000);
      },

      plugTransparentize (el) {
        const container = document.querySelector('.bet_plugs');
        let opacity = 1;
        setTimeout(() => {
          let int = setInterval(() => {
            if(opacity <= 0) {
              clearInterval(int);
              container.removeChild(el);
            } else {
              el.style.opacity = opacity;
              opacity -= .02;
            }
          }, this.PLUG_INTERVAL);
        }, this.PLUG_COUNTDOWN * 1000);
      },

      my_accu_bonus() {
        if (this.totalStaked > 0 && this.staked > 0 && this.dividends > 0) {
          const mystake = this.staked / this.totalStaked;
          const last_balance = this.last_div_balance ? Number(this.last_div_balance) : 0;
          const divs = (this.dividends + this.totalDivsPaid - last_balance) * mystake;
          // console.log("divs: mystake: ", mystake, " dividends bal: ", this.dividends, " total divs paid: ", this.totalDivsPaid, " last balance: ", last_balance);
          // console.log("divs: ", divs);
          return Number(divs).toFixed(4);
        } else return 0;
      },

      my_staked_share() {
        if (this.totalStaked>0) {
          return Number(this.staked / this.totalStaked * 100).toFixed(4);
        } else return 0;
      },

      mining_reward(bet_amount) {
        return bet_amount * 100;
      },

      mined_total() {
        return Number(1000000 - this.minerBalance).toFixed(0);
      },

      my_available_to_stake() {
        return Number(this.currentLucky - this.staked - this.unstaking).toFixed(4);
      },

      my_available_to_unstake() {
        return Number(this.staked - this.unstaking).toFixed(4);
      },

      BET_RESULT (key) {
        let res = {};
        key.payout == "0.0000 EOS" ? (res.eos = `${this.GET_LOCALE[this.GET_CURRENT_LOCALE].GAME.bet_plug_text.neg} ${key.amount}`, res.token = '', res.win = false)
                                                    : (res.eos = `${this.GET_LOCALE[this.GET_CURRENT_LOCALE].GAME.bet_plug_text.pos} ${key.payout}`, res.token = `${+key.amount.split(' ')[0] * 100} STACK`, res.win = true);
        return res;
      },

      showOrders () {
        console.log(this.GET_ORDERS);
      },

      setEosInstance(rpc = null) {
        // console.log("setEosInstance");
        let eos;
        if (ScatterJS.scatter && rpc){
            eos = ScatterJS.scatter.eos(EOSNetwork, Api, {rpc: rpc});
        } else {
            eos = new Api({ rpc: this.rpc });
        }
        this.$store.commit('UPDATE_EOS', eos);
      },

      update_stake_info() {
        this.to_stake = Number(this.currentLucky - this.staked - this.unstaking).toFixed(4);
      },

      floor(value, decimals) {
        return Number(Math.floor(value+'e'+decimals)+'e-'+decimals);
      },

      maxBetAmount() {
        return this.floor(this.poolBalance / 10 / (98.5 / this.winChance) * 0.9, 2);
      },

      getAmount(asset_string) {
        return Number(asset_string.replace(/\sEOS/, ''));
      },

      swapInp (el) {
        const lis = Array.from(document.querySelectorAll('.amount-rate li'));
        lis.map(key => key.classList.remove('li_active'));
        el.classList.add('li_active');
      },

      setEOS(rate, el) {
        this.swapInp(el);
        let eosbalance = rate ? this.eos * rate : this.currentEOS;
        switch (true) {
          case (eosbalance < 0.1):
            eosbalance = 0.1;
            break;
          case (eosbalance > this.currentEOS):
            eosbalance = this.currentEOS;
            break;
          case (eosbalance > this.maxBetAmount()):
            eosbalance = this.maxBetAmount();
            break;
        }
        this.eos = Number(eosbalance).toFixed(2);
      },

      makeBet(el = false) {
        el ? this.btnAnim(el) : false;
        let maxAmount = this.maxBetAmount();
        // console.log("make a bet, autobet: ", this.autobet, "maxbet:", maxAmount);
        if (this.eos > maxAmount) {
          this.showNotification({
            title: 'Bet Failed',
            desc: `Bet Amount should not be more than ${maxAmount.toFixed(4)} EOS`,
            type: 'error'
          });
          return;
        }
        const minBetAmount = 0.01;
        if (this.eos < minBetAmount) {
          this.showNotification({
            title: 'Bet Failed',
            desc: `Bet Amount should be more than ${maxAmount.toFixed(4)} EOS`,
            type: 'error'
          });
          return;
        }

        if (!this.scatter) {
          console.log("scatter not detected, quitting...");
          return;
        }

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);

        let referrer = params.get("ref") || 'stackteamxxx';
        // console.log("ref: ", referrer);

        this.showEOSAnimation = true;
        this.showUpperNotification(this.GET_LOCALE[this.GET_CURRENT_LOCALE].GAME.upperNotify);

        const dice_api_url = "https://dice888.herokuapp.com/";
        // const dice_api_url = "http://localhost:5000/";
        fetch(dice_api_url, {
          method: 'POST',
          mode: 'cors',
          headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
          body: 'roll_under=' + this.rollUnder + '&referrer=' + referrer
        }).then(({ expiration_timestamp, seed, signature }) => {
          // console.log("seed:", seed);
          // console.log("expiration_timestamp", expiration_timestamp);
          // console.log("signature", signature);
          const memo = `${this.rollUnder}-${seed}-${this.getClientSeed()}-${expiration_timestamp}-${referrer}-${signature}`;
          // console.log("memo:", memo);

          scatter_api.transferFunds(this, "eosio.token", this.account.name, network.dice_contract, Number(this.eos).toFixed(4), "EOS", memo, this.account.authority, (result) => {
            // console.log("trx result: ", result);
            this.animating = true;

             this.showNotification({
              title: 'Bet Success',
              desc: 'Waiting for bet result',
              type: 'success'
            });

            this.followBet(seed);
          }, (e)=> {
              this.showNotification({
                title: 'Error',
                desc: e.message || JSON.parse(e).error.details[0].message,
                type: 'error'
              });
              console.log("Error: ", e.message || JSON.parse(e).error.details[0].message);
          });
        });
      },

      getClientSeed() {
        let randomNumber = Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
        return createHash('sha1').update(this.account.name + Date.now() + randomNumber).digest('hex');
      },

      followBet(seed_hash) {
        this.follow_seeds.push(seed_hash);
        this.follow_bet = true;
        // console.log("seeds: ", this.follow_seeds);
      },

      async followAllBets() {
        console.log("follow all bets..");

        follow_client
          .connect()
          .then(() => {
            follow_client
              .getActionTraces({ account: network.dice_log_contract, action_name: "result" })
              .onMessage((message) => {
                // console.log("got new bet result: ", message);
                if (this.follow_bet && this.follow_seeds.length > 0 && message.type === InboundMessageType.ACTION_TRACE && message.data && message.data.trace && message.data.trace.act && message.data.trace.act.data) {
                  if (message.data.trace.act.account === network.dice_log_contract
                    && message.data.trace.act.name === 'result'
                    && message.data.trace.act.data.result.player === this.account.name)
                  {
                    const seed_hash = message.data.trace.act.data.result.seed_hash;
                    const seedIndex = this.follow_seeds.findIndex(x => x == seed_hash);
                    if (seedIndex>=0) {
                      // console.log("found seed: ", seedIndex);
                      // console.log("found bet result", message.data.trace.act.data.result);
                      this.follow_seeds.splice(seedIndex, 1);
                      // console.log("seeds: ", this.follow_seeds);

                      const { payout, roll_under, random_roll } = message.data.trace.act.data.result;

                      this.CHANGE_ROLL({
                        border: roll_under,
                        value: random_roll
                      });
                      this.CHANGE_PLUGS_STATE(true);

                      if (payout === '0.0000 EOS') {
                        this.showDownAnimation = true;
                        this.animationTxt = payout.replace(/\sEOS/, '');
                        // console.log('ANIM_1', +payout_list[0].split(' ')[0]);
                        // this.tokenAnim = `${+payout_list[0].split(' ')[0]} TOKENS`;
                      } else {
                        this.showUpAnimation = true;
                        this.animationTxt = payout;
                        this.tokenAnim = `${+payout.split(' ')[0] * 100} EOS`;
                      }

                      setTimeout(() => {
                        this.showDownAnimation = false;
                        this.showUpAnimation = false;
                      }, 3100);
                      this.animating = false;
                      if (this.autobet) this.makeBet();
                    }
                  } else console.log("not my stake...")
                }
              });
          })
          .catch((error) => {
            console.log("Unable to connect to dfuse endpoint.", error);
            return;
          });
          // await waitFor(10000);
      },

      subscribeToPlayerData() {
        console.log("subscibeToPlayerData");
        dfuse_api.subscribeBalance(true, "eosio.token", this.account.name, "EOS", this, (obj, x) => {obj.currentEOS = x});
        dfuse_api.subscribeBalance(true, network.game_token_contract, this.account.name, network.game_token_sym, this,
          (obj, x) => {
            obj.currentLucky = x;
            this.update_stake_info()});
        dfuse_api.updateMyDividendsStats(this.account.name, this, (obj, staked, unstaking, total_paid, last_balance) => {
          obj.staked = staked;
          obj.unstaking = unstaking;
          obj.total_paid = total_paid;
          obj.to_stake = Number(obj.currentLucky - obj.staked - obj.unstaking).toFixed(4);
          obj.to_unstake = Number(obj.staked).toFixed(4);
          obj.last_div_balance = last_balance;
          // console.log("my div stats: staked, unstaking, total_paid: ", obj.staked, obj.unstaking, obj.total_paid);
        });
      },

      clearPlayerData() {
        console.log("clear player data...");
        dfuse_api.cancel();
        this.currentEOS = 0;
        this.currentLucky = 0;
        this.staked = 0;
        this.unstaking = 0;
        this.total_paid = 0;
        this.to_stake = 0;
        this.to_unstake = 0;
        this.last_balance = 0;
      },

      checkBetamount() {
        this.eos = this.floor(this.eos,2);
      },

      maxTokenBuyAmount() {
        return this.presale_balance / presalePrice;
      },

      updateBuyTokens() {
        this.buyTokensEos = this.floor(this.buyTokensEos,4);
        if (this.buyTokensEos > this.maxTokenBuyAmount()) this.buyTokensEos = this.maxTokenBuyAmount();
        if (this.buyTokensEos < 1) this.buyTokensEos = 1;
        this.buyTokensResult = this.buyTokensEos * presalePrice;
      },

      update_unstake() {
        console.log("update unstake...");
        this.to_unstake = this.floor(this.to_unstake,4);
      },

      update_stake() {
        console.log("update stake...");
        this.to_take = this.floor(this.to_take, 4);
      },

      navigate(brand) {
        switch (brand) {
          case 'twitter':
            window.open('//twitter.com/chips_stack');
            break;
          case 'medium':
            window.open('//medium.com/@StackChips');
            break;
          case 'reddit':
            window.open('//www.reddit.com/user/StackChips');
            break;
          case 'telegram':
            window.open('//t.me/Stackchips_games');
            break;
        }
      },

      stakeTokens() {
        let maxAmount = this.currentLucky - this.staked - this.unstaking;
        console.log("stake tokens: ", this.to_stake);
        if (this.to_stake > maxAmount) {
          this.showNotification({
            title: 'Staking Failed',
            desc: `Stake Amount should not be more than ${maxAmount.toFixed(4)} STACK`,
            type: 'error'
          });
          return;
        }
        const minStakeAmount = 1;
        if (this.to_stake < minStakeAmount) {
          this.showNotification({
            title: 'Staking Failed',
            desc: `Stake Amount should be more than ${minStakeAmount.toFixed(4)} STACK`,
            type: 'error'
          });
          return;
        }

        if (!this.scatter) {
          console.log("scatter not detected, quitting...");
          return;
        }

        scatter_api.stakeTokenAction(this, this.account.name, Number(this.to_stake).toFixed(4) + " STACK", this.account.authority, (result) => {
          console.log("staking finished with result: ", result);

           this.showNotification({
            title: 'Staked Successfully',
            desc: 'Waiting for staking result',
            type: 'success'
          });
        }, (e)=> {
            this.showNotification({
              title: 'Error',
              desc: e.message || JSON.parse(e).error.details[0].message,
              type: 'error'
            });
            console.log("Error: ", e.message || JSON.parse(e).error.details[0].message);
        });
      },

      unstakeTokens() {
        let maxAmount = this.staked;
        console.log("unstake tokens: ", this.to_unstake);
        if (this.to_unstake > maxAmount) {
          this.showNotification({
            title: 'Unstaking Failed',
            desc: `Amount should not be more than ${maxAmount.toFixed(4)} STACK`,
            type: 'error'
          });
          return;
        }
        const minStakeAmount = 1;
        if (this.to_unstake < minStakeAmount) {
          this.showNotification({
            title: 'Unstaking Failed',
            desc: `Amount should be more than ${minStakeAmount.toFixed(4)} STACK`,
            type: 'error'
          });
          return;
        }

        if (!this.scatter) {
          console.log("scatter not detected, quitting...");
          return;
        }

        scatter_api.unstakeTokenAction(this, this.account.name, Number(this.to_unstake).toFixed(4) + " STACK", this.account.authority, (result) => {
          console.log("unstaking finished with result: ", result);

           this.showNotification({
            title: 'Unstaked Successfully',
            desc: 'Waiting for staking result',
            type: 'success'
          });
        }, (e)=> {
            this.showNotification({
              title: 'Error',
              desc: e.message || JSON.parse(e).error.details[0].message,
              type: 'error'
            });
            console.log("Error: ", e.message || JSON.parse(e).error.details[0].message);
        });
      },

      claimDividends() {
        const divAmount = this.my_accu_bonus();
        console.log("claim divs: ", divAmount);
        if (divAmount <= 0) {
          this.showNotification({
            title: 'Claim Dividends Failed',
            desc: `Not enough dividends to claim`,
            type: 'error'
          });
          return;
        }

        if (!this.scatter) {
          console.log("scatter is not detected, quitting...");
          return;
        }

        scatter_api.claimAction(this, this.account.name, this.account.authority, (result) => {
          console.log("claim dividends finished with result: ", result);

           this.showNotification({
            title: 'Dividends Claimed Successfully',
            desc: 'Waiting for dividends',
            type: 'success'
          });
        }, (e)=> {
            this.showNotification({
              title: 'Error',
              desc: e.message || JSON.parse(e).error.details[0].message,
              type: 'error'
            });
            console.log("Error: ", e.message || JSON.parse(e).error.details[0].message);
        });
      },

      buyTokens() {
        let maxAmount = this.maxTokenBuyAmount();
        console.log("buy tokens on presale: ", this.buyTokensEos);
        if (this.buyTokensEos > maxAmount) {
          this.showNotification({
            title: 'Purchase Failed',
            desc: `Purchase Amount should not be more than ${maxAmount.toFixed(4)} EOS`,
            type: 'error'
          });
          return;
        }
        const minAmount = 1;
        if (this.buyTokensEos < minAmount) {
          this.showNotification({
            title: 'Purchase Failed',
            desc: `Amount should be more than ${minAmount.toFixed(4)} EOS`,
            type: 'error'
          });
          return;
        }

        if (!this.scatter) {
          console.log("scatter not detected, quitting...");
          return;
        }

        scatter_api.transferFunds(this, "eosio.token", this.account.name, network.presale_contract, Number(this.eos_count).toFixed(4), "EOS", "", this.account.authority, (result) => {
          console.log("presale transfer finished with result: ", result);

           this.showNotification({
            title: 'Purchase Successful',
            desc: 'enjoy your STACK tokens from presale...',
            type: 'success'
          });
        }, (e)=> {
            this.showNotification({
              title: 'Error',
              desc: e.message || JSON.parse(e).error.details[0].message,
              type: 'error'
            });
            console.log("Error: ", e.message || JSON.parse(e).error.details[0].message);
        });
      },

      eosjs() {
        return this.$store.state.eosjs;
      },

    },

    watch: {
      account() {
        // this.setEosInstance();
      },
      animating() {
        const { animating } = this;
        if (!animating) {
          clearInterval(this.timer);
          this.actionTxt = 'ROLL DICE';
          return;
        }
        this.timer = setInterval(() => {
          this.actionTxt = (Math.random() * 100).toFixed(0);
        }, 100);
      },
      GET_PLUGS_STATE () {
        setTimeout(() => this.CHANGE_PLUGS_STATE(false), this.PLUG_COUNTDOWN * 1000);
        setTimeout(() => this.DROP_ORDERS(), (this.PLUG_COUNTDOWN + 2) * 1000);
      },
      GET_ACCOUNT_NAME () {
        this.refLink = `https://stackships.games/?ref=${this.GET_ACCOUNT_NAME}`;
      }
    },
    components: {
      diceSlider: require('@/components/slider').default,
      leaderboard,
      orders
    },
    computed: {
      ...mapGetters(['GET_ORDERS', 'GET_LOCALE', 'GET_CURRENT_LOCALE', 'GET_ACCOUNT', 'GET_PLUGS_STATE', 'GET_ACCOUNT_NAME', 'GET_TOKEN_COURSE']),

      winChance() {
        return this.rollUnder - 1;
      },

      payOut() {
        return 98.5 / this.winChance;
      },

      payWin() {
        return (this.eos * this.payOut).toFixed(4);
      },

      buyTokensResult() {
        return (this.buyTokensEos * 2000).toFixed(4);
      },

      // account(){
      //   // if (!this.scatter || !this.scatter.identity) return null;
      //   // return this.scatter.identity.accounts[0];
      //   return this.$store.state.account;
      // },
    }
  };
</script>

<style scoped>
  .dividends .tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .dividends .tabs{
    display: flex;
    align-items: center;
  }
  .dividends .tabs .tab{
    position:relative;
    color: #5d6d94;
    text-decoration: none;
    display:inline-block;
    font-weight: 400;
    font-size: 16px;
    vertical-align:middle;
    line-height:47px;
    height:47px;
    padding:0 25px;
    cursor: pointer;
    font-family:"hel-r";
    border-bottom: 3px solid transparent;
  }
  .dividends .tabs .tab p{
    display:inline-block;
  }
  .dividends .tabs .tab:after {
    content:'';
    position:absolute;
    left:0;
    top:50%;
    margin-top:-14px;
    height:30px;
    width:1px;
    background:#394471;
  }
  .dividends .tabs .tab:first-child:after{
    background:transparent;
  }
  .dividends .tabs .tab:hover,
  .dividends .tabs .tab.active_tab{
    color:#41e1ef;
    background-color:rgba(65, 225, 239, .1);
    border-bottom: 3px solid #41e1ef;
  }
  .dividends .tabs .tab:hover:after,
  .dividends .tabs .tab.active_tab:after{
    background:transparent;
  }
  .dividends .tabs .tab:hover + .tab:after,
  .dividends .tabs .tab.active_tab + .tab:after{
    background:transparent;
  }
  .dividends .tabs .tab {
    transition: border-color .3s ease-in-out, background-color .3s ease-in-out, color .3s ease-in-out;
  }
  .dividends .tabs .tab:after{
    transition: background-color .3s ease-in-out;
  }
  .dividends .tabs .tab svg {
    margin-right: 15px;
  }


  .dividends .stake_dash .blocks {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    margin-bottom: 50px;
  }

  .dividends .stake_dash .blocks .block{
    width:212px;
    margin-right: 11px;
    margin-left: 11px;
  }

  .dividends .stake_dash .blocks .block:first-child {
    position: relative;
  }
  .dividends .stake_dash .blocks .block:first-child:after{
    position: absolute;
    content: '';
    top: 16px;
    right: -12px;
    background:#5d6d94;
    width: 1px;
    height: 141px;
  }

  .dividends .stake_dash .blocks .block .block_title {
    font-size: 16px;
    font-family: 'hel-r';
    margin-bottom: 7px;
    color: #5d6d94;
  }

  .dividends .stake_dash .blocks .block .block_price {
    font-size: 22px;
    font-family: 'hel-r';
    margin-bottom: 25px;
  }

  .unstaking_price {
    font-size: 18px;
    font-family: 'hel-r';
    margin-top: 30px;
  }

  .dividends .stake_dash .blocks .block:first-child .block_price {
    color: #28df3c;
  }

  .dividends .stake_dash .blocks .block:last-child .block_price {
    color: #ffa704;
  }

  .dividends .stake_dash .blocks .block .block_buttons button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 13px 20px;
    border-radius: 22px;
    color: #ffffff;
    font-family: 'hel-r';
    background-color: #6dd5fa;
    background-image: linear-gradient(to right, #ffae00 0%, #fe5933 51%, #ff2c72 100%);
  }

  .dividends .stake_dash .buttons {
    margin-top: 20px;
  }
  .dividends .stake_dash .button{
    height: 36px;
    text-transform: none;
    border-radius:18px;
  }
  .dividends .stake_dash .btn_stakedash_stake{
    width: 81px;
  }
  .dividends .stake_dash .btn_stakedash_unstake{
    width: 90px;
  }
  .dividends .stake_dash .btn_stakedash_buy{
    width: 78px;
  }


  .dividends .stake_dash .blocks .block .block_buttons button:first-child {
    margin-right: 10px;
  }

  .dividends .stake_dash .field {
    width: 160px;
    height: 36px;
    margin: 0 auto;
    border-radius: 3px;
    background-color:rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
  }

  .dividends .stake_dash .field input {
    border: none;
    outline: none;
    text-align: center;
    font-family: 'hel-r';
    color: #ffffff;
    width: 110px;
    font-size:16px;
    line-height: 36px;
    height: 36px;
    border-radius: 3px;
    background-color:transparent;
  }

  .dividends .stake_dash .fields {
    margin-top: 44px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }

  .dividends .stake_dash .field .img_box {
    position: relative;
    padding: 0 14px;
    height:36px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .dividends .stake_dash .field .img_box:before{
    position: absolute;
    content: '';
    top: 8px;
    left:-1px;
    width: 1px;
    height: 19px;
    background: #5d6d94;
  }
  .dividends .stake_dash .field .img_box.img_box-eos{
    padding: 0 17px;
  }

  .dividends .stake_dash .fields .dashes {
    margin: 0 20px;
    width: 14px;
  }

  .dividends .stake_dash .fields .dashes span {
    display: block;
    background: #fff;
    width: 100%;
    height: 2px;
    margin-bottom: 3px;
  }

  .dividends .dashboard {
    margin-top: 44px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .dividends .dashboard .panel {
    border-radius: 3px 3px 0 0;
    background-color: #20354a;
    width: 212px;
    max-width: 212px;
    height: 160px;
    max-height: 160px;
    padding: 20px 25px 27px;
    border-bottom: 5px solid #41e1ef;
    margin-bottom: 15px;
    margin-right: 11px;
    margin-left: 11px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .dividends .stake_dash .panel.stake_dash_main-panel {
    background: url('../assets/stake_panel_bg.jpg') no-repeat center / cover;
  }

  .dividends .dashboard .panel.stake_dash_panel{
    background: rgba(255, 255, 255, 0.05) !important;
    border: none!important;
    height: 222px;
    max-height: 222px;
  }
  .dividends .dashboard .panel.stake_dash_panel:last-child{
    height: 208px;
    max-height: 208px;
  }

  .dividends .dashboard > div:last-child{
    margin-bottom:0 !important;
  }

/*   .dividends .panel_stricted {
    flex-basis: 45%!important;
  } */

  .dividends .panel_wide {
    width:446px !important;
    max-width: 446px !important;
    padding-left:0 !important;
    padding-right:0 !important;
  }

  .dividends .my_dash .panel .bottom_part {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .dividends .my_dash .panel .bottom_part .panel_info{
    width: 212px;
    margin-right: 11px;
    margin-left: 11px;
  }

  /* .dividends .my_dash .panel:nth-child(4) {
    margin-bottom: 0;
    margin-right: 22px;
  } */

  .dividends .my_dash .btn_overlay {
    margin: 10px 0 40px 0;
    flex-basis: 100%;
    text-align: center;
  }
  .dividends .my_dash .button{
    width: 180px;
  }

  .dividends .dashboard .panel.panel-dark {
    background:rgba(255, 255, 255, 0.07);
    border-bottom: none;
  }

  .dividends .dashboard .panel.panel-dark .panel_title {
    color: #5d6d94;
  }

/*   .dividends .dashboard .panel .panel_info p{
    max-width:100%;
    word-wrap:break-word;
  } */

  .dividends .dashboard .panel .panel_info .bottom {
    margin-top: 8px;
    display:block;
    color: #41e1ef;
    font-size: 12px;
    font-family: 'Montserrat';
    font-weight: 300;
  }
  .dividends .dashboard .panel.panel-dark .panel_info .bottom {
    color: #5d6d94;
  }

  .dividends .dashboard .panel .panel_info .right {
    margin-left:5px;
    color: #fff;
    font-size: 16px;
    font-family: 'Montserrat';
    font-weight: 300;
  }

  .dividends .dashboard .panel .info-icon {
    width: 15px;
    height: 15px;
    font-size: 11px;
    border-radius: 50%;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    position: absolute;
    top: 7px;
    right: 7px;
    cursor: pointer;
    opacity: 0.2;
    transition: opacity .3s ease-in-out;
    font-family: 'hel-l';
  }

  .dividends .dashboard .panel .info-icon:hover {
    opacity: 1;
  }

  .dividends .dashboard .panel .panel_title {
    font-family: 'hel-r';
    color: #5d6d94;
    position: relative;
    text-align: center;
    font-size:16px;
  }

  .panel_title::before {
    content: '';
    position: absolute;
    width: 34px;
    height: 1px;
    background-color: #41e1ef;
    bottom: -17px;
    left: 50%;
    margin-left:-17px;

  }

  .dividends .dashboard .panel .panel_info {
    color: #ffffff;
    font-family: 'Montserrat';
    font-weight: 300;
    font-size: 36px;
    margin-top: 36px;
    text-align: center;
  }

  .dividends .dashboard .panel .panel_info p {
    white-space: nowrap;
  }

/*   .dividends .dashboard .panel:nth-child(odd) {
    margin-right: 22px;
  } */

/*   .dividends .dashboard .panel:last-child {
    flex-basis: calc(90% + 22px);
    margin-right: 0;
    margin-bottom: 0;
  } */

  .game_wrapper {
    width: 1138px;
    height:470px;
    margin: 0 auto;
    padding:25px 34px 27px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background:rgba(255, 255, 255, 0.05);
    border-radius:6px;
  }

  .game_overlay {
    width: 513px;
    height:418px;
  }

  .divider {
    background: #394471;
    margin: 17px auto;
    display: block;
    height: 2px;
    width: 53px;
  }

  .dialog_title {
    font-size: 18px;
    font-family: 'hel-r';
    color: #5d6d94;
    margin-bottom: 10px;
  }

  .dialog_desc, .dialog_list {
    font-size: 14px;
    font-family: 'hel-l';
    color: #5d6d94;
    margin-bottom: 10px;
  }

  .dialog_field {
    border: none;
    outline: none;
    padding: 5px 10px;
    box-shadow: 0 0 20px #41e1ef;
    background: #030615;
    color: #41e1ef;
    font-family: 'hel-l';
    border-radius: 3px;
    width: 100%;
  }

  /**
    * Transition classes
  */

  .slide-fade-enter-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(40px);
    opacity: 0;
  }

  .fade-enter-active {
    transition: all .8s ease;
  }
  .fade-leave-active {
    /* transition: all .05s cubic-bezier(1.0, 0.5, 0.8, 1.0); */
  }
  .fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }


  /**
    * Notifications styles
  */

  .upper_notify {
    box-shadow:0 0 18px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #1c2137;
    padding: 30px 15px;
    margin-bottom: 10px;
    position: fixed;
    right: calc(50% - 125px);
    top: 10px;
    z-index: 100;
    width: 250px;
    color: #fff;
    z-index: 900;
    font-family: 'hel-r';
  }

  .notify_plug {
    box-shadow:0 0 18px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #1c2137;
    padding: 30px 15px;
    margin-bottom: 10px;
    position: fixed;
    right: 15px;
    top: 50px;
    z-index: 900;
    max-width: 250px;
    font-family: 'hel-r';
  }

  .notify_plug .desc {
    color: #fff;
    margin-top: 15px;
  }

  .notifSucc {
    color: lightgreen;
  }

  .notifErr {
    color: red;
  }

  .balance_wrapper {
    /* width: 655px; */
    padding-bottom: 20px;
    padding-right: 0;
    font-family: 'hel-l';
  }


  .game {
    background:#05061c url('../assets/bg_dice.jpg') no-repeat bottom center;
    margin-top:-67px;
    padding: 100px 0 52px 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .bet_plugs {
    position: fixed;
    left: 50%;
    top: 35px;
    margin-left: -135px;
    width:270px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    font-family:"hel-l";
    z-index:2000;
    overflow: hidden;
  }

  .bet_positive {
    color: #2cff40;
  }

  .bet_negative {
    color: red;
  }

  .bet_plug {
    width:100%;
    text-align: center;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
    padding: 25px 15px 24px;
  }
  .bet_result:after{
    content: '';
    position: absolute;
    bottom:0;
    left:0;
    width:100%;
    height:0;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.2);
  }

  .bet_positive.bet_result:after{
      border-bottom: 4px solid #2cff40;
  }
  .bet_negative.bet_result:after{
      border-bottom: 4px solid red;
  }

  .bet_result {
    margin-bottom: 10px;
    font-family: 'hel-r';
    font-size:16px;
  }

  .bet_count {
    color: #ffffff;
    font-size: 14px;
    font-weight: 300;
    font-size:14px;
  }

  .bet_token {
    margin-bottom: 20px;
    color:#ffa704;
    font-size:14px;
  }

  .inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .toggles {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-toggle:last-child {
    margin-right: 0;
  }

  .balance_title {
    color: #5d6d94;
    align-self: flex-start;
    margin-bottom: 13px;
    font-size: 16px;
    font-weight: 300;
  }

  .form {
    /* width: 655px; */
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
    background-color: transparent;
    margin: 0 auto 50px auto;
  }

  .form-group {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-family: 'hel-l';
  }

/*   .form-group > div:last-child {
    flex: 1;
  } */

  .amount-rate {
    margin-left: -3px;
    display: flex;
    align-items: center;
    justify-content:flex-end;
  }

  .amount-rate li {
    color: #5d6d94;
    position: relative;
    text-align: center;
    vertical-align: middle;
    height: 36px;
    line-height: 36px;
    width: 62px;
    font-size: 16px;
    font-weight: 300;
    font-family: 'hel-l';
    border-radius:3px;
    transition: background .3s ease-in-out, color .3s ease-in-out;
  }
  .amount-rate li:first-child{
    border-top-left-radius:0;
    border-bottom-left-radius:0;
  }

  .amount-rate li:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 20px;
    left:0;
    top:8px;
    z-index: 300;
    background: rgba(255, 255, 255, 0.07);
  }
.amount-rate li:before{
    transition: background-color .3s ease-in-out;
  }

  .amount-rate li:first-child:before {
    display: none;
  }

  .amount-rate li:hover {
    background: #20354a;
    color: #41e1ef;
  }
  .amount-rate li.li_active {
    background: #20354a;
    color: #41e1ef;
  }
  .amount-rate li:hover:before,
  .amount-rate li:hover + li:before,
  .amount-rate li.li_active:before,
  .amount-rate li.li_active + li:before {
    background-color:transparent;
 }



  .form-group {
    margin-bottom: 37px;
  }

  .form-group label {
    color: #5d6d94;
    font-size: 16px;
    font-family: 'hel-l';
    margin-bottom: 10px;
    display: block;
  }

  .form-group input {
    text-align: center;
    border: none;
    border-radius:3px;
    font-size: 16px;
    outline: none;
    background-color:#05061c;
    width: 44px;
    color: #fff;
    height: 100%;
  }

  .input-amount-group {
    display: flex;
    background-color:rgba(255, 255, 255, 0.07);
    border-radius:3px;
    position: relative;
    height: 36px;
  }

  .input-amount-group ul li {
    cursor: pointer;
  }

  .input-amount-group ul li:hover {
    background-color: #20354a;
  }

  .input-group {
    display: flex;
    width: 106px;
    height: 36px;
    align-items: center;
    justify-content:space-between;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #2c2c43;
    position: relative;
    z-index: 200;
    font-family: 'hel-r';
    padding: 4px;
  }
  .input-group:after{
    content:'';
    position:absolute;
    width:1px;
    height:20px;
    left:54px;
    top: 8px;
    background:#394471;
  }

  .input-group input {
    /* padding-left: 15px; */
  }

  .input-group .eos-logo_token{
    padding-right: 11px;
  }
  .input-group .eos-logo_eos{
    padding-right: 14px;
  }

  .input-group span {
    display: block;
    width: 1px;
    height: 30px;
  }

  .input-group span.first {
    background: #394471;
  }

  .input-group span.second {
    background: #10131f;
  }

  .info-container {
    background-color: rgba(255, 255, 255, 0.05);
    height:124px;
    border-radius:3px;
  }

  .info-container ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .info-container ul > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width:171px;
    height:124px;
  }

  .info-container ul > li:nth-child(2) {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .info-container ul > li > label {
    color: #5d6d94;
    font-size: 16px;
    display: block;
    font-family: 'hel-r';
    margin-top:16px;
    margin-bottom:14px;
  }

  .info-container ul > li > span {
    color: #41e1ef;
    font-family: 'Montserrat';
    font-size: 36px;
    font-weight: 300;
    text-shadow:0 0 16px rgba(65, 225, 239, 0.7);
  }

  .bet-cell {
    width: 196px;
    height: 36px;
    background-color: #2c2c43;
    border-radius: 3px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 18px 2px rgba(0, 0, 0, 0.5);
  }

  .game-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }

  .game-footer > div {
    flex: 1;
    text-align: center;
    color: #fff;
    font-weight: 600;
  }

  .btn-action {
    outline: none;
    letter-spacing: 3px;
    font-weight: 600;
    font-size: 18px;
    background-color: #0191ee;
    border-color: #0191ee;
    cursor: pointer;
    padding: .5rem 1rem;
    line-height: 1.5;
    border-radius: .3rem;
    color: #fff;
    flex: 1;
  }

  /* .eos-logo {
    height: 22px;
  }

  .eos-lg {
    width: 22px;
    margin-right: 5px;
    vertical-align: middle;
  }

  .token-logo {
    width: 22px;
    vertical-align: middle;
    margin-right: 5px;
  } */

  .game >>> .el-dialog {
    margin-top: 110px !important;
    background-color: transparent;
    width: 656px !important;
    border-radius:3px;
    box-shadow:0 0 18px 2px rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 656px) {
    .game >>> .dividends .el-dialog {
      width: 600px !important;
    }
  }

  .game >>> .dividends .el-dialog__header {
    font-weight: 700;
    text-align: center;
    line-height: 1.5;
    /* letter-spacing: .5px; */
    color: #5d6d94;
    font-size: 1.25em;
    display: none;
  }

  .game >>> .dividends .el-dialog__body {
    color: #5d6d94;
    background: url('../assets/dividends_bg.jpg') no-repeat;
    background-position: 50% 0;
    padding: 0 0 37px;
  }

  .game >>> .el-dialog__body a {
    color: #0191ee;
    text-decoration: none;
  }

  .game >>> .el-dialog__body a:hover {
    text-decoration: underline;
  }

  .social-links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 30px 0 30px;
    font-size: 1.2em;
  }

  .social-links li {
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    transition: background-color ease 200ms;
  }

  .social-links li:hover {
    background-color: #6C2DED;
  }

  .bet-balance {
    visibility: hidden;
  }

  .currenteos-container {
    position: relative;
  }

  .eos-animation {
    opacity: 0;
    position: absolute;
  }

  .token-animation {
    opacity: 0;
    position: absolute;
  }

  .eos-animation.animateUp {
    animation: fadeOutUp 3s;
    color: #02f292;
    text-shadow: 0 0 5px #02f292;
  }

  .eos-animation.animateDown {
    animation: fadeOutDown 1s;
    color: #CD4263;
    text-shadow: 0 0 5px #CD4263;
  }

  .token-animation.animateUp {
  animation: fadeOutUp 3s;
  color: orange;
  text-shadow: 0 0 5px #02f292;
  }

  .token-animation.animateDown {
    animation: fadeOutDown 1s;
    color: #CD4263;
    text-shadow: 0 0 5px #CD4263;
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }


  .checkbox-component > input + label > .input-box,
  .radio-component > input + label > .input-box {
    border-color: #4d82ff;
    background: #4d82ff;
  }
  .checkbox-component > input + label > .input-box > .input-box-tick > path {
    stroke: #fff;
  }
  .radio-component > input + label > .input-box > .input-box-circle {
    background: #fff;
  }

  /* .checkbox-component > input + label > .input-box,
  .radio-component > input + label > .input-box {
    position: relative;
    border: 1px solid #939393;
    border-radius: 1em;
    width: 1.6em;
    background: #fff;
    transition: background 0.2s ease-in;
    vertical-align: -15%;
  }
  .checkbox-component > input + label > .input-box > .input-box-tick,
  .radio-component > input + label > .input-box > .input-box-circle {
  display: none;
  }
  .checkbox-component > input + label > .input-box:before,
  .radio-component > input + label > .input-box:before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    border: 1px solid #939393;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    background: #fff;
    transition: transform 0.3s ease-out;
  }
  .checkbox-component > input:checked + label > .input-box,
  .radio-component > input:checked + label > .input-box {
    background: #63b65d;
  }
  .checkbox-component > input:checked + label > .input-box:before,
  .radio-component > input:checked + label > .input-box:before {
    border-color: #498d47;
    transform: translateX(0.6em);
  } */
  .first-toggle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    z-index: -1;}
  .btn {
    border: none;
    display: inline-block;
    padding: 10px;
    position: relative;
    text-align: center;
    transition: background 600ms ease, color 600ms ease;
    color: #4e5b7d;
  }

  input[type=radio].toggle {
    display: none;
  }
  input[type=radio].toggle + label {
    cursor: pointer;
    min-width: 60px;
  }
  input[type=radio].toggle + label:hover {
    background: none;
    color: #4e5b7d;
  }
  input[type=radio].toggle + label:after {
    background: #4e5b7d;
    content: "";
    height: 100%;
    position: absolute;
    top: 0;
    transition: left 200ms cubic-bezier(0.77, 0, 0.175, 1);
    width: 100%;
    z-index: -1;
  }
  input[type=radio].toggle.toggle-left + label {
    border-right: 0;
  }
  input[type=radio].toggle.toggle-left + label:after {
    left: 100%;
  }
  input[type=radio].toggle.toggle-right + label {
    margin-left: -5px;
  }
  input[type=radio].toggle.toggle-right + label:after {
    left: -100%;
  }
  input[type=radio].toggle:checked + label {
    cursor: default;
    color: #41e1ef;
    transition: color 200ms;
    box-shadow:0 0 18px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #20354a;
  }
  input[type=radio].toggle:checked + label:after {
    left: 0;
  }
</style>

<style>
  /*Di4o*/
  .btn-toggle {
    display: flex !important;
    align-items: center;
    margin: 0 10px;
  }
  .btn-toggle img {
    margin-left: 10px;
  }


  .bet-cell > span {
    color: #fff;
    font-size: 16px;
    font-family: 'hel-l';
    width: 146px;
    text-align: center;
  }
  .bet-cell img {
    padding-right: 14px;
    padding-left: 14px;
    border-left:1px solid #394471;
  }

  .btn-roll {
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:41px;
  }

  .button {
    appearance: none;
    display: inline-block;
    position: relative;
    transition: transform ease-in 0.1s;
    text-align: center;
    font-size: 14px;
    border-radius: 20px;
    vertical-align: middle;
    line-height: 14px;
    font-family: 'hel-m';
    width: 107px;
    height:41px;
    text-transform: uppercase;
    outline: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    background-color: rgb(255,151,12);
    background-image: linear-gradient(90deg, rgba(255,151,12,1) 0%, rgba(255,55,96,1) 50%, rgba(255,151,12,1) 100%);
    background-size: 200% auto;
    transition: 0.5s;
  }
  .button:focus {
    outline: 0;
  }
  .button:hover {
    background-position: right center;
  }
/* .button:before, .button:after {
  position: absolute;
  content: '';
  display: none;
  width: 140%;
  height: 100%;
  left: -20%;
  z-index: -1000;
  transition: all ease-in-out 0.5s;
  background-repeat: no-repeat;
  z-index: 500;
}
.button:before {
  top: -75%;
  background-image: radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, transparent 20%, yellow 20%, transparent 30%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, transparent 10%, yellow 15%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
}
.button:after {
  bottom: -75%;
  background-image: radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, transparent 10%, yellow 15%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%), radial-gradient(circle, yellow 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
}
.button:active {
  transform: scale(0.9);
}
.button.animate:before {
  display: block;
  animation: topBubbles ease-in-out 0.75s forwards;
}
.button.animate:after {
  display: block;
  animation: bottomBubbles ease-in-out 0.75s forwards;
}

@keyframes topBubbles {
  0% {
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  50% {
    background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;
  }

  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}
@keyframes bottomBubbles {
  0% {
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }

  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;
  }

  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
    background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
} */

  .test {
    text-align: center;
  }
  .switch-toggle {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    border-radius: 12px;
    background-color: #030615;
    cursor:pointer;
    margin-left: 9px;
  }

  .switch-toggle input {
    display: none;
  }

  .switch-toggle div {
    position: absolute;
    border-radius: 50%;
    background-color: #373e58;
    transition: .1s ease;
  }

  .switch-toggle input:checked + div {
    left: 50%;
    background-color: #41e1ef;
  }

  .switch-toggle.rect {
    border-radius: 0;
  }

  .switch-toggle.rect div {
    border-radius: 0;
  }

/*   .switch-toggle.inner div {
    width: 18px;
    height: 18px;
    top: 1px;
    left: 1px;

  } */

  .switch-toggle.outer div {
    width: 24px;
    height: 24px;
    top: 0;
    left: 0;
    font-family: 'hel-l';
    font-size:12px;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    line-height: 24px;

  }

  .test ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-align: center;
  }

  .toggle-bottom {
    display: flex;
    justify-content: center;
    align-content:center;
    margin-right: 6px;
  }
  .toggle-bottom li {
    line-height: 24px;
  }
  #question-mark-li {
    padding: 0;
    width: 15px;
    height: 15px;
    border: 1px solid #41e1ef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    font-family:'hel-l';
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  #question-mark-li span {

  }

  .balance {
    display: flex;
  }
  .currenteos-container {
    position:relative;
    width: 160px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.07);
    color: #5d6d94;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-family: 'hel-l';
    font-size: 16px;
  }
  .currenteos-container span {
    width:110px;
  }
  .currenteos-container img {
    margin: 0 18px 0 17px;
  }
  .currenteos-container:after{
    content:'';
    position:absolute;
    top: 8px;
    right: 50px;
    width: 1px;
    height: 20px;
    background: #5d6d94;
  }
  .currentlucky-container {
    position:relative;
    width: 160px;
    height: 36px;
    background-color: rgba(255, 255, 255, 0.07);
    color: #5d6d94;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-family: 'hel-l';
    font-size: 16px;
  }
  .currentlucky-container span {
    width:110px;
  }
  .currentlucky-container img {
    margin: 0 14px;
  }
  .currentlucky-container:after{
    content:'';
    position:absolute;
    top: 8px;
    right: 50px;
    width: 1px;
    height: 20px;
    background: #5d6d94;
  }
  .popover__title {
    text-decoration: none;
    color: rgb(228, 68, 68);
    text-align: center;
    font-family: 'hel-m';
  }
  .autobet .popover__wrapper{
    display: flex;
    align-items: center;
  }
  .popover__wrapper {
    position: relative;
  }
  .popover__content {
    /*color: #fff;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 50px;
    bottom: 20px;
    transform: translate(0,10px);
    background-color: #1c2137;
    padding: 1.5rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
    width: auto;
    font-family: 'hel-r';*/
    box-shadow:0 0 18px 2px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background-color: #1c2137;
    padding: 30px 15px;
    margin-bottom: 10px;
    position: absolute;
    /*right: calc(50% - 125px);
    top: 10px;*/
    opacity:0;
    left: -125px;
    bottom: 20px;
    z-index: 100;
    width: 250px;
    color: #fff;
    z-index: 900;
    font-family: 'hel-r';
  }
  .popover__content:before {
    position: absolute;
    z-index: -1;
    content: '';
    right: calc(50% - 10px);
    top: 10px;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #1c2137 transparent;
    transition-duration: 0.3s;
    transition-property: transform;
  }
  .popover__wrapper:hover .popover__content {
    z-index: 10;
    opacity: 1;
    visibility: visible;
    transform: translate(0,-20px);
    transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
  }
  .popover__message {
    text-align: center;
  }
  .autobet {
    margin-top: 14px;
    display: flex;
    justify-content: center;
    font-family: 'hel-l';
    height:24px;
  }
  body .v-modal {
    opacity:0.3;
  }



  /**
    * Responsive
  */


@media screen and (max-width: 1138px) {
  #app .game{
    padding-top: 132px;
  }
  .game  .game_wrapper {
    width: 590px;
    height:auto;
    display:block;
  }

  .game .game_overlay {
    margin-top: 60px;
  }

}


/*
  @media screen and (max-width: 1530px) {
    .game >>> .dividends .el-dialog__body {
      padding: 0 60px 37px 60px!important;
    }
  }

  @media screen and (max-width: 1460px) {
    .game_wrapper {
      width: 90vw!important;
    }
  }

  @media screen and (max-width: 1300px) {
    .game {
      background: url('../assets/bg_1240.png') no-repeat center / cover!important;
    }
  }

  @media screen and (max-width: 1100px) {
    .proj_dash {
      flex-direction: column;
    }
    .proj_dash .panel {
      margin-right: 0!important;
    }
  }*/

  /*@media screen and (max-width: 1150px) {
    .game_wrapper {
      flex-direction: column;
      align-items: center!important;
    }
    .board {
      margin-right: 0!important;*/
      /* width: 100%; */
    /*}
    .game_overlay {
      width: 70%!important;
    }
    .float-social {
      display: none;
    }
  }*/
/*
  @media screen and (max-width: 960px) {
    .game_overlay {
      width: 100%!important;
    }
    .my_dash {
      flex-direction: column;
    }
    .my_dash .panel {
      margin-right: 0!important;
      margin-bottom: 15px!important;
    }
    .stake_dash .blocks {
      flex-direction: column;
    }
    .stake_dash .blocks .block:first-child {
      margin-bottom: 15px;
    }
    .panel_wide {
     flex-basis: 100%!important;
    }
    .dividends .stake_dash .blocks .block {
      border: none!important;
    }
  }

  @media screen and (max-width: 780px) {

    .btn-roll {
      flex-direction: column;
    }

    .btn-roll .button {
      margin: 15px 0;
    }

    .game_wrapper {
      width: auto!important;
      margin: 0!important;
      align-items: center!important;
    }

    .balance_wrapper {
      width: 80vw!important;
      padding: 0!important;
      margin-bottom: 40px;
    }

    .balance_wrapper .inputs {
      flex-direction: column;
      align-items: flex-start;
    }

    .balance_wrapper .inputs .balance {
      margin: 0;
      flex-direction: column;
      width: 100%;
    }

    .currenteos-container {
      margin-bottom: 10px;
    }

    .currentlucky-container {
      margin: 0;
    }

    .balance_wrapper .inputs .btn-toggle {
      margin: 0;
    }

    .form {
      width: 80vw!important;
      padding: 0!important;
    }

    .form .form-group {
      flex-direction: column;
      align-items: flex-start;
    }

    .form .form-group > div {
      margin-bottom: 15px;
    }

    .form .info-container {
      width: 80vw;
    }

    .form .info-container ul {
      flex-direction: column;
    }

    .form .info-container ul li {
      width: 100%;
      margin: 15px 0;
    }

    .game {
      padding-top: 50px;
    }
  }

  @media screen and (max-width: 640px) {
    .dividends .tabs {
      flex-direction: column;
    }
    .dividends .tabs .tab {
      width: 100%;
    }
  }

  @media screen and (max-width: 560px) {
    .form {
      width: 95vw!important;
    }
    .info-container {
      width: 95vw!important;
    }
    .dividends .my_dash .panel .bottom_part {
      flex-direction: column;
      align-items: center!important;
    }
    .dividends .stake_dash .fields {
      flex-direction: column;
    }
    .dividends .stake_dash .fields .dashes {
      margin: 10px 0!important;
    }
    .dividends .dashboard .panel {
      padding: 15px!important;
    }
    .dividends .stake_dash .panel_info {
      font-size: 18px!important;
    }
    .dividends .stake_dash .block_buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .dividends .stake_dash .block_buttons button:first-child {
      margin-right: 0!important;
      margin-bottom: 15px;
    }
  }
*/
</style>
