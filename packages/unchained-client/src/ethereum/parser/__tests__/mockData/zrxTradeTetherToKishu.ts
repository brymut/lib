export default {
  tx: {
    txid: '0x7ae99994cc2630db20646cc3454cb8c84397862db0f9f67735cf8a2053c7a144',
    vin: [
      {
        n: 0,
        addresses: ['0xb8b19c048296E086DaF69F54d48dE2Da444dB047'],
        isAddress: true
      }
    ],
    vout: [
      {
        value: '0',
        n: 0,
        addresses: ['0xDef1C0ded9bec7F1a1670819833240f027b25EfF'],
        isAddress: true
      }
    ],
    blockHash: '0x80ac91bfae14c398043d421d3585f27fba1f6b62153a81b8879b99cdf52adfab',
    blockHeight: 12408996,
    confirmations: 22,
    blockTime: 1620680747,
    value: '0',
    fees: '78183644000000000',
    tokenTransfers: [
      {
        type: 'ERC20',
        from: '0xb8b19c048296E086DaF69F54d48dE2Da444dB047',
        to: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
        token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 6,
        value: '45000000000'
      },
      {
        type: 'ERC20',
        from: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
        to: '0xF82d8Ec196Fb0D56c6B82a8B1870F09502A49F88',
        token: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        value: '11448289873732555174'
      },
      {
        type: 'ERC20',
        from: '0xF82d8Ec196Fb0D56c6B82a8B1870F09502A49F88',
        to: '0xb8b19c048296E086DaF69F54d48dE2Da444dB047',
        token: '0xA2b4C0Af19cC16a6CfAcCe81F192B024d625817D',
        name: 'Kishu Inu',
        symbol: 'KISHU',
        decimals: 9,
        value: '9248567698016204727450'
      }
    ],
    ethereumSpecific: {
      status: 1,
      nonce: 207,
      gasLimit: 284175,
      gasUsed: 249788,
      gasPrice: '313000000000',
      data: '0xd9627aa400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000a7a3582000000000000000000000000000000000000000000000001f67ff0e4228bacf32e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a2b4c0af19cc16a6cfacce81f192b024d625817d869584cd0000000000000000000000007cba0eb7a94068324583be7771c5ecda25e4c4d10000000000000000000000000000000000000000000000c325e3478e6099a027'
    }
  }
}
