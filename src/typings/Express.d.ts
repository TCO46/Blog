import { UserTyping } from "./User";

declare global {
	namespace Express {
		interface Request {
			user: UserTyping | null;
			id: UserTyping | null;
		}
	}
}
