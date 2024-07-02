import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`
}
export function constructMetadata({
  title = "Lingo - Best way to learn a language",
  description = "Learn multiple languages online with bite-size lessons based on science.",
  image = "/thumbnail.png",
  icons = "/favicon.ico"
}: {
  title?: string,
  description?: string,
  image?: string,
  icons?: string
} = {}): Metadata {
  return {
    title, description, openGraph: {
      title, description, images: [{ url: image }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@arjunbector"
    },
    icons,
    metadataBase: new URL("https://lingo-three-pi.vercel.app")
  }
}