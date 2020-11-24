import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {},
    eosjs: {},
    orders: [],
    another_orders: [],
    token_course: 2000,
    locale: {
      "EN": {
        "HEADER": {
          "navigation": ["News", "White Paper", "Dividends", "Referrals", "How To Play"],
          "dropdown": {
            "title": "Games",
            "links": [
              {
                "title": "Texas Holdem Soon",
                "link": "#"
              },
              {
                "title": "Blackjack Soon",
                "link": "#"
              }
            ]
          },
          "login_btn": "Login"
        },
        "GAME": {
          "balance": "Account Balance:",
          "roll_under_title": "Roll under to win",
          "payout_title": "Payout on win",
          "form_titles": ["Roll under to win", "Payout", "Win chance"],
          "roll_btn": "BET",
          "auto_bet": {
            "switch": "Auto Bet",
            "hint": "After the automatic bid is enabled, the bid is automatically pressed until canceled in accordance with the current bid setting."
          },
          "bet_plug_text": {
            "pos": "You won:",
            "neg": "You lose:",
            "bet": "Your bet:",
          },
          "popups": {
            "dividends": {
              "title": "Dividends",
              "desc": "Total collected:"
            }
          },
          "upperNotify": "Waiting for Scatter to confirm transaction..."
        },
        "BOARD": {
          "table_title": "Daily Leaderboard:",
          "columns": ["Ranking", "Bettor", "Bet Amount", "Profit", "Bonus"]
        },
        "TABLE": {
          "tabs": [
            {
              "title": "All bets",
              "data-attr": "all"
            },
            {
              "title": "My bets",
              "data-attr": "mine"
            },
            {
              "title": "Huge wins",
              "data-attr": "huge"
            }
          ],
          "table_titles": ["Time", "Bettor", "Roll Under", "Bet", "Roll", "Payout"]
        }
      },
      "RU": {
        "HEADER": {
          "navigation": ["Честность", "Чистый лист", "Дивиденд", "Рефералы", "Как Играть"],
          "dropdown": {
            "title": "Игры",
            "links": [
              {
                "title": "Texas Holdem Soon",
                "link": "#"
              },
              {
                "title": "Blackjack Soon",
                "link": "#"
              }
            ]
          },
          "login_btn": "Войти"
        },
        "GAME": {
          "balance": "Баланс аккаунта:",
          "roll_under_title": "Прокрути, чтобы выйграть",
          "payout_title": "Оплата выигрыша",
          "form_titles": ["Прокрути, чтобы выйграть", "Выплата", "Шанс выигрыша"],
          "roll_btn": "БРОСИТЬ КОСТЬ",
          "auto_bet": {
            "switch": "Автоматическая ставка",
            "hint": "После включения автоматической ставки, игра будет работать в автоматическом режиме до тех пор, пока не будет отключена функция автоматической ставки."
          },
          "bet_plug_text": {
            "pos": "Вы выиграли:",
            "neg": "Вы проиграли:",
            "bet": "Ваша ставка:"
          },
          "popups": {
            "dividends": {
              "title": "Дивиденды",
              "desc": "Всего собрано:"
            }
          },
          "upperNotify": "Ожидание подтверждения транзакции Scatter..."
        },
        "BOARD": {
          "table_title": "Рейтинг:",
          "columns": ["Место", "Каппер", "Всего Поставлено", "Прибыль", "Бонус"]
        },
        "TABLE": {
          "tabs": [
            {
              "title": "Все ставки",
              "data-attr": "all"
            },
            {
              "title": "Мои ставки",
              "data-attr": "mine"
            },
            {
              "title": "Крупные выигрыши",
              "data-attr": "huge"
            }
          ],
          "table_titles": ["Время", "Каппер", "Roll Under", "Ставка", "Ролл (Игра)", "Выплата"]
        }
      }
    },
    currentLocale: "EN",
    roll: {
      border: 0,
      value: 0
    },
    leaderboard: [],
    roll_visible: false,
    plugs_visible: false,
    accountName: ''
  },

  mutations: {
    UPDATE_ACCOUNT(state, account) {
      state.account = account;
      state.accountName = account.name;
    },
    UPDATE_EOS(state, eos) {
      state.eosjs = eos;
    },
    SAVE_ORDERS (state, orders) {
      state.orders.unshift(orders[0]);
    },
    SAVE_ANOTHER_ORDERS (state, orders) {
      state.another_orders.unshift(orders[0]);
    },
    SAVE_LOCALE (state, json) {
      state.locale = json;
    },
    CHANGE_LOCALE (state, loc) {
      state.currentLocale = loc;
    },
    CHANGE_ROLL (state, rollObj) {
      state.roll.border = rollObj.border;
      state.roll.value = rollObj.value;
      state.roll_visible = true;
    },
    CHANGE_ROLL_STATE (state, val) {
      state.roll_visible = val;
    },
    CHANGE_PLUGS_STATE (state, val) {
      state.plugs_visible = val;
    },
    UPDATE_LEADERBOARD (state, val) {
      state.leaderboard = val;
    },
    DROP_ORDERS (state) {
      state.orders = [];
    }
  },

  actions: {
    SAVE_LOCALE (store, loc) {
      store.commit('SAVE_LOCALE', loc);
    },
    CHANGE_LOCALE (store, loc) {
      store.commit('CHANGE_LOCALE', loc);
    },
    CHANGE_ROLL (store, roll) {
      store.commit('CHANGE_ROLL', roll);
    },
    CHANGE_ROLL_STATE (store, val) {
      store.commit('CHANGE_ROLL_STATE', val);
    },
    UPDATE_LEADERBOARD (store, val) {
      store.commit('UPDATE_LEADERBOARD', val);
    },
    CHANGE_PLUGS_STATE (store, val) {
      store.commit('CHANGE_PLUGS_STATE', val);
    },
    DROP_ORDERS (store) {
      store.commit('DROP_ORDERS');
    },
    SAVE_ANOTHER_ORDERS (store, orders) {
      store.commit('SAVE_ANOTHER_ORDERS', orders);
    }
  },

  getters: {
    GET_ORDERS (state) {
      return state.orders;
    },
    GET_ANOTHER_ORDERS (state) {
      return state.another_orders;
    },
    GET_LOCALE (state) {
      return state.locale;
    },
    GET_CURRENT_LOCALE (state) {
      return state.currentLocale;
    },
    GET_ACCOUNT (state) {
      return state.account;
    },
    GET_ROLL (state) {
      return state.roll;
    },
    GET_ROLL_STATE (state) {
      return state.roll_visible;
    },
    GET_PLUGS_STATE (state) {
      return state.plugs_visible;
    },
    GET_BOARD (state) {
      return state.leaderboard;
    },
    GET_ACCOUNT_NAME (state) {
      return state.accountName;
    },
    GET_TOKEN_COURSE (state) {
      return state.token_course;
    }
  }
});
