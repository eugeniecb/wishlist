import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; WishlistBot/1.0)',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 502 })

    const html = await res.text()

    function getMeta(property: string): string | null {
      const match =
        html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'))
      return match ? match[1] : null
    }

    function getMetaName(name: string): string | null {
      const match =
        html.match(new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i'))
      return match ? match[1] : null
    }

    const name = getMeta('og:title') || getMetaName('title') || null
    const image = getMeta('og:image') || null
    const priceRaw =
      getMeta('og:price:amount') ||
      getMeta('product:price:amount') ||
      getMetaName('price') ||
      null
    const price = priceRaw ? parseFloat(priceRaw.replace(/[^0-9.]/g, '')) || null : null

    return NextResponse.json({ name, image, price })
  } catch {
    return NextResponse.json({ error: 'Failed to scrape URL' }, { status: 502 })
  }
}
