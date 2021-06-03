import { NFTStorage } from 'nft.storage'

const apiKey = process.env.REACT_APP_NFT_STORAGE_KEY as string

const client = new NFTStorage({ token: apiKey })

export const upload = async (image: File, title: string, link: string) => {
  return client
    .store({
      name: title,
      description: link,
      image: new File([image], 'image', {
        type: image.type,
        lastModified: image.lastModified,
      }),
    })
    .then(({ ipnft }) => ipnft)
}
