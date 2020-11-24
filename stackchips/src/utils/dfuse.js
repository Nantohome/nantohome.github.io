import network from '@/utils/network';
import moment from 'moment';

// DFUSE API
const { EoswsClient, createEoswsSocket, InboundMessageType } = require("@dfuse/eosws-js");
const client = new EoswsClient(createEoswsSocket(() =>
  new WebSocket(`wss://${network.dfuse_endpoint}/v1/stream?token=${network.dfuse_token}`))
);
client.connect();

const player = new EoswsClient(createEoswsSocket(() =>
  new WebSocket(`wss://${network.dfuse_endpoint}/v1/stream?token=${network.dfuse_token}`))
);
player.connect();

export const cancel = () => {
  player.disconnect();
  player.connect();
}

export const subscribeBalance = async (is_player, code, account, symbol, obj, updater) => {
  if (!account) return;
  console.log("subscribeBalance " + symbol + " for " + account + " at " + code);

  const cl = is_player ? player : client;
  cl.getTableRows({ code: code, scope: account, table: "accounts", json: true}, { listen: true, fetch: true })
    .onMessage((message) => {
      if (message.type === InboundMessageType.TABLE_DELTA && message.data && message.data.dbop && message.data.dbop.new && message.data.dbop.new.json) {
        if (message.data.dbop.scope === account
            && message.data.dbop.account === code
            && message.data.dbop.new.json.balance) {
          const balance = message.data.dbop.new.json.balance;
          const balance_num = Number(balance.replace(' ' + symbol, ''));
          // console.log("balance delta: ", balance_num);
          updater(obj, balance_num);
        } else {
          console.log("unknown input from dfuse:", message);
        }
      } else {
        if (message.type === InboundMessageType.TABLE_SNAPSHOT) {
          if (message && message.data && message.data.rows && message.data.rows[0] && message.data.rows[0].json && message.data.rows[0].json.balance) {
            const balance = message.data.rows[0].json.balance;
            const balance_num = Number(balance.replace(' ' + symbol, ''));
            // console.log("balance snapshot: ",balance_num);
            updater(obj, balance_num);
          }
        }
      }
    });
}

// connect to dfuse server and update balance when it's changed
export const updateMyDividendsStats = async (account_name, obj, updater) => {
  console.log("update user dividends stats ", account_name);
  player
    .getTableRows({ code: "stackprofits", scope: account_name, table: "accounts", json: true}, { listen: true, fetch: true })
    .onMessage((message) => {
      // console.log("my divi info: ", message);
      let data;
      if (message.type === InboundMessageType.TABLE_DELTA && message.data && message.data.dbop && message.data.dbop.new && message.data.dbop.new.json) data = message.data.dbop.new.json;
      if (message.type === InboundMessageType.TABLE_SNAPSHOT && message.data && message.data.rows[0] && message.data.rows[0].json) data = message.data.rows[0].json;
      if (data && data.staked  ) {
        const staked = Number(data.staked.replace(' STACK', ''));
        const unstaking = Number(data.unstaking.replace(' STACK', ''));
        const total_paid = Number(data.total_paid.replace(' EOS', ''));
        const last_balance = Number(data.last_balance.replace(' EOS', ''));
        updater(obj, staked, unstaking, total_paid, last_balance);
      }
    });
}

export const updateTotalDividendsStats = async (obj, updater) => {
  console.log("update total dividends stats ");
  client
    .getTableRows({ code: "stackprofits", scope: ".....mu3c5e53", table: "stat", json: true}, { listen: true, fetch: true })
    .onMessage((message) => {
      // console.log("total divi info: ", message);
      let data;
      if (message.type === InboundMessageType.TABLE_DELTA && message.data && message.data.dbop && message.data.dbop.new && message.data.dbop.new.json) data = message.data.dbop.new.json;
      if (message.type === InboundMessageType.TABLE_SNAPSHOT && message.data && message.data.rows[0] && message.data.rows[0].json) data = message.data.rows[0].json;
      if (data && data.total_staked  ) {
        const staked = Number(data.total_staked.replace(' STACK', ''));
        const unstaking = Number(data.total_unstaking.replace(' STACK', ''));
        const total_paid = Number(data.total_paid.replace(' EOS', ''));
        updater(obj, staked, unstaking, total_paid);
      }
    });
}

export const updateGameStats = async (obj, updater) => {
  client
    .getTableRows({ code: "stackdicexxx", scope: "stackdicexxx", table: "tradetokens", json: true}, { listen: true, fetch: true })
    .onMessage((message) => {
      // console.log("game info: ", message);
      let data;
      if (message.type === InboundMessageType.TABLE_DELTA && message.data && message.data.dbop && message.data.dbop.new && message.data.dbop.new.json) data = message.data.dbop.new.json;
      if (message.type === InboundMessageType.TABLE_SNAPSHOT && message.data && message.data.rows) {
        message.data.rows.forEach(el => {
          if (el.json.contract == "eosio.token") data = el.json;
        })
      }
      if (data) {
          const total_bets = data.times;
          const total_in = data.in / 10000;
          const total_out = data.out / 10000;
          updater(obj, total_bets, total_in, total_out);
      }
    });
}

// connect to dfuse server and update balance when it's changed
export const updateDailyLeaderboard = async (obj) => {
  console.log("update daily leaderboard ");
  client
    .getTableRows({ code: "stackdicexxx", scope: "stackdicexxx", table: "dailys", json: true}, { listen: true, fetch: true })
    .onMessage((message) => {
      let today = moment.utc();
      if (message.type === InboundMessageType.TABLE_DELTA && message.data && message.data.dbop && message.data.dbop.new) {
        let newLeader = message.data.dbop.new.json;
        let newLeaders = [];
        if (newLeader) {
          let found = false;
          obj.GET_BOARD.map(el => {
            if (el.bettor === newLeader.account) {
              newLeaders.push({
                bettor: newLeader.account,
                bet_amount: newLeader.asset_items[0].accu_in / 10000.0,
                profit: newLeader.asset_items[0].accu_out / 10000.0
              });
              found = true;
            } else {
              newLeaders.push(el);
            }
          });
          if (!found) newLeaders.push({
            bettor: newLeader.account,
            bet_amount: newLeader.asset_items[0].accu_in / 10000.0,
            profit: newLeader.asset_items[0].accu_out / 10000.0
          });
          newLeaders.sort((a, b) => {
            return b.bet_amount - a.bet_amount;
          });
          // console.log("new leaders: ", newLeaders);
          obj.UPDATE_LEADERBOARD(newLeaders);
        }
      } else {
        if (message.type === InboundMessageType.TABLE_SNAPSHOT) {
          let leaders = [];
          message.data.rows.map(el => {
            let day = moment.utc(el.json.last_bettime);
            if ((today-day)/(1000.0 * 60 * 60) <24) {
              leaders.push({
                bettor: el.json.account,
                bet_amount: el.json.asset_items[0].accu_in / 10000.0,
                profit: el.json.asset_items[0].accu_out / 10000.0
              })
            }
          });

          leaders.sort((a, b) => {
            return b.bet_amount - a.bet_amount;
          });
          // console.log("leaders: ", leaders);
          obj.UPDATE_LEADERBOARD(leaders);
        }
      }
    });
}
