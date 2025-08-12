"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateAIResponse(
  messages: { role: "user" | "assistant"; content: string }[],
  userMessage: string,
) {
  try {
    const prompt =
      messages.map((msg) => `${msg.role === "user" ? "Kullanıcı" : "Asistan"}: ${msg.content}`).join("\n") +
      `\nKullanıcı: ${userMessage}\nAsistan:`

    // AI'dan yanıt al
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "Sen AGaranti'nin yapay zeka destekli yardımcısısın. Kullanıcılara elektronik ürünler, garanti süreçleri ve teknik sorunlar hakkında yardımcı oluyorsun. Yanıtların kısa, net ve yardımcı olmalı. Thomson Smart TV, garanti işlemleri, teknik destek ve ödeme konularında bilgilisin.",
    })

    return { success: true, text }
  } catch (error) {
    console.error("AI yanıt hatası:", error)
    return {
      success: false,
      text: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin veya teknik destek ekibimizle iletişime geçin.",
    }
  }
}
