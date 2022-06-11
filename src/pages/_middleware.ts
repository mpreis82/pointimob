import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const hostname = req.headers.get("host")
  const { pathname } = req.nextUrl
  const currentHost = process.env.NODE_ENV == 'production'
    ? hostname
    : hostname.replace('.localhost:3000', '')

  const tenants = ['marcos', 'roberta', 'manu', 'gabi']

  console.log(
    'currentHost::', currentHost,
    'pathname::', req.nextUrl.pathname,
    'hostname::', req.headers.get("host")
  )

  if (currentHost == 'app') {
    console.log('::entrou no app::')
    url.pathname = `/app${pathname}`
    return NextResponse.rewrite(url)
  }

  if (hostname == 'localhost:3000') {
    console.log('::entrou na home::')
    url.pathname = `/home${pathname}`
    return NextResponse.rewrite(url)
  }

  if (tenants.includes(currentHost)) {
    console.log('::entrou no tenant::')
    url.pathname = `/_site/${currentHost}${pathname}`
    return NextResponse.rewrite(url)
  }

  return new Response(null, {
    status: 404,
  })
}