import { getTelegramUserIdDB } from "@/supabase/utils/getTelegramUserIdDB";

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
