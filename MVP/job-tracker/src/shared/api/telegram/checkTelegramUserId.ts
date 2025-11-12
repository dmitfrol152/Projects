import { getTelegramUserIdDB } from "@shared/api/supabase/telegram/getTelegramUserIdDB";

export async function checkTelegramUserId(userId: string) {
  try {
    const telegramUserId = await getTelegramUserIdDB(userId);

    if (!telegramUserId) {
      throw new Error("Error: user ID not found");
    }

    return telegramUserId;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
