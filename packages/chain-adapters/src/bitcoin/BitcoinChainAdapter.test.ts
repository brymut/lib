// Allow explicit any since this is a test file
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Test BitcoinChainAdapter
 * @group unit
 */

import { HDWallet } from '@shapeshiftoss/hdwallet-core'
import { NativeAdapterArgs, NativeHDWallet } from '@shapeshiftoss/hdwallet-native'
import { BIP44Params, chainAdapters, ChainTypes, UtxoAccountType } from '@shapeshiftoss/types'

import { ChainAdapterArgs } from '../utxo/UTXOBaseAdapter'
import * as bitcoin from './BitcoinChainAdapter'

const testMnemonic = 'alcohol woman abuse must during monitor noble actual mixed trade anger aisle'
const VALID_CHAIN_ID = 'bip122:000000000019d6689c085ae165831e93'
const VALID_ASSET_ID = 'bip122:000000000019d6689c085ae165831e93/slip44:0'

const getWallet = async (): Promise<HDWallet> => {
  const nativeAdapterArgs: NativeAdapterArgs = {
    mnemonic: testMnemonic,
    deviceId: 'test'
  }
  const wallet = new NativeHDWallet(nativeAdapterArgs)
  await wallet.initialize()

  return wallet
}

const getUtxosMockResponse = {
  data: [
    {
      txid: 'ef935d850e7d596f98c6e24d5f25faa770f6e6d8e5eab94dea3e2154c3643986',
      vout: 0,
      value: '1598',
      height: 705718,
      confirmations: 2,
      address: 'bc1qpszctuml70ulzf7f0zy5r4sg9nm65qfpgcw0uy',
      path: "m/84'/0'/0'/0/1"
    },
    {
      txid: 'adb979b44c86393236e307c45f9578d9bd064134a2779b4286c158c51ad4ab05',
      vout: 0,
      value: '31961',
      height: 705718,
      confirmations: 2,
      address: 'bc1qpszctuml70ulzf7f0zy5r4sg9nm65qfpgcw0uy',
      path: "m/84'/0'/0'/0/1"
    }
  ]
}

const getAccountMockResponse = {
  data: {
    balance: '33559',
    chain: 'bitcoin',
    nextChangeAddressIndex: 0,
    nextReceiveAddressIndex: 2,
    network: 'MAINNET',
    pubkey:
      'zpub6qSSRL9wLd6LNee7qjDEuULWccP5Vbm5nuX4geBu8zMCQBWsF5Jo5UswLVxFzcbCMr2yQPG27ZhDs1cUGKVH1RmqkG1PFHkEXyHG7EV3ogY',
    symbol: 'BTC'
  }
}

const getTransactionMockResponse = {
  data: {
    txid: 'adb979b44c86393236e307c45f9578d9bd064134a2779b4286c158c51ad4ab05',
    hash: 'adb979b44c86393236e307c45f9578d9bd064134a2779b4286c158c51ad4ab05',
    version: 1,
    size: 223,
    vsize: 223,
    weight: 892,
    locktime: 0,
    vin: [
      {
        txid: 'feab0ffe497740fcc8bcab9c5b12872c4302e629ee8ccc35ed4f6057fc7a4580',
        vout: 1,
        scriptSig: {
          asm: '3045022100cd627a0577d35454ced7f0a6ef8a3d3cf11c0f8696bda18062025478e0fc866002206c8ac559dc6bd851bdf00e33c1602fcaeee9d16b35d21b548529825f12dfe5ad[ALL] 027751a74f251ba2657ec2a2f374ce7d5ba1548359749823a59314c54a0670c126',
          hex: '483045022100cd627a0577d35454ced7f0a6ef8a3d3cf11c0f8696bda18062025478e0fc866002206c8ac559dc6bd851bdf00e33c1602fcaeee9d16b35d21b548529825f12dfe5ad0121027751a74f251ba2657ec2a2f374ce7d5ba1548359749823a59314c54a0670c126'
        },
        sequence: 4294967295
      }
    ],
    vout: [
      {
        value: 0.00031961,
        n: 0,
        scriptPubKey: {
          asm: '0 0c0585f37ff3f9f127c9788941d6082cf7aa0121',
          hex: '00140c0585f37ff3f9f127c9788941d6082cf7aa0121',
          reqSigs: 1,
          type: 'witness_v0_keyhash',
          addresses: ['bc1qpszctuml70ulzf7f0zy5r4sg9nm65qfpgcw0uy']
        }
      },
      {
        value: 0.00057203,
        n: 1,
        scriptPubKey: {
          asm: 'OP_DUP OP_HASH160 b22138dfe140e4611b98bdb728eed04beed754c4 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a914b22138dfe140e4611b98bdb728eed04beed754c488ac',
          reqSigs: 1,
          type: 'pubkeyhash',
          addresses: ['1HEs5TpTvrWHDFqLqfZnXFLFc4hqHjHe5M']
        }
      }
    ],
    hex: '010000000180457afc57604fed35cc8cee29e602432c87125b9cabbcc8fc407749fe0fabfe010000006b483045022100cd627a0577d35454ced7f0a6ef8a3d3cf11c0f8696bda18062025478e0fc866002206c8ac559dc6bd851bdf00e33c1602fcaeee9d16b35d21b548529825f12dfe5ad0121027751a74f251ba2657ec2a2f374ce7d5ba1548359749823a59314c54a0670c126ffffffff02d97c0000000000001600140c0585f37ff3f9f127c9788941d6082cf7aa012173df0000000000001976a914b22138dfe140e4611b98bdb728eed04beed754c488ac00000000',
    blockhash: '000000000000000000033c8ec44721d844aa63f4312d65261eb4c4d0cd4e0379',
    confirmations: 2,
    time: 1634662208,
    blocktime: 1634662208
  }
}

const getNetworkFeesMockedResponse = {
  data: {
    fast: {
      blocksUntilConfirmation: 1,
      satsPerKiloByte: 1024
    },
    average: {
      blocksUntilConfirmation: 1,
      satsPerKiloByte: 1024
    },
    slow: {
      blocksUntilConfirmation: 1,
      satsPerKiloByte: 1024
    }
  }
}

describe('BitcoinChainAdapter', () => {
  let args: ChainAdapterArgs = {} as any

  beforeEach(() => {
    args = {
      providers: {
        http: {} as any,
        ws: {} as any
      },
      coinName: 'Bitcoin',
      chainId: 'bip122:000000000019d6689c085ae165831e93'
    }
  })

  describe('constructor', () => {
    it('should return chainAdapter with Bitcoin chainId', () => {
      const adapter = new bitcoin.ChainAdapter(args)
      const chainId = adapter.getChainId()
      expect(chainId).toEqual(VALID_CHAIN_ID)
    })
    it('should return chainAdapter with valid chainId if called with valid testnet chainId', () => {
      args.chainId = 'bip122:000000000933ea01ad0ee984209779ba'
      const adapter = new bitcoin.ChainAdapter(args)
      const chainId = adapter.getChainId()
      expect(chainId).toEqual('bip122:000000000933ea01ad0ee984209779ba')
    })
    it('should return chainAdapter with Bitcoin assetId', () => {
      const adapter = new bitcoin.ChainAdapter(args)
      const assetId = adapter.getAssetId()
      expect(assetId).toEqual(VALID_ASSET_ID)
    })
    it('should throw if called with invalid chainId', () => {
      args.chainId = 'INVALID_CHAINID'
      expect(() => new bitcoin.ChainAdapter(args)).toThrow(
        'Bitcoin chainId INVALID_CHAINID not supported'
      )
    })
    it('should throw if called with non bitcoin chainId', () => {
      args.chainId = 'eip155:1'
      expect(() => new bitcoin.ChainAdapter(args)).toThrow('Bitcoin chainId eip155:1 not supported')
    })
    it('should use default chainId if no arg chainId provided.', () => {
      args.chainId = undefined
      const adapter = new bitcoin.ChainAdapter(args)
      const chainId = adapter.getChainId()
      expect(chainId).toEqual('bip122:000000000019d6689c085ae165831e93')
    })
  })

  describe('getType', () => {
    it('should return ChainTypes.Bitcoin', async () => {
      const adapter = new bitcoin.ChainAdapter(args)
      const type = adapter.getType()
      expect(type).toEqual(ChainTypes.Bitcoin)
    })
  })

  describe('getAccount', () => {
    it('should return account info for a specified address', async () => {
      args.providers.http = {
        getAccount: jest.fn().mockResolvedValue({
          data: {
            pubkey: '1EjpFGTWJ9CGRJUMA3SdQSdigxM31aXAFx',
            balance: '100',
            unconfirmedBalance: '50',
            addresses: [],
            nextChangeAddressIndex: 0,
            nextReceiveAddressIndex: 0
          }
        })
      } as any

      const adapter = new bitcoin.ChainAdapter(args)
      const expected: chainAdapters.Account<ChainTypes.Bitcoin> = {
        pubkey: '1EjpFGTWJ9CGRJUMA3SdQSdigxM31aXAFx',
        chain: ChainTypes.Bitcoin,
        balance: '150',
        chainId: 'bip122:000000000019d6689c085ae165831e93',
        assetId: 'bip122:000000000019d6689c085ae165831e93/slip44:0',
        chainSpecific: {
          addresses: [],
          nextChangeAddressIndex: 0,
          nextReceiveAddressIndex: 0
        }
      }
      const data = await adapter.getAccount('SomeFakeAddress')
      expect(data).toMatchObject(expected)
      expect(args.providers.http.getAccount).toHaveBeenCalled()
    })

    it('should throw for an unspecified address', async () => {
      args.providers.http = {
        getAccount: jest.fn<any, any>().mockResolvedValue({
          pubkey: '1EjpFGTWJ9CGRJUMA3SdQSdigxM31aXAFx',
          balance: '0'
        })
      } as any

      const adapter = new bitcoin.ChainAdapter(args)
      await expect(adapter.getAccount('')).rejects.toThrow(
        'UTXOBaseAdapter: pubkey parameter is not defined'
      )
    })
  })

  describe('getTxHistory', () => {
    it('should return tx history for a specified address', async () => {
      args.providers.http = {
        getTxHistory: jest.fn().mockResolvedValue({
          data: {
            page: 1,
            totalPages: 1,
            txs: 1,
            transactions: [
              {
                network: 'MAINNET',
                chain: 'bitcoin',
                symbol: 'BTC',
                txid: '123',
                status: 'confirmed',
                from: 'abc',
                value: '1337',
                fee: '1'
              }
            ]
          }
        })
      } as any

      const adapter = new bitcoin.ChainAdapter(args)
      const pubkey = '1EjpFGTWJ9CGRJUMA3SdQSdigxM31aXAFx'
      await expect(adapter.getTxHistory({ pubkey })).rejects.toThrow('Method not implemented.')
    })

    it('should fail for an unspecified address', async () => {
      args.providers.http = {
        getTxHistory: jest.fn().mockResolvedValue({
          data: {}
        })
      } as any

      const adapter = new bitcoin.ChainAdapter(args)
      const pubkey = ''
      await expect(adapter.getTxHistory({ pubkey })).rejects.toThrow('Method not implemented.')
    })
  })

  describe('buildSendTransaction', () => {
    it('should return a formatted BTCSignTx object for a valid BuildSendTxInput parameter', async () => {
      const wallet: any = await getWallet()

      args.providers.http = {
        getUtxos: jest.fn<any, any>().mockResolvedValue(getUtxosMockResponse),
        getTransaction: jest.fn<any, any>().mockResolvedValue(getTransactionMockResponse),
        getAccount: jest.fn().mockResolvedValue(getAccountMockResponse),
        getNetworkFees: jest.fn().mockResolvedValue(getNetworkFeesMockedResponse)
      } as any

      const adapter = new bitcoin.ChainAdapter(args)

      const bip44Params: BIP44Params = {
        purpose: 84,
        coinType: 0,
        accountNumber: 0,
        isChange: false
      }

      const txInput: chainAdapters.BuildSendTxInput<ChainTypes.Bitcoin> = {
        bip44Params,
        to: 'bc1qppzsgs9pt63cx9x994wf4e3qrpta0nm6htk9v4',
        value: '400',
        wallet,
        chainSpecific: {
          opReturnData: 'nm, u',
          accountType: UtxoAccountType.SegwitNative,
          satoshiPerByte: '1'
        }
      }

      await expect(adapter.buildSendTransaction(txInput)).resolves.toStrictEqual({
        txToSign: {
          coin: 'Bitcoin',
          inputs: [
            {
              addressNList: [2147483732, 2147483648, 2147483648, 0, 1],
              scriptType: 'p2wpkh',
              amount: '31961',
              vout: 0,
              txid: 'adb979b44c86393236e307c45f9578d9bd064134a2779b4286c158c51ad4ab05',
              hex: '010000000180457afc57604fed35cc8cee29e602432c87125b9cabbcc8fc407749fe0fabfe010000006b483045022100cd627a0577d35454ced7f0a6ef8a3d3cf11c0f8696bda18062025478e0fc866002206c8ac559dc6bd851bdf00e33c1602fcaeee9d16b35d21b548529825f12dfe5ad0121027751a74f251ba2657ec2a2f374ce7d5ba1548359749823a59314c54a0670c126ffffffff02d97c0000000000001600140c0585f37ff3f9f127c9788941d6082cf7aa012173df0000000000001976a914b22138dfe140e4611b98bdb728eed04beed754c488ac00000000'
            }
          ],
          outputs: [
            {
              addressType: 'spend',
              amount: '400',
              address: 'bc1qppzsgs9pt63cx9x994wf4e3qrpta0nm6htk9v4'
            },
            {
              addressType: 'change',
              amount: '31335',
              addressNList: [2147483732, 2147483648, 2147483648, 1, 0],
              scriptType: 'p2wpkh',
              isChange: true
            }
          ]
        }
      })
      expect(args.providers.http.getUtxos).toHaveBeenCalledTimes(1)
      expect(args.providers.http.getAccount).toHaveBeenCalledTimes(1)
      expect(args.providers.http.getTransaction).toHaveBeenCalledTimes(1)
    })
  })

  describe('signTransaction', () => {
    it('should sign a properly formatted signTxInput object', async () => {
      const wallet: any = await getWallet()

      args.providers.http = {
        getUtxos: jest.fn<any, any>().mockResolvedValue(getUtxosMockResponse),
        getTransaction: jest.fn<any, any>().mockResolvedValue(getTransactionMockResponse),
        getAccount: jest.fn().mockResolvedValue(getAccountMockResponse),
        getNetworkFees: jest.fn().mockResolvedValue(getNetworkFeesMockedResponse)
      } as any

      const adapter = new bitcoin.ChainAdapter(args)

      const bip44Params: BIP44Params = {
        purpose: 84,
        coinType: 0,
        accountNumber: 0,
        isChange: false
      }

      const txInput: chainAdapters.BuildSendTxInput<ChainTypes.Bitcoin> = {
        bip44Params,
        to: 'bc1qppzsgs9pt63cx9x994wf4e3qrpta0nm6htk9v4',
        value: '400',
        wallet,
        chainSpecific: {
          opReturnData: 'sup fool',
          accountType: UtxoAccountType.SegwitNative,
          satoshiPerByte: '1'
        }
      }

      const unsignedTx = await adapter.buildSendTransaction(txInput)

      const signedTx = await adapter.signTransaction({
        wallet,
        txToSign: unsignedTx?.txToSign
      })

      expect(signedTx).toEqual(
        '0100000000010105abd41ac558c186429b77a2344106bdd978955fc407e3363239864cb479b9ad0000000000ffffffff02900100000000000016001408450440a15ea38314c52d5c9ae6201857d7cf7a677a000000000000160014bf44db911ae5acc9cffcc1bbb9622ddda4a1112b024730440220106d6510888c70719b98069ccfa9dc92db248c1f5b7572d5cf86f3db1d371bf40220118ca57a08ed36f94772a5fbd2491a713fcb250a5ccb5e498ba70de8653763ff0121029dc27a53da073b1fea5601cf370d02d3b33cf572156c3a6df9d5c03c5dbcdcd700000000'
      )
    })
  })

  describe('broadcastTransaction', () => {
    it('is should correctly call broadcastTransaction', async () => {
      const sendDataResult = 'success'
      args.providers.http = {
        sendTx: jest.fn().mockResolvedValue({ data: sendDataResult })
      } as any
      const adapter = new bitcoin.ChainAdapter(args)
      const mockTx = '0x123'
      const result = await adapter.broadcastTransaction(mockTx)
      expect(args.providers.http.sendTx).toHaveBeenCalledWith<any>({ sendTxBody: { hex: mockTx } })
      expect(result).toEqual(sendDataResult)
    })
  })

  describe('getFeeData', () => {
    it('should return current BTC network fees', async () => {
      args.providers.http = {
        getNetworkFees: jest.fn().mockResolvedValue(getNetworkFeesMockedResponse),
        getUtxos: jest.fn().mockResolvedValue({ data: [] })
      } as any

      const adapter = new bitcoin.ChainAdapter(args)

      const data = await adapter.getFeeData({
        to: '0x',
        value: '0',
        chainSpecific: { pubkey: '123' }
      })
      expect(data).toEqual(
        expect.objectContaining({
          average: { chainSpecific: { satoshiPerByte: '1' }, txFee: '44' },
          fast: { chainSpecific: { satoshiPerByte: '1' }, txFee: '44' },
          slow: { chainSpecific: { satoshiPerByte: '1' }, txFee: '44' }
        })
      )
    })
  })

  describe('getAddress', () => {
    it("should return a p2pkh address for valid derivation root path parameters (m/44'/0'/0'/0/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 44,
        accountNumber: 0,
        isChange: false,
        index: 0
      }

      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.P2pkh
      })
      expect(addr).toStrictEqual('1FH6ehAd5ZFXCM1cLGzHxK1s4dGdq1JusM')
    })

    it("should return a valid p2pkh address for the first receive index path (m/44'/0'/0'/0/1)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 44,
        accountNumber: 0,
        index: 1,
        isChange: false
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.P2pkh
      })
      expect(addr).toStrictEqual('1Jxtem176sCXHnK7QCShoafF5VtWvMa7eq')
    })

    it("should return a valid p2pkh change address for the first receive index path (m/44'/0'/0'/1/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 44,
        accountNumber: 0,
        index: 0,
        isChange: true
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.P2pkh
      })
      expect(addr).toStrictEqual('13ZD8S4qR6h4GvkAZ2ht7rpr15TFXYxGCx')
    })

    it("should return a valid p2pkh address at the 2nd account root path (m/44'/0'/1'/0/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 44,
        accountNumber: 1,
        index: 0,
        isChange: false
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.P2pkh
      })
      expect(addr).toStrictEqual('1K2oFer6nGoXSPspeB5Qvt4htJvw3y31XW')
    })

    it("should return a p2wpkh address for valid derivation root path parameters (m/84'/0'/0'/0/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 84,
        accountNumber: 0,
        isChange: false,
        index: 0
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.SegwitNative
      })
      expect(addr).toStrictEqual('bc1qkkr2uvry034tsj4p52za2pg42ug4pxg5qfxyfa')
    })

    it("should return a valid p2wpkh address for the first receive index path (m/84'/0'/0'/0/1)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 84,
        accountNumber: 0,
        index: 1,
        isChange: false
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.SegwitNative
      })
      expect(addr).toStrictEqual('bc1qpszctuml70ulzf7f0zy5r4sg9nm65qfpgcw0uy')
    })

    it("should return a valid p2wpkh change address for the first receive index path (m/44'/0'/0'/1/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 84,
        accountNumber: 0,
        index: 0,
        isChange: true
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.SegwitNative
      })
      expect(addr).toStrictEqual('bc1qhazdhyg6ukkvnnlucxamjc3dmkj2zyfte0lqa9')
    })

    it("should return a valid p2wpkh address at the 2nd account root path (m/84'/0'/1'/0/0)", async () => {
      const wallet: HDWallet = await getWallet()
      const adapter = new bitcoin.ChainAdapter(args)
      const bip44Params: BIP44Params = {
        coinType: 0,
        purpose: 84,
        accountNumber: 1,
        index: 0,
        isChange: false
      }
      const addr: string | undefined = await adapter.getAddress({
        bip44Params,
        wallet,
        accountType: UtxoAccountType.SegwitNative
      })
      expect(addr).toStrictEqual('bc1qgawuludfvrdxfq0x55k26ydtg2hrx64jp3u6am')
    })
  })

  describe('validateAddress', () => {
    it('should return true for a valid address', async () => {
      const adapter = new bitcoin.ChainAdapter(args)
      const referenceAddress = '1EjpFGTWJ9CGRJUMA3SdQSdigxM31aXAFx'
      const expectedReturnValue = { valid: true, result: 'valid' }
      const res = await adapter.validateAddress(referenceAddress)
      expect(res).toMatchObject(expectedReturnValue)
    })

    it('should return false for an invalid address', async () => {
      const adapter = new bitcoin.ChainAdapter(args)
      const referenceAddress = ''
      const expectedReturnValue = { valid: false, result: 'invalid' }
      const res = await adapter.validateAddress(referenceAddress)
      expect(res).toMatchObject(expectedReturnValue)
    })
  })
})
