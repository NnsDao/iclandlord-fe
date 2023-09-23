import { IC } from '@astrox/sdk-web';
import { HttpAgent } from '@dfinity/agent';
import { AccountIdentifier, LedgerCanister } from '@dfinity/nns';
import { Principal } from '@dfinity/principal';
import axios from 'axios';

const icpPrice = 'https://datapool.memecake.io/ticker/icpusdt';

export const pluralize = (str: string, n: number) => (n === 1 ? str : str + 's');

export const formatE8s = (number: any, digits?: number) => {
  let n = number;
  if (typeof number !== 'number') {
    n = Number(n);
  }
  return formatNumber(n / 1e8, digits);
};

export const formatNumber = (number: any, digits?: number) => {
  let n = number;
  if (typeof number !== 'number') {
    n = Number(n);
  }
  const maximumFractionDigits = typeof digits === 'undefined' ? (number < 1 ? 8 : 4) : digits;
  return Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(n);
};

export const shortAccount = (accountId: string) => `${accountId.slice(0, 4)}...${accountId.slice(-4)}`;

export const shortPrincipal = (principal: string | Principal) => {
  const parts = (typeof principal === 'string' ? principal : principal.toText()).split('-');
  return `${parts[0]}...${parts.slice(-1)[0]}`;
};

export const enumEntries = (enum_: Object): [string, number][] =>
  Object.entries(enum_).filter(([name, id]) => typeof id === 'number');

export const principalIsEqual = (p1: Principal, p2: Principal) => {
  if (!p1 || !p2) return false;
  const a1 = p1.toUint8Array();
  const a2 = p2.toUint8Array();
  return a1.length === a2.length && a1.every((value, index) => value === a2[index]);
};

export async function tryCall<T extends (...args: any) => any>(f: T): Promise<ReturnType<T>> {
  try {
    return await f();
  } catch (error) {
    throw (error as any).message;
  }
}

export const astroxConfig = {
  providerUrl: 'https://63k2f-nyaaa-aaaah-aakla-cai.raw.ic0.app',
  delegationModes: ['global'],
  ledgerHost: 'https://icp0.io/',
};

export const astroxInit = async (host = '', whitelist = []) => {
  const ic = await IC.create({
    useFrame: !(window.innerWidth < 768),
    signerProviderUrl: `${astroxConfig.providerUrl}/#signer`,
    walletProviderUrl: `${astroxConfig.providerUrl}/#transaction`,
    identityProvider: `${astroxConfig.providerUrl}/#authorize`,
    host: host ? host : astroxConfig.ledgerHost,
    ledgerHost: host ? host : astroxConfig.ledgerHost,
    ledgerCanisterId: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
    permissions: ['permissions-identity', 'permissions-wallet'],
    delegationTargets: whitelist,
    noUnify: false,
  });
  return ic;
};

export const fetchICPPrice = async () => {
  try {
    const response = await axios.get(icpPrice);
    if (response.status === 200) {
      return response.data.price; // ['internet-computer']['usd'];
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    throw new Error((error as any).message);
  }
};

export const getUserICP = async (address, _agent?) => {
  const agant = _agent ? _agent : new HttpAgent();
  //@ts-ignore
  const ledger = LedgerCanister.create({ agent: agant });
  const balance = await ledger.accountBalance({
    accountIdentifier: AccountIdentifier.fromHex(address),
  });
  console.log('ICP balance', balance);
  return balance;
};
