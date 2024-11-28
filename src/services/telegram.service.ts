import axios from "axios";

export const telegramService = {
  async bookCar(text: string) {
    return await axios.post(
      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        text,
        parse_mode: "MarkdownV2",
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
