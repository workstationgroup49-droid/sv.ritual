import { NextRequest, NextResponse } from 'next/server'

let storedCode: { code: string; expiresAt: number } | null = null

export function getStoredCode() { return storedCode }
export function setStoredCode(val: typeof storedCode) { storedCode = val }

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Невірний пароль' }, { status: 401 })
  }

  // Генеруємо код
  const code      = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 5 * 60 * 1000
  setStoredCode({ code, expiresAt })

  const token    = process.env.TELEGRAM_BOT_TOKEN
  const chatId   = process.env.TELEGRAM_GROUP_CHAT_ID
  const threadId = process.env.TELEGRAM_LOGIN_THREAD_ID

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id:           chatId,
      message_thread_id: Number(threadId),
      text:              `🔐 *Код входу в адмін-панель*\n\nКод: \`${code}\`\n\nДіє 5 хвилин`,
      parse_mode:        'Markdown',
    }),
  })

  return NextResponse.json({ success: true })
}
