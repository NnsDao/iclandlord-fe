declare namespace ic {
  class plug {
    static isConnected: () => boolean;
    static requestConnect: (params: PlugConnectParams) => string;
    static createAgent: (params: PlugConnectParams) => string;
    static agent: HttpAgent;
    static createActor: (params: PlugCreateActorParams) => any;
    static sessionManager: {
      sessionData: {
        agent: HttpAgent;
        principalId: string;
        accountId: string;
      };
    };
  }
}

interface PlugConnectParams {
  whitelist: string[];
  onConnectionUpdate?: () => void;
  host?: string;
  timeout?: number;
}

declare module 'ic-stoic-identity' {
  const StoicIdentity: any;
  const load: (any) => any;
}

interface PlugCreateActorParams {
  canisterId: string;
  interfaceFactory: () => any;
}
