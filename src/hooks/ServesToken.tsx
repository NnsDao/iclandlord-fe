import type { ActorMethod } from '@dfinity/agent';
import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import type { Principal } from '@dfinity/principal';
import { idlFactory as idlFactoryGameToken } from '../declarations/GameToken_backend/index';
import { AUTH_HOUR_MS, CANISTER_ID_GAMETOKEN_BACKEND } from '../lib/constants';

//@ts-ignore
global.fetch = fetch;

class ServiceToken {
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
        this.actor = Actor.createActor(idlFactoryGameToken, {
          agent: agent,
          canisterId: CANISTER_ID_GAMETOKEN_BACKEND,
        });
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
        this.actor = Actor.createActor(idlFactoryGameToken, {
          agent: agent,
          canisterId: CANISTER_ID_GAMETOKEN_BACKEND,
        });
      }
    }
  }

  // async loginMeWallet() {
  //   const isLoginMeWallet = Number(localStorage.getItem('isLoginMeWallet'));
  //   if (isLoginMeWallet) {
  //     if (!window.ic?.astrox) {
  //       await astroxInit();
  //       if (!window.ic?.astrox) return false;
  //     }
  //     var isconneted = await window.ic.astrox.isAuthenticated();
  //     if (!isconneted) {
  //       await window.ic.astrox.connect({
  //         ...window.ic.astrox.connectOptions,
  //         delegationTargets: CONNECT_OBJ_HOST.whitelist,
  //         ledgerHost: CONNECT_OBJ_HOST.host,
  //       });
  //     }

  //     const identity = window.ic.astrox.identity;
  //     const agent = new HttpAgent({ identity });
  //     console.log(identity.getPrincipal(), agent, 222222);
  //     this.actor = Actor.createActor(idlFactoryGameToken, {
  //       agent: agent,
  //       canisterId: CANISTER_ID_GAMETOKEN_BACKEND,
  //     });
  //   }
  // }

  async freeMint(principal: Principal) {
    const authClient = await AuthClient.create({
      idleOptions: {
        idleTimeout: AUTH_HOUR_MS,
        disableIdle: true,
        disableDefaultIdleCallback: true,
      },
    });
    const identity: Identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    this.actor = Actor.createActor(idlFactoryGameToken, { agent, canisterId: this.canisterId });
    console.log(principal.toString());
    return await this.actor.free_mint({
      to: {
        owner: principal,
        subaccount: [],
      },
      created_at_time: [],
      memo: [],
    });
  }
}

export default new ServiceToken({
  canisterId: CANISTER_ID_GAMETOKEN_BACKEND,
});

export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export interface Allowance {
  allowance: bigint;
  expires_at: [] | [bigint];
}
export type ApproveError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { AllowanceChanged: { current_allowance: bigint } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { Expired: { ledger_time: bigint } }
  | { InsufficientFunds: { balance: Tokens } };
export interface Ledger {
  burn: ActorMethod<
    [
      {
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
  free_mint: ActorMethod<
    [
      {
        to: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
      }
    ],
    Result
  >;
  icrc1_balance_of: ActorMethod<[Account], Tokens>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], bigint>;
  icrc1_metadata: ActorMethod<[], Array<[string, Value]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<[], Array<{ url: string; name: string }>>;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], Tokens>;
  icrc1_transfer: ActorMethod<
    [
      {
        to: Account;
        fee: [] | [Tokens];
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
  icrc2_allowance: ActorMethod<[{ account: Account; spender: Account }], Allowance>;
  icrc2_approve: ActorMethod<
    [
      {
        fee: [] | [Tokens];
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: bigint;
        expected_allowance: [] | [bigint];
        expires_at: [] | [bigint];
        spender: Account;
      }
    ],
    Result_2
  >;
  icrc2_transfer_from: ActorMethod<
    [
      {
        to: Account;
        fee: [] | [Tokens];
        spender_subaccount: [] | [Subaccount];
        from: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result_1
  >;
  mint: ActorMethod<
    [
      {
        to: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
}
export type Memo = Uint8Array | number[];
export type Result = { Ok: TxIndex } | { Err: TransferError };
export type Result_1 = { Ok: TxIndex } | { Err: TransferFromError };
export type Result_2 = { Ok: TxIndex } | { Err: ApproveError };
export type Subaccount = Uint8Array | number[];
export type Timestamp = bigint;
export type Tokens = bigint;
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export type TransferFromError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { InsufficientAllowance: { allowance: bigint } }
  | { BadBurn: { min_burn_amount: Tokens } }
  | { Duplicate: { duplicate_of: TxIndex } }
  | { BadFee: { expected_fee: Tokens } }
  | { CreatedInFuture: { ledger_time: Timestamp } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: Tokens } };
export type TxIndex = bigint;
export type Value = { Int: bigint } | { Nat: bigint } | { Blob: Uint8Array | number[] } | { Text: string };

interface ConstructorParams {
  canisterId: string;
}

interface ImplementedActorMethods {
  burn: ActorMethod<
    [
      {
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
  free_mint: ActorMethod<
    [
      {
        to: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
      }
    ],
    Result
  >;
  icrc1_balance_of: ActorMethod<[Account], Tokens>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], bigint>;
  icrc1_metadata: ActorMethod<[], Array<[string, Value]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<[], Array<{ url: string; name: string }>>;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], Tokens>;
  icrc1_transfer: ActorMethod<
    [
      {
        to: Account;
        fee: [] | [Tokens];
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
  icrc2_allowance: ActorMethod<[{ account: Account; spender: Account }], Allowance>;
  icrc2_approve: ActorMethod<
    [
      {
        fee: [] | [Tokens];
        memo: [] | [Memo];
        from_subaccount: [] | [Subaccount];
        created_at_time: [] | [Timestamp];
        amount: bigint;
        expected_allowance: [] | [bigint];
        expires_at: [] | [bigint];
        spender: Account;
      }
    ],
    Result_2
  >;
  icrc2_transfer_from: ActorMethod<
    [
      {
        to: Account;
        fee: [] | [Tokens];
        spender_subaccount: [] | [Subaccount];
        from: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result_1
  >;
  mint: ActorMethod<
    [
      {
        to: Account;
        memo: [] | [Memo];
        created_at_time: [] | [Timestamp];
        amount: Tokens;
      }
    ],
    Result
  >;
}
