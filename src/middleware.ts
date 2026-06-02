import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Защищаем только дашборд, логин оставляем открытым
  if (pathname.startsWith('/admin/dashboard')) {
    const token = req.cookies.get('admin_token')?.value

    if (!token || token !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}