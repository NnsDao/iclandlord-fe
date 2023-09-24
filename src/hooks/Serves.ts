import { astroxInit } from '@/lib/utils';
import type { ActorMethod } from '@dfinity/agent';
import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { idlFactory as idlFactoryGame } from '../declarations/game_service/index';
import { AUTH_HOUR_MS, CONNECT_OBJ_HOST, GAME_SERVICE } from '../lib/constants';

if (!window.ic?.astrox) astroxInit();
//@ts-ignore
global.fetch = fetch;

class Service {
  agent!: HttpAgent;
  identity!: Identity;
  canisterId: string;
  actor!: ImplementedActorMethods;
  loginType: string;
  pending: boolean;
  constructor(params: ConstructorParams) {
    const { canisterId } = params;
    this.canisterId = canisterId;
    this.loginType = window.localStorage.getItem('loginType') || '';
    this.pending = false;
    this.loginII();
    this.loginNFID();
  }

  async loginII() {
    const isLoginII = Number(localStorage.getItem('isLoginII'));
    if (isLoginII) {
      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: AUTH_HOUR_MS,
          disableIdle: true,
          disableDefaultIdleCallback: true,
        },
      });
      if (await authClient.isAuthenticated()) {
        const identity: Identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
        this.actor = Actor.createActor(idlFactoryGame, { agent: agent, canisterId: GAME_SERVICE });
      }
    }
  }

  async loginNFID() {
    const isLoginNFID = Number(localStorage.getItem('isLoginNFID'));
    if (isLoginNFID) {
      const authClient = await AuthClient.create({
        idleOptions: {
          idleTimeout: AUTH_HOUR_MS,
          disableIdle: true,
          disableDefaultIdleCallback: true,
        },
      });
      if (await authClient.isAuthenticated()) {
        const identity = (await authClient.getIdentity()) as unknown as Identity;
        const agent = new HttpAgent({ identity });
        this.actor = Actor.createActor(idlFactoryGame, { agent: agent, canisterId: GAME_SERVICE });
      }
    }
  }
  async loginMeWallet() {
    const isLoginMeWallet = Number(localStorage.getItem('isLoginMeWallet'));

    if (isLoginMeWallet) {
      //@ts-ignore
      const isICXReady = window.icx._isReady;

      if (isICXReady) {
        //@ts-ignore
        await astroxInit(CONNECT_OBJ_HOST.host, CONNECT_OBJ_HOST.whitelist);
        //@ts-ignore
        const isconneted = await window.icx.isConnected();
        // const isconneted = await window.icx.isConnected({ ...astroxConfig, delegationTargets: CONNECT_OBJ_HOST.whitelist, ledgerHost: CONNECT_OBJ_HOST.host });
        if (isconneted) {
          //@ts-ignore
          const identity = window.icx.identity;
          console.log(identity.getPrincipal(), 'debug icx me principal');

          //@ts-ignore
          this.actor = await window.icx.createActor(GAME_SERVICE, idlFactoryGame);
        }
      } else {
        if (!window.ic?.astrox) {
          await astroxInit();
          if (!window.ic?.astrox) return false;
        }
        const isconneted = await window.ic.astrox.isAuthenticated();
        if (isconneted) {
          const identity = window.ic.astrox.identity;
          console.log(identity.getPrincipal(), 'debug me principal');
          //@ts-ignore
          this.actor = await window.ic.astrox.createActor(idlFactoryGame, GAME_SERVICE);
        }
      }
    }
  }

  // new params
  async searchTable(base_points: SearchTableRes): Promise<Result_3> {
    return await this.actor.search_table(base_points);
  }

  async begin(table_id: TableId) {
    return await this.actor.begin(table_id);
  }

  async tableStatus(table_id) {
    return await this.actor.table_status(table_id);
  }

  async cancelGame() {
    return await this.actor.cancel_gamer();
  }
  async callNumber({ table_id, number }) {
    return await this.actor.call_number({ table_id, number });
  }

  async shotPoker({ cards, table_id }) {
    return await this.actor.shot_poker({ table_id, cards });
  }

  async pass(table_id) {
    return await this.actor.pass(table_id);
  }

  async get_points(principal) {
    return await this.actor.get_points(principal);
  }
}

export default new Service({
  canisterId: GAME_SERVICE,
});

export interface CallNumberReq {
  table_id: bigint;
  number: number;
}
export interface CallNumberResp {
  next_index: number;
  rebegin: boolean;
  begin: boolean;
}
export interface GetSettlementRecord {
  table_id: bigint;
  create_time: bigint;
  base_points: bigint;
}
export type Result = { Ok: boolean } | { Err: string };
export type Result_1 = { Ok: CallNumberResp } | { Err: string };
export type Result_2 = { Ok: null } | { Err: string };
export type Result_3 = { Ok: bigint } | { Err: string };
export type Result_4 = { Ok: SotPokerResp } | { Err: string };
export interface SearchTableRes {
  base_points: bigint;
}
export interface SotPokerReq {
  cards: Uint32Array | number[];
  table_id: bigint;
}
export interface SotPokerResp {
  is_end: boolean;
}
export interface Table {
  status: TableStatus;
  current_gamer_index: number;
  biggest_gamer: [] | [Principal];
  last_action_time: bigint;
  cards: Array<[Principal, Uint32Array | number[]]>;
  farmers: Array<Principal>;
  last_pokers: Uint32Array | number[];
  gamers: Array<Principal>;
  winner: Winner;
  shot_log_round: Array<[Principal, Uint32Array | number[]]>;
  biggest_num: number;
  create_time: bigint;
  multiple: bigint;
  landlord: [] | [Principal];
  last_shot_gamer: [] | [Principal];
  call_number: Array<[Principal, number]>;
  base_points: bigint;
  pokers: Uint32Array | number[];
}
export interface TableId {
  table_id: bigint;
}
export type TableStatus =
  | { Begining: null }
  | { Calling: null }
  | { Ending: null }
  | { Ready: null }
  | { Waiting: null };
export interface TableStatusResp {
  status: TableStatus;
  request_time: bigint;
  current_gamer_index: number;
  biggest_gamer: [] | [Principal];
  cards: Uint32Array | number[];
  farmers: Array<Principal>;
  gamer_cards_len: Array<[Principal, number]>;
  last_pokers: Uint32Array | number[];
  gamers: Array<Principal>;
  winner: Winner;
  shot_log_round: Array<[Principal, Uint32Array | number[]]>;
  biggest_num: number;
  create_time: bigint;
  multiple: bigint;
  landlord: [] | [Principal];
  call_number: Array<[Principal, number]>;
  base_points: bigint;
  pokers: Uint32Array | number[];
}
export type Winner = { Farmer: null } | { Null: null } | { Landlord: null };

interface ConstructorParams {
  canisterId: string;
}

interface ImplementedActorMethods {
  begin: ActorMethod<[TableId], Result>;
  call_number: ActorMethod<[CallNumberReq], Result_1>;
  cancel_gamer: ActorMethod<[], undefined>;
  destroy_table: ActorMethod<[TableId], undefined>;
  get_points: ActorMethod<[Principal], bigint>;
  get_settlement_record: ActorMethod<[GetSettlementRecord], Array<[Principal, bigint]>>;
  get_table: ActorMethod<[TableId], Table>;
  get_vitality: ActorMethod<[Principal], bigint>;
  mint_points: ActorMethod<[], Result_2>;
  pass: ActorMethod<[TableId], Result_2>;
  re_begin: ActorMethod<[TableId], Result>;
  reset_table: ActorMethod<[TableId], Result_2>;
  search_table: ActorMethod<[SearchTableRes], Result_3>;
  shot_poker: ActorMethod<[SotPokerReq], Result_4>;
  table_status: ActorMethod<[TableId], TableStatusResp>;
}
