export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}

export function generateSEO(props: SEOProps = {}) {
  const {
    title = "Kaichin Kong - Design X Technology",
    description = "Portfolio of Kaichin Kong - Computer Science graduate student at UC San Diego, specializing in LLM infrastructure, ML systems, and design.",
    image = "/images/avatar.png",
    url = "https://h1yori233.github.io",
    type = "website",
    keywords = ["portfolio", "computer science", "machine learning", "design", "UC San Diego", "Zhejiang University"]
  } = props

  const siteName = "Kaichin Kong"
  const twitterHandle = "@kaichinkong"

  return {
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Kaichin Kong" }],
    creator: "Kaichin Kong",
    publisher: "Kaichin Kong",
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // google: "your-google-verification-code",
    },
  }
}
