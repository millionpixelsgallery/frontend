import { NFTStorage } from 'nft.storage'

const apiKey = process.env.REACT_APP_NFT_STORAGE_KEY as string

const client = new NFTStorage({ token: apiKey })

export const upload = async (image: File) => client.storeBlob(image)
