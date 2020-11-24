import network from '@/utils/network';
import { Api, JsonRpc, RpcError } from 'eosjs';

export const stakeTokenAction = async (obj, account, quantity, authority, resolved, rejected) => {
  const completed = res => {
      // this.result = res;
      // this.sending = false;
  }
  try {
    const trx = {
        actions: [{
            account: network.profits_contract,
            name: "stake",
            authorization: [{
                actor: account,
                permission: authority
            }],
            data: {
                to: account,
                quantity: quantity
            },
        }]
    };

    const result = await obj.eosapi.transact(trx, {blocksBehind: 3, expireSeconds: 30, broadcast: true});
    completed(result);
    resolved(result);
  } catch (e) {
    completed(e);
    rejected(e);
    console.log('\nCaught exception: ', e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
}

export const unstakeTokenAction = async (obj, account, quantity, authority, resolved, rejected) => {
  const completed = res => {
      // this.result = res;
      // this.sending = false;
  }
  try {
    const trx = {
        actions: [{
            account: network.profits_contract,
            name: "unstake",
            authorization: [{
                actor: account,
                permission: authority
            }],
            data: {
                from: account,
                quantity: quantity
            },
        }]
    };

    const result = await obj.eosapi.transact(trx, {blocksBehind: 3, expireSeconds: 30, broadcast: true});
    completed(result);
    resolved(result);
  } catch (e) {
    completed(e);
    rejected(e);
    console.log('\nCaught exception: ', e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
}

export const claimAction = async (obj, account, authority, resolved, rejected) => {
  const completed = res => {
      // this.result = res;
      // this.sending = false;
  }
  try {
    const trx = {
        actions: [{
            account: network.profits_contract,
            name: "claim",
            authorization: [{
                actor: account,
                permission: authority
            }],
            data: {
                owner: account
            },
        }]
    };

    const result = await obj.eosapi.transact(trx, {blocksBehind: 3, expireSeconds: 30, broadcast: true});
    completed(result);
    resolved(result);
  } catch (e) {
    completed(e);
    rejected(e);
    console.log('\nCaught exception: ', e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
}

// Request transfer via Scatter and push the transaction when confirmed
export const transferFunds = async (obj, contract, from, to, quantity, symbol, memo, authority, resolved, rejected) => {
  if(obj.sending) return;
  obj.sending = true;

  const completed = res => {
      obj.result = res;
      obj.sending = false;
  }
  try {
    const trx = {
        actions: [{
            account: contract,
            name: 'transfer',
            authorization: [{
                actor: from,
                permission: authority
            }],
            data: {
                from: from,
                to: to,
                quantity: quantity + ' ' + symbol,
                memo: memo
            },
        }]
    };

    // console.log("eosjs: ", trx, this.eosjs);
    const result = await obj.eosapi.transact(trx, {blocksBehind: 3, expireSeconds: 30, broadcast: true});

    completed(result);
    resolved(result);
  } catch (e) {
    completed(e);
    rejected(e);
    console.log('\nCaught exception: ', e);
    if (e instanceof RpcError)
      console.log(JSON.stringify(e.json, null, 2));
  }
}
