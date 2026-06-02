import { NextRequest, NextResponse } from 'next/server'
import { getStoredCode, setStoredCode } from '../send-code/route'

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  const stored = getStoredCode()

  // Перевіряємо чи є код
  if (!stored) {
    return NextResponse.json(
      { error: 'Спочатку запросіть код' },
      { status: 400 }
    )
  }

  // Перевіряємо термін дії
  if (Date.now() > stored.expiresAt) {
    setStoredCode(null)
    return NextResponse.json(
      { error: 'Код застарів. Запросіть новий' },
      { status: 401 }
    )
  }

  // Перевіряємо код
  if (code !== stored.code) {
    return NextResponse.json(
      { error: 'Невірний код' },
      { status: 401 }
    )
  }

  // Код вірний — очищаємо і видаємо куку
  setStoredCode(null)

  const response = NextResponse.json({ success: true })

  response.cookies.set('admin_token', process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   60 * 60 * 24 * 7,
    path:     '/',
  })

  return response
}
