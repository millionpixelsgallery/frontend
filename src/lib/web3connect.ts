import Web3Modal, { getInjectedProvider } from 'web3modal'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { ethers } from 'ethers'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { abi } from './contract.json'

const ENV = process.env.REACT_APP_NETWORK as string
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const isMainnet = ENV === 'production'
let RPC: string = 'http://localhost:8545',
  CONTRACT_ADDRESS: string = process.env.REACT_APP_CONTRACT_ADDRESS as string
const FORTMATIC_KEY = (
  isMainnet ? process.env.REACT_APP_FORTMATIC_KEY_PROD : process.env.REACT_APP_FORTMATIC_KEY
) as string
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY as string
let NETWORK = 'local'
let CHAIN_ID = 4447
switch (ENV) {
  case 'local':
    RPC = 'http://localhost:8545'
    CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    break
  case 'development':
    RPC = 'https://rinkeby.infura.io/v3/' + INFURA_KEY
    NETWORK = 'rinkeby'
    CHAIN_ID = 4
    break
  case 'production':
    RPC = 'https://mainnet.infura.io/v3/' + INFURA_KEY
    CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS_PROD as string
    NETWORK = 'mainnet'
    CHAIN_ID = 1
    break
}

const web3Options = {
  cacheProvider: true,
  providerOptions: {
    fortmatic: {
      package: Fortmatic,
      options: {
        key: FORTMATIC_KEY,
        network: NETWORK,
      },
    },
    portis: {
      package: Portis,
      options: {
        id: PORTIS_KEY,
        network: NETWORK,
        config: {
          nodeUrl: RPC,
        },
      },
    },
    torus: {
      package: Torus,
      options: {
        config: { enableLogging: true },
        networkParams: { host: NETWORK },
      },
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_KEY, // required
      },
    },
  },
  disableInjectedProvider: false,
}

export type Web3Providers = keyof typeof web3Options['providerOptions'] | 'metamask'

const web3Modal = new Web3Modal(web3Options)

export type Area = [x: number, y: number, width: number, height: number]
export type Sale = {
  price: number
  end: number
}
export type Pixels = {
  index: number
  sale?: Sale
  ipfs: string
  area: Area
  owner: string
  image?: {
    title: string
    link: string
    image: string
  }
}

export type ConnectionDetails = {
  address: string
  chainId: string
  isConnected: boolean
  isCorrectNetwork: boolean
}
export class Web3Connect {
  static get cachedProvider() {
    console.log('cached provider:', web3Modal.cachedProvider)
    return Boolean(web3Modal.cachedProvider)
  }

  private provider: any
  private static defaultContact: any = new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    ethers.getDefaultProvider(RPC)
  )
  private contract: any
  private web3: any
  private account: any
  private readonly onAccountChange: (w3c?: Web3Methods) => void

  constructor(onAccountChange?: (w3c?: Web3Methods) => void) {
    if (!onAccountChange) {
      this.onAccountChange = () => void 0
    } else {
      this.onAccountChange = onAccountChange
    }
  }

  public static hasMetamask(): boolean {
    return Boolean(getInjectedProvider())
  }

  public async connect(provider?: Web3Providers) {
    try {
      if (provider === 'metamask' && !Web3Connect.hasMetamask()) {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
          '_blank'
        )
        return
      }
      console.log({ provider, NETWORK, CONTRACT_ADDRESS })
      this.provider = provider
        ? await web3Modal.connectTo(provider === 'metamask' ? 'injected' : provider)
        : await web3Modal.connect()
    } catch (e) {
      console.log('Could not get a wallet connection', e)
      throw e
    }
    console.log('got provider:', { provider: this.provider })

    if (provider === 'fortmatic') {
      this.provider = this.provider.fm.getProvider()
      console.log('fortmatic', this.provider.fm)
    }
    if (this.provider.on) {
      this.provider.on('accountsChanged', this._fetchAccountData.bind(this))
      this.provider.on('chainChanged', this._fetchAccountData.bind(this))
    }

    return this._fetchAccountData()
  }

  private methodsReady = false

  private async _fetchAccountData() {
    this.web3 = new Web3(this.provider)
    console.log('Web3 instance is', this.web3, this.provider)

    const accounts = await this.web3.eth.getAccounts()

    if (!accounts || accounts.length === 0) {
      if (this.methodsReady) {
        //if user disconnected all accounts then next time, ask for provider again
        web3Modal.clearCachedProvider()
        this.onAccountChange(undefined)
        // eslint-disable-next-line no-restricted-globals
        // location?.reload()
        return
      }
      throw new Error(`Can't get accounts list`)
    }

    console.log('Accounts list', accounts)
    this.account = accounts[0]
    console.log('Selected account', this.account)

    this.contract = new this.web3.eth.Contract(abi as AbiItem[], CONTRACT_ADDRESS)

    const methods = new Web3Methods(this.contract, this.web3, this.account)
    this.onAccountChange(methods)

    this.methodsReady = true
    return methods
  }

  public static async mediumSize(): Promise<Area> {
    const cachedArea = this.getLocalCache<Area>('medium_size', 'area')
    if (cachedArea) return cachedArea

    const area = await Promise.all([
      this.defaultContact.MEDIUM(0),
      this.defaultContact.MEDIUM(1),
      this.defaultContact.MEDIUM(2),
      this.defaultContact.MEDIUM(3),
    ])

    this.setLocalCache('medium_size', area)

    return area
  }

  public static async topSize(): Promise<Area> {
    const cachedArea = this.getLocalCache<Area>('top_size', 'area')
    if (cachedArea) return cachedArea

    const area = await Promise.all([
      this.defaultContact.TOP(0),
      this.defaultContact.TOP(1),
      this.defaultContact.TOP(2),
      this.defaultContact.TOP(3),
    ])

    this.setLocalCache('top_size', area)

    return area
  }

  private static getLocalCache<T = any>(key: string, validate?: 'area'): T | null {
    key = `${key}:${CONTRACT_ADDRESS}`
    const validators = {
      area(value: any): value is Area {
        return (
          Array.isArray(value) &&
          value.length === 4 &&
          value.every((value) => typeof value === 'number')
        )
      },
    }

    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const value = JSON.parse(raw)
      if (!validate) {
        return value
      } else {
        if (validators[validate](value)) {
          return value as any as T
        } else {
          localStorage.removeItem(key)
          return null
        }
      }
    } catch (e) {
      console.warn(e)
      return null
    }
  }

  private static setLocalCache(key: string, value: any) {
    key = `${key}:${CONTRACT_ADDRESS}`
    localStorage.setItem(key, JSON.stringify(value))
  }

  public static async getPixelsCost(
    area: Area
  ): Promise<{ raw: string; format: string; isAvailable: boolean }> {
    const [, isAvailable] = await this.defaultContact.isAreaAvailable(area)
    if (area[0] + area[2] > 1000 || area[1] + area[3] > 1000) throw new Error(`Too big area`)

    const raw = await this.defaultContact.pixelsCost(area)

    return {
      raw,
      format: parseFloat(Web3.utils.fromWei(`${raw}`)).toFixed(4),
      isAvailable,
    }
  }

  public static async getAllPixels() {
    const pixels: Array<Promise<Pixels>> = []
    const count = await this.defaultContact.getAreasCount()
    for (let i = 0; i < count; i++) {
      pixels.push(this.getPixels(i))
    }

    return Promise.all(pixels)
  }

  public static async getPixels(index: number): Promise<Pixels> {
    let data: Pixels
    try {
      const [{ ipfs }, area, owner, isForSale] = await Promise.all([
        this.defaultContact.areas(index),
        this.defaultContact.getBounds(index),
        this.defaultContact.ownerOf(index),
        this.defaultContact.isForSale(index),
      ])

      let sale

      if (isForSale) {
        sale = await this.defaultContact.forSale(index)
        if (sale.end < Date.now() / 1000) {
          sale = undefined
        }

        if (sale) {
          sale = {
            end: parseInt(sale.end.toString()),
            price: Intl.NumberFormat('en', { maximumFractionDigits: 18 }).format(
              parseFloat(Web3.utils.fromWei(sale.price.toString()))
            ),
          }
        }
      }

      const image = ipfs
        ? await fetch(`https://cloudflare-ipfs.com/ipfs/${ipfs}/metadata.json`)
            .then((r) => r.json())
            .then((j) => ({
              title: j.name,
              link: j.description,
              image: j.image.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/'),
            }))
            .catch((e) => {
              console.log(
                `Can't find image by the link: https://cloudflare-ipfs.com/ipfs/${ipfs}/`,
                e
              )
              return undefined
            })
        : undefined

      data = { index, ipfs, sale, area, owner, image }
    } catch (e) {
      console.log(e)
      throw new Error(`Area ${index} is not available`)
    }

    return data
  }
}

export class Web3Methods {
  network = NETWORK
  constructor(private contract: any, public web3: any, private account: any) {}

  public async connectionDetails(): Promise<ConnectionDetails> {
    const [selectedAddress] = (await this.web3.currentProvider.enable()) || []
    const [isConnected, chainId, address] = await Promise.all([
      !!selectedAddress,
      this.web3.eth.getChainId(),
      selectedAddress,
    ])
    const isCorrectNetwork = parseInt(chainId) === CHAIN_ID
    return { isConnected, chainId, address, isCorrectNetwork }
  }

  public async switchMainnet(): Promise<void> {
    if (this.web3.currentProvider._portis) {
      return this.web3.currentProvider._portis.changeNetwork(NETWORK)
    }
    if (this.web3.currentProvider.torus) {
      return this.web3.currentProvider.torus.setProvider({ host: NETWORK })
    }

    if (this.web3.currentProvider.isMetaMask) {
      return this.web3.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: isMainnet ? '0x1' : '0x4' }],
      })
    }
  }
  public async commit(
    area: Area,
    txHashCallback: (hash: string) => void = () => undefined
  ): Promise<string> {
    const { 1: isAvailable } = await this.contract.methods.isAreaAvailable(area).call()

    if (isAvailable && area[2] > 0 && area[3] > 0) {
      try {
        const random = (Math.random() * 1e10).toFixed(0)
        const hash = ethers.utils.solidityKeccak256(
          ['uint32[4]', 'uint256', 'address'],
          [area, random, this.account]
        )
        await this.contract.methods
          .commitToPixels(hash)
          .send({ from: this.account })
          .on('transactionHash', txHashCallback)
        return random
      } catch (e) {
        console.warn('Commit already set', e)
        throw new Error('Commit failed')
      }
    } else {
      throw new Error('Area is not available')
    }
  }

  public async buyPixels(
    area: Area,
    random: string,
    ipfs: string,
    txHashCallback: (hash: string) => void = () => undefined
  ): Promise<Pixels> {
    const { 1: isAvailable } = await this.contract.methods.isAreaAvailable(area).call()

    if (isAvailable && area[2] > 0 && area[3] > 0) {
      const price = await Web3Connect.getPixelsCost(area)
      await this.contract.methods
        .buyPixels(area, random, ipfs)
        .send({ from: this.account, value: price.raw })
        .on('transactionHash', txHashCallback)

      const count = await this.contract.methods.getAreasCount().call()

      return Web3Connect.getPixels(count - 1)
    } else {
      throw new Error('Area is not available')
    }
  }

  public async getAllMyPixels() {
    return Web3Connect.getAllPixels().then((pixels) =>
      pixels.filter(({ owner }) => this.account === owner)
    )
  }

  public async setIpfs(
    index: number,
    ipfs: string,
    txHashCallback: (hash: string) => void = () => undefined
  ) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner === this.account) {
      await this.contract.methods
        .setIPFSHash(index, ipfs)
        .send({ from: this.account })
        .on('transactionHash', txHashCallback)

      return Web3Connect.getPixels(index)
    }

    throw new Error(`Pixels do not belong to you`)
  }

  public async sellPixels(
    index: number,
    price: string,
    duration: number,
    txHashCallback: (hash: string) => void = () => undefined
  ) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner === this.account) {
      await this.contract.methods
        .sell(index, this.web3.utils.toWei(price, 'ether'), duration)
        .send({ from: this.account })
        .on('transactionHash', txHashCallback)

      return Web3Connect.getPixels(index)
    }

    throw new Error(`Pixels do not belong to you`)
  }

  public async buyPixelsForSale(
    index: number,
    ipfs: string,
    txHashCallback: (hash: string) => void = () => undefined
  ) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner !== this.account) {
      if (!pixels.sale || pixels.sale.end < Date.now() / 1000) {
        throw new Error(`Pixels not in sale`)
      }
      try {
        await this.contract.methods
          .buy(index, ipfs)
          .send({
            from: this.account,
            value: this.web3.utils.toWei(`${pixels.sale.price}`, 'ether'),
          })
          .on('transactionHash', txHashCallback)

        return Web3Connect.getPixels(index)
      } catch (e) {
        throw new Error(`You can't buy pixels`)
      }
    }

    throw new Error(`You can't buy your pixels`)
  }

  public getAccount() {
    return this.account as string
  }
}
