import { checkTelegramBotToken } from "@/shared/lib/telegram/checkTelegramBotToken";
import { checkTelegramUserId } from "@shared/api/telegram/checkTelegramUserId";

export async function fetchTelegramApi(userId: string, message: string) {
  try {
    const token = await checkTelegramBotToken();
    if (!token) return;
    const telegramUserId = await checkTelegramUserId(userId);
    if (!telegramUserId) return;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramUserId,
          text: message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error: response status is not OK");
    }

    const data = await response.json();

    if (!data) {
      throw new Error("Error: failed to parse data");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
