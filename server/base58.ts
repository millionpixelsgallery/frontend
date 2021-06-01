import bs58 from 'bs58'
import { Buffer } from 'base58'

export function encode(ipfs_hash: string) {
  const h = bs58.decode(ipfs_hash).toString('hex').replace(/^1220/, '')
  if (h.length != 64) {
    throw new Error(`Invalid IPFS hash`)
  }
  return '0x' + h
}

export function decode(hash_hex: string) {
  return bs58.encode(Buffer.from(hash_hex.replace(/^0x/, '1220'), 'hex'))
}
