import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetTelegramUserId(uniqueToken?: string) {
	return useQuery({
		queryKey: ["telegramUserId", uniqueToken],
		queryFn: () =>
			axios
				.get(`https://api.telegram.org/bot${uniqueToken}/getUpdates`)
				.then((res) => res.data),
	});
}
