<template>
  <section class="orders-container">
    <header class="orders-tab">
      <ul>
        <li
        v-for="(obj, ind) in GET_LOCALE[GET_CURRENT_LOCALE].TABLE.tabs"
        :key="ind"
        :class="{tab: true, tab_active: ind == 0}"
        @click="swapActiveTab($event.target, obj['data-attr'])"
        :data-filter="obj['data-attr']">
        {{ obj.title }}
        </li>
      </ul>
    </header>
    <table class="orders-table">
      <thead>
        <tr>
          <th
            v-for="(title, ind) in GET_LOCALE[GET_CURRENT_LOCALE].TABLE.table_titles"
            :key="ind"
            :class="{'mobile_hidden': title == 'Roll Under' || title == 'Bet' || title == 'Roll' || title == 'Ставка' || title == 'Ролл (Игра)'}"
          >
          {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="index"
          v-for="(order, index) in filteredBets">
          <td v-if="index < 20">{{dateFormat(order.block_time)}}</td>
          <td v-if="index < 20">{{order.player}}</td>
          <td v-if="index < 20" class="mobile_hidden">{{order.roll_under}}</td>
          <td v-if="index < 20" class="mobile_hidden">{{ (type === 'all' || type === 'mine') ? order.amount : sortedBets[index].bet }}</td>
          <td v-if="index < 20" class="mobile_hidden">{{order.random_roll}}</td>
          <td v-if="index < 20" class="payout">
            {{ (type === 'all' || type === 'mine') ? (order.payout === '0.0000 EOS' ? '' : order.payout) : sortedBets[index].payout }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import fetch from '@/utils/api';
  import network from '@/utils/network';

  // Importing maps from VUEX
  import { mapGetters, mapActions } from 'vuex';

  // DFUSE API
  const { EoswsClient, createEoswsSocket, InboundMessageType } = require("@dfuse/eosws-js");

  const client = new EoswsClient(
    createEoswsSocket(
      () =>
        new WebSocket(`wss://${network.dfuse_endpoint}/v1/stream?token=${network.dfuse_token}`)
    )
  )

  function findUnique(arr, predicate) {
    var found = {};
    arr.forEach(d => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map(key => found[key]);
  }

  function waitFor(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  export default {
    mounted () {
      this.loadAllBetHisotry();
      this.showRecentBets();
    },

    data() {
      return {
        orders: [],
        filteredBets: this.GET_ANOTHER_ORDERS,
        sortedBets: [],
        type: 'all'
      };
    },

    methods: {

      ...mapActions(['CHANGE_ROLL', 'CHANGE_PLUGS_STATE', 'SAVE_ANOTHER_ORDERS']),

      filterBets (type) {
        this.type = type;
        switch (type) {
          case 'huge': {
            let nums = [];
            this.sortedBets = [];
            this.GET_ANOTHER_ORDERS.map(el => {
              nums.push(+el.payout.split(' ')[0]);
            });
            nums.sort((a, b) => {
              return b - a;
            });
            nums.map((el, ind) => {
              this.sortedBets.push({
                bet: this.GET_ANOTHER_ORDERS[ind].amount,
                payout: `${el} EOS`
              });
            });
            console.log(this.sortedBets);
            break;
          }
          case 'all': {
            this.filteredBets = this.GET_ANOTHER_ORDERS;
            break;
          }
          case 'mine': {
            this.filteredBets = [];
            this.GET_ANOTHER_ORDERS.map(el => {
              this.GET_ACCOUNT.name == el.player ? this.filteredBets.push(el)
                                                          : false;
            });
            break;
          }
        }
      },

      swapActiveTab (ctx, type) {
        const tabs = Array.from(document.querySelectorAll('.tab'));
        tabs.map(el => el.classList.remove('tab_active'));
        ctx.classList.add('tab_active');
        console.log(this.orders);

        this.filterBets(type);
      },

      loadAllBetHisotry() {
        const options = {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            //headers: new Headers( {"Content-Type": "application/json", "Accept": "application/json",}),
            body: JSON.stringify({"account_name": network.dice_log_contract, "offset": -100, "pos": -1})
        }

        fetch(network.history_api, options).then(({actions}) => {
          // console.log("actions: ", actions);
          if (actions) {
            // This code works with localhost api data
            const bets = actions.filter(action => {
             return action.action_trace
               && action.action_trace.act
               && action.action_trace.act.account === network.dice_log_contract
               && action.action_trace.act.name === 'result'
               && action.action_trace.act.data
               && action.action_trace.act.data.result
               && action.action_trace.act.data.result.amount
               && action.action_trace.act.data.result.bet_id
               && action.action_trace.act.data.result.player
               && action.action_trace.act.data.result.random_roll
               && action.action_trace.act.data.result.roll_under
               && action.action_trace.act.data.result.payout;
            });

            bets.forEach(x => this.add_new_bet(x.action_trace.act.data.result, x.action_trace.block_time));
          }
        });
      },

      add_new_bet(result, block_time) {
        result.block_time = block_time;
        if (!this.orders.find(order => order.bet_id == result.bet_id)) {
          this.orders.unshift(result);
          // this.CHANGE_ROLL({
          //   border: action_trace.act.data.roll_border,
          //   value: action_trace.act.data.roll_value
          // });
          this.$store.commit('SAVE_ORDERS', this.orders);
          this.SAVE_ANOTHER_ORDERS(this.orders);
          this.orders = [];
          // this.CHANGE_PLUGS_STATE(true);
        }
      },

      async showRecentBets() {
        // console.log("showRecentBets...");
        client
          .connect()
          .then(() => {
            client
              .getActionTraces({ account: network.dice_log_contract, action_name: "result" })
              .onMessage((message) => {
                // console.log("got result message...", message);
                if (message.type === InboundMessageType.ACTION_TRACE && message.data && message.data.trace && message.data.trace.act && message.data.trace.act.data) {
                  if (message.data.trace && message.data.trace.act && message.data.trace.act.data && message.data.trace.act.data.result ) this.add_new_bet(message.data.trace.act.data.result, message.data.block_time);
                }
              });
          })
          .catch((error) => {
            console.log("Unable to connect to dfuse endpoint.", error);
          });
          await waitFor(100000);
          client.disconnect();
          this.showRecentBets();
      },

      dateFormat(raw) {
        // return new Date(raw+'Z').toLocaleTimeString();
        return new Date(raw).toLocaleTimeString();
      }
    },

    computed: {
      ...mapGetters(['GET_LOCALE', 'GET_CURRENT_LOCALE', 'GET_ACCOUNT', 'GET_ANOTHER_ORDERS']),
    },

    watch: {
      GET_ANOTHER_ORDERS () {
        this.filteredBets = this.GET_ANOTHER_ORDERS;
      }
    }
  };
</script>

<style scoped>
  .orders-container {
    padding: 15px 0 0;
  }

  .orders-tab {
    color: #fff;
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
  }

  .orders-tab ul {
    display: flex;
    align-items: center;
  }

  .orders-tab ul li {
    position:relative;
    cursor: pointer;
    padding:0 22px;
    height:36px;
    border-radius: 3px;
    background: transparent;
    color: #5d6d94;
    line-height:36px;
    vertical-align:middle;
    text-align: center;
    font-size: 16px;
    font-family: 'hel-r';
    transition: background .3s ease-in-out, color .3s ease-in-out;
  }

  .orders-tab ul li:hover {
    background: rgba(65, 225, 239, .2);
    color: #41e1ef;
  }

  .orders-tab ul li.tab_active {
    background: rgba(65, 225, 239, .2);
    color: #41e1ef;
  }

  .orders-tab ul li:after{
    content: '';
    position:absolute;
    left:0;
    top: 8px;
    width: 1px;
    height: 20px;
    background:#111738;
    transition: background .3s ease-in-out;
  }
  .orders-tab ul li:first-child:after{
    display:none;
  }
  .orders-tab ul li:first-child:hover + li:after,
  .orders-tab ul li.tab_active:first-child + li:after,
  .orders-tab ul li:nth-child(2):hover:after,
  .orders-tab ul li.tab_active:nth-child(2):after,
  .orders-tab ul li:nth-child(2):hover + li:after,
  .orders-tab ul li.tab_active:nth-child(2) + li:after,
  .orders-tab ul li:last-child:hover:after,
  .orders-tab ul li.tab_active:last-child:after{
    background: transparent;
  }

  .orders-table {
    color: #fff;
    border-collapse: collapse;
    width: 1070px;
    margin:0 auto;
  }

  .orders-table thead {
    color: #5d6d94;
    font-family: 'hel-l';
    font-size: 16px;
  }

  .orders-table th {
    color: #5d6d94;
    /* width: 15%; */
    text-align:left;
    padding-bottom:10px;
  }

  .orders-table tbody tr td{
    position:relative;
    text-align:left;
    vertical-align: middle;
    height: 80px;
    font-family: 'hel-l';
    font-size: 16px
  }
  .orders-table tbody tr:nth-child(odd) td:first-child:after{
    content:'';
    position: absolute;
    top: 0;
    left:-425px;
    height:100%;
    /* width:1920px; */
    background-color: rgba(255, 255, 255, 0.07);
  }

  /* .orders-table tbody tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.07);
  } */

  .orders-table td:nth-child(1),
  .orders-table th:nth-child(1){
    width:220px;
  }
  .orders-table td:nth-child(2),
  .orders-table th:nth-child(2){
    width:158px;
  }
  .orders-table td:nth-child(3),
  .orders-table th:nth-child(3){
    width:158px;
  }
  .orders-table td:nth-child(4),
  .orders-table th:nth-child(4){
    width:158px;
  }
  .orders-table td:nth-child(5),
  .orders-table th:nth-child(5){
    width:158px;
  }
  .orders-table td:nth-child(6),
  .orders-table th:nth-child(6){
    width:auto;
  }

  .orders-table td:nth-child(1){color:#5d6d94;}
  .orders-table td:nth-child(2){color:#fff;}
  .orders-table td:nth-child(3){color:#5d6d94;}
  .orders-table td:nth-child(4){color:#fff;}
  .orders-table td:nth-child(5){color:#fff;}
  .orders-table tbody tr td:nth-child(6){
    font-family:'hel-r';
  }


  .payout {
    color: #2cff40;
  }




  /**
    * Responsive
  */

  @media screen and (max-width: 1138px) {
    .orders-container{
      margin: 0 auto;
      width: 560px;
      overflow: hidden;
    }
    .orders-container .orders-table{
      width:560px;
    }
    .orders-container .orders-table td,
    .orders-container .orders-table th{
      width:auto;
    }
  }

/*   @media screen and (max-width: 780px) {
    .mobile_hidden {
      display: none!important;
    }
    td, th {
      width: calc(100% / 3)!important;
    }
  }

  @media screen and (max-width: 450px) {
    .orders-tab ul {
      flex-direction: column;
    }
    .tab {
      padding: 10px!important;
    }
  }

*/


</style>
