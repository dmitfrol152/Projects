export async function checkTelegramBotToken() {
  try {
    const token = import.meta.env.VITE_BOT_TOKEN;

    if (!token) {
      throw new Error("Error: telegram token not found");
    }

    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
