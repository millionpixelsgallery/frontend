import Web3Modal, { getInjectedProvider } from 'web3modal'
import Portis from '@portis/web3'
import Fortmatic from 'fortmatic'
import Torus from '@toruslabs/torus-embed'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { ethers } from 'ethers'

import { abi } from './contract.json'

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS as string
const NETWORK = process.env.REACT_APP_NETWORK as string
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY as string
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY as string

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
      },
    },
    torus: {
      package: Torus,
      options: {
        network: NETWORK,
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

export class Web3Connect {
  static get cachedProvider() {
    console.log('cached provider', web3Modal.cachedProvider)
    return Boolean(web3Modal.cachedProvider)
  }

  private provider: any
  private static defaultContact: any = new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    ethers.getDefaultProvider(NETWORK)
  )
  private contract: any
  private web3: any
  private account: any
  private readonly onAccountChange: (w3c: Web3Methods) => void

  constructor(onAccountChange?: (w3c: Web3Methods) => void) {
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
      this.provider = provider
        ? await web3Modal.connectTo(provider === 'metamask' ? 'injected' : provider)
        : await web3Modal.connect()
    } catch (e) {
      console.log('Could not get a wallet connection', e)
      throw e
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
        // eslint-disable-next-line no-restricted-globals
        location?.reload()
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
            price: parseInt(Web3.utils.fromWei(sale.price.toString())),
          }
        }
      }

      const image = ipfs
        ? await fetch(`https://${ipfs}.ipfs.dweb.link/metadata.json`)
            .then((r) => r.json())
            .then((j) => ({
              title: j.name,
              link: j.description,
              image: `https://${j.image
                .replace('ipfs://', '')
                .replace('/image', '')}.ipfs.dweb.link/image`,
            }))
            .catch((e) => {
              console.log(`Can't find image by the link: https://${ipfs}.ipfs.dweb.link/`, e)
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
  constructor(private contract: any, private web3: any, private account: any) {}

  public async buyPixels(area: Area, ipfs: string): Promise<Pixels> {
    return new Promise(async (resolve, reject) => {
      const { 1: isAvailable } = await this.contract.methods.isAreaAvailable(area).call()

      if (isAvailable && area[2] > 0 && area[3] > 0) {
        try {
          const hash = ethers.utils.solidityKeccak256(
            ['uint32[4]', 'string', 'address'],
            [area, ipfs, this.account]
          )
          await this.contract.methods.commitToPixels(hash).send({ from: this.account })
        } catch (e) {
          console.warn('Commit already set')
        }

        const price = await Web3Connect.getPixelsCost(area)
        await this.contract.methods
          .buyPixels(area, ipfs)
          .send({ from: this.account, value: price.raw })

        const count = await this.contract.methods.getAreasCount().call()

        resolve(Web3Connect.getPixels(count - 1))
      } else {
        return reject(new Error('Area is not available'))
      }
    })
  }

  public async getAllMyPixels() {
    return Web3Connect.getAllPixels().then((pixels) =>
      pixels.filter(({ owner }) => this.account === owner)
    )
  }

  public async setIpfs(index: number, ipfs: string) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner === this.account) {
      await this.contract.methods.setIPFSHash(index, ipfs).send({ from: this.account })

      return Web3Connect.getPixels(index)
    }

    throw new Error(`Pixels do not belong to you`)
  }

  public async sellPixels(index: number, price: number, duration: number) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner === this.account) {
      await this.contract.methods
        .sell(index, this.web3.utils.toWei(`${price}`, 'ether'), duration)
        .send({ from: this.account })

      return Web3Connect.getPixels(index)
    }

    throw new Error(`Pixels do not belong to you`)
  }

  public async buyPixelsForSale(index: number, ipfs: string) {
    const pixels = await Web3Connect.getPixels(index)
    if (pixels.owner !== this.account) {
      if (!pixels.sale || pixels.sale.end < Date.now() / 1000) {
        throw new Error(`Pixels not in sale`)
      }
      try {
        await this.contract.methods.buy(index, ipfs).send({
          from: this.account,
          value: this.web3.utils.toWei(`${pixels.sale.price}`, 'ether'),
        })

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
