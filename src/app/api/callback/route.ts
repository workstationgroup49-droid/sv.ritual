import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, phone, message } = await req.json()

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Імʼя та телефон обовʼязкові' },
        { status: 400 }
      )
    }

    const token    = process.env.TELEGRAM_BOT_TOKEN
    const chatId   = process.env.TELEGRAM_GROUP_CHAT_ID
    const threadId = process.env.TELEGRAM_CALLBACK_THREAD_ID

    const text = [
      '📞 *Запит на передзвін*',
      '',
      `👤 Імʼя: ${name}`,
      `📱 Телефон: ${phone}`,
      message ? `💬 Повідомлення: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id:           chatId,
          message_thread_id: Number(threadId),
          text,
          parse_mode:        'Markdown',
        }),
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Помилка відправки' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch {
    return NextResponse.json(
      { error: 'Внутрішня помилка' },
      { status: 500 }
    )
  }
}
