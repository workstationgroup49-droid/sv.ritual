import { NextRequest, NextResponse } from 'next/server'
import { sendOrderToTelegram } from '@/services/telegram/sendOrder'
import { Order } from '@/types/order'

export async function POST(req: NextRequest) {
  try {
    const order: Order = await req.json()

    // Базовая валидация
    if (!order.customer?.name || !order.customer?.phone || !order.items?.length) {
      return NextResponse.json(
        { error: 'Недостаточно данных для оформления заказа' },
        { status: 400 }
      )
    }

    const ok = await sendOrderToTelegram(order)

    if (!ok) {
      return NextResponse.json(
        { error: 'Ошибка отправки в Telegram' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}