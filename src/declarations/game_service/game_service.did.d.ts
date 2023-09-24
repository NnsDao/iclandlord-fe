import type { ActorMethod } from '@dfinity/agent';
import type { Principal } from '@dfinity/principal';

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
export interface _SERVICE {
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
