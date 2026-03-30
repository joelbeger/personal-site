export const useSeo = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.siteUrl || 'https://joelbeger.com'

  const setPageSeo = (options: {
    title: string
    description: string
    image?: string
    path?: string
    jsonLd?: Record<string, any>
  }) => {
    const { title, description, image, path = '', jsonLd } = options
    const fullTitle = title.includes('Joel Beger') ? title : `${title} | Joel Beger`
    const url = `${baseUrl}${path}`
    const ogImage = image || `${baseUrl}/og-image.png`

    useSeoMeta({
      title: fullTitle,
      description,
      ogTitle: fullTitle,
      ogDescription: description,
      ogImage,
      ogUrl: url,
      twitterCard: 'summary_large_image',
      twitterTitle: fullTitle,
      twitterDescription: description,
      twitterImage: ogImage,
    })

    const headConfig: Record<string, any> = {
      link: [
        { rel: 'canonical', href: url }
      ]
    }

    if (jsonLd) {
      headConfig.script = [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd),
        }
      ]
    }

    useHead(headConfig)
  }

  return { setPageSeo, baseUrl }
}