import { telegramService } from "@/services/telegram.service";
import { useMutation } from "@tanstack/react-query";

export function useBookCar() {
  return useMutation({
    mutationKey: ["book car"],
    mutationFn: async (text: string) => {
      const escapeMarkdown = (text: string): string => {
        return text.replace(/([_[\]()~`>#+=|{}.!-])/g, "\\$1");
      };

      const res = await telegramService.bookCar(escapeMarkdown(text));
      if (res.status !== 200) throw new Error(res.data);
    },
  });
}
