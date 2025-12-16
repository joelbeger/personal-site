export type StrapiCollectionResponse<T> = {
  data: T[]
  meta: any
}

export type StrapiSingleResponse<T> = {
  data: T | null
  meta: any
}

export const useStrapiClient = () => {
  const config = useRuntimeConfig()

  const client = $fetch.create({
    baseURL: `${config.public.strapiUrl}/api`,
  })

  const getCollection = <T>(path: string, params?: Record<string, any>) =>
    client<StrapiCollectionResponse<T>>(path, { params })

  const getSingle = <T>(path: string, params?: Record<string, any>) =>
    client<StrapiSingleResponse<T>>(path, { params })

  return { getCollection, getSingle }
}
