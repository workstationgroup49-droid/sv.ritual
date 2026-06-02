import { Order } from '@/types/order'
import { formatPrice } from '@/lib/utils'

export function buildTelegramMessage(order: Order): string {
  const itemsList = order.items
    .map(item =>
      `  • ${item.name} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    )
    .join('\n')

  return [
    '🕯 *Нове замовлення*',
    '',
    '👤 *Клієнт:*',
    `  Ім\'я: ${order.customer.name}`,
    `  Телефон: ${order.customer.phone}`,
    `  Адреса: ${order.customer.address}`,
    order.customer.comment ? `  Коментар: ${order.customer.comment}` : '',
    '',
    '🛒 *Склад замовлення:*',
    itemsList,
    '',
    `💰 *Разом: ${formatPrice(order.total)}*`,
  ]
    .filter(line => line !== null)
    .join('\n')
}

export async function sendOrderToTelegram(order: Order): Promise<boolean> {
  const token    = process.env.TELEGRAM_BOT_TOKEN
  const chatId   = process.env.TELEGRAM_GROUP_CHAT_ID
  const threadId = process.env.TELEGRAM_ORDERS_THREAD_ID

  if (!token || !chatId) {
    console.error('Telegram credentials not configured')
    return false
  }

  const text = buildTelegramMessage(order)

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:           chatId,
        message_thread_id: Number(threadId),
        text,
        parse_mode:        'Markdown',
      }),
    }
  )

  return res.ok
}
