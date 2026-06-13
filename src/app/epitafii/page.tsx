import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { EpitaphsPageContent } from '@/components/epitafii/EpitaphsPageContent'

export const metadata = {
  title: "\u0415\u043f\u0456\u0442\u0430\u0444\u0456\u0457 \u043d\u0430 \u043f\u0430\u043c'\u044f\u0442\u043d\u0438\u043a \u2014 \u0420\u0438\u0442\u0443\u0430\u043b",
  description: "\u0413\u043e\u0442\u043e\u0432\u0456 \u043d\u0430\u043f\u0438\u0441\u0438 \u0442\u0430 \u0435\u043f\u0456\u0442\u0430\u0444\u0456\u0457 \u0434\u043b\u044f \u0433\u0440\u0430\u0432\u0456\u044e\u0432\u0430\u043d\u043d\u044f \u043d\u0430 \u043f\u0430\u043c'\u044f\u0442\u043d\u0438\u043a\u0443.",
}

export default function EpitaphsPage() {
  return (
    <>
      <Header />
      <main>
        <EpitaphsPageContent />
      </main>
      <Footer />
    </>
  )
}
