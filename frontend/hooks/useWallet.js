import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serialize } from 'borsh';

// near api js
import { keyStores, providers } from 'near-api-js';

// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import LedgerIconUrl from '@near-wallet-selector/ledger/assets/ledger-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';

// wallet selector options
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from "@near-wallet-selector/near-wallet";

const WalletContext = createContext()


export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState()
  const [accountId, setAccountId] = useState('')
  const [profile, setProfile] = useState()
  const [walletSelector, setWalletSelector] = useState()
  const [contractId, setContractId] = useState(null)

  useEffect(() => {
    if(!walletSelector) {
      startUp()
    }
  }, [walletSelector])

const startUp = async (network = 'testnet') => {
  const walletSelector = await setupWalletSelector({
    network: network,
    modules: [setupMyNearWallet({ iconUrl: MyNearIconUrl }),
    setupLedger({ iconUrl: LedgerIconUrl }),
    setupNearWallet(),
  ],
  });
  setWalletSelector(walletSelector)

  const isSignedIn = walletSelector.isSignedIn();

  if (isSignedIn) {
    const wallet = await walletSelector.wallet();
    const accountId = walletSelector.store.getState().accounts[0].accountId;

    setWallet(wallet)
    setAccountId(accountId)
  }

  return isSignedIn;
}

  // Sign-in method
  const signIn = (contractId) => {
    setContractId(contractId)
    const description = 'Please select a wallet to sign in.';
    const modal = setupModal(walletSelector, { contractId, description });
    modal.show();
  }

  // Sign-out method
  const signOut = () => {
    wallet.signOut();

    setWallet(null)
    setAccountId(null)
    setContractId(null)
    
    window.location.replace(window.location.origin + window.location.pathname);
  }

  const viewMethod = async (contractId, method, args = {}) => {
    if(!walletSelector) { return }

    const { network } = walletSelector.options;
    const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

    let res = await provider.query({
      request_type: 'call_function',
      account_id: contractId,
      method_name: method,
      args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
      finality: 'optimistic',
    });

    return JSON.parse(Buffer.from(res.result).toString());
  }

  const callMethod = async ({ contractId, method, args = {}, gas = process.env.THIRTY_TGAS, deposit = process.env.DEPOSIT }) => {
    // Sign a transaction with the "FunctionCall" action
    console.log(args, JSON.stringify(args))
    return await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: contractId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: method,
            args,
            gas,
            deposit,
          },
        },
      ],
    });
  }

  const callBatchMethod = async (contractId, actions) => {
    let functions = []

    for(action in actions) {
      functions.push({
        type: 'FunctionCall',
          params: {
            methodName: action.method,
            args: action.args,
            gas: action.gas || process.env.THIRTY_TGAS,
            deposit: action.deposit || process.env.DEPOSIT,
          },
      })
    }

    return await wallet.signAndSendTransaction({
      signerId: accountId,
      receiverId: contractId,
      actions: functions,
    });
  } 

  /* const callBatchMethod = async (contractId, actions) => {
    let functions = [];
  
    for (const action of actions) {
      functions.push({
        type: "FunctionCall",
        params: {
          methodName: action.method,
          args: action.args,
          gas: action.gas || process.env.THIRTY_TGAS,
          deposit: action.deposit || process.env.DEPOSIT,
        },
      });
    }
  
    if (functions.length === 0) {
      return;
    }
  
    const transaction = {
      receiverId: contractId,
      actions: functions,
    };
  
    try {
      const serializedTx = serialize(
        borsh.Transaction.serialize,
        transaction
      );
  
      const { signature, transactionHash } = await wallet.signAndSendTransaction(
        serializedTx
      );
  
      console.log(`Transaction hash: ${transactionHash}`);
      return { signature, transactionHash };
    } catch (error) {
      console.error(`Error sending transaction: ${error}`);
      throw error;
    }
  }; */
  

  const value = {
    wallet,
    accountId,
    contractId,
    startUp,
    signIn,
    signOut,
    viewMethod,
    callMethod,
    callBatchMethod
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export const useWallet = () => {
  return useContext(WalletContext);
};