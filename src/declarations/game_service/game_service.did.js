export const idlFactory = ({ IDL }) => {
  const TableId = IDL.Record({ table_id: IDL.Nat64 });
  const Result = IDL.Variant({ Ok: IDL.Bool, Err: IDL.Text });
  const CallNumberReq = IDL.Record({
    table_id: IDL.Nat64,
    number: IDL.Nat32,
  });
  const CallNumberResp = IDL.Record({
    next_index: IDL.Nat32,
    rebegin: IDL.Bool,
    begin: IDL.Bool,
  });
  const Result_1 = IDL.Variant({ Ok: CallNumberResp, Err: IDL.Text });
  const GetSettlementRecord = IDL.Record({
    table_id: IDL.Nat64,
    create_time: IDL.Nat64,
    base_points: IDL.Nat64,
  });
  const TableStatus = IDL.Variant({
    Begining: IDL.Null,
    Calling: IDL.Null,
    Ending: IDL.Null,
    Ready: IDL.Null,
    Waiting: IDL.Null,
  });
  const Winner = IDL.Variant({
    Farmer: IDL.Null,
    Null: IDL.Null,
    Landlord: IDL.Null,
  });
  const Table = IDL.Record({
    status: TableStatus,
    current_gamer_index: IDL.Nat32,
    biggest_gamer: IDL.Opt(IDL.Principal),
    last_action_time: IDL.Nat64,
    cards: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat32))),
    farmers: IDL.Vec(IDL.Principal),
    last_pokers: IDL.Vec(IDL.Nat32),
    gamers: IDL.Vec(IDL.Principal),
    winner: Winner,
    shot_log_round: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat32))),
    biggest_num: IDL.Nat32,
    create_time: IDL.Nat64,
    multiple: IDL.Nat64,
    landlord: IDL.Opt(IDL.Principal),
    last_shot_gamer: IDL.Opt(IDL.Principal),
    call_number: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat32)),
    base_points: IDL.Nat64,
    pokers: IDL.Vec(IDL.Nat32),
  });
  const Result_2 = IDL.Variant({ Ok: IDL.Null, Err: IDL.Text });
  const SearchTableRes = IDL.Record({ base_points: IDL.Nat64 });
  const Result_3 = IDL.Variant({ Ok: IDL.Nat64, Err: IDL.Text });
  const SotPokerReq = IDL.Record({
    cards: IDL.Vec(IDL.Nat32),
    table_id: IDL.Nat64,
  });
  const SotPokerResp = IDL.Record({ is_end: IDL.Bool });
  const Result_4 = IDL.Variant({ Ok: SotPokerResp, Err: IDL.Text });
  const TableStatusResp = IDL.Record({
    status: TableStatus,
    request_time: IDL.Nat64,
    current_gamer_index: IDL.Nat32,
    biggest_gamer: IDL.Opt(IDL.Principal),
    cards: IDL.Vec(IDL.Nat32),
    farmers: IDL.Vec(IDL.Principal),
    gamer_cards_len: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat32)),
    last_pokers: IDL.Vec(IDL.Nat32),
    gamers: IDL.Vec(IDL.Principal),
    winner: Winner,
    shot_log_round: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Nat32))),
    biggest_num: IDL.Nat32,
    create_time: IDL.Nat64,
    multiple: IDL.Nat64,
    landlord: IDL.Opt(IDL.Principal),
    call_number: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat32)),
    base_points: IDL.Nat64,
    pokers: IDL.Vec(IDL.Nat32),
  });
  return IDL.Service({
    begin: IDL.Func([TableId], [Result], []),
    call_number: IDL.Func([CallNumberReq], [Result_1], []),
    cancel_gamer: IDL.Func([], [], []),
    destroy_table: IDL.Func([TableId], [], []),
    get_points: IDL.Func([], [IDL.Nat64], ['query']),
    get_settlement_record: IDL.Func([GetSettlementRecord], [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Int64))], ['query']),
    get_table: IDL.Func([TableId], [Table], []),
    mint_points: IDL.Func([], [Result_2], []),
    pass: IDL.Func([TableId], [Result_2], []),
    re_begin: IDL.Func([TableId], [Result], []),
    reset_table: IDL.Func([TableId], [Result_2], []),
    search_table: IDL.Func([SearchTableRes], [Result_3], []),
    shot_poker: IDL.Func([SotPokerReq], [Result_4], []),
    table_status: IDL.Func([TableId], [TableStatusResp], ['query']),
  });
};
export const init = ({ IDL }) => {
  return [];
};
