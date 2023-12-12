import { UserTyping } from "../../typings/User";

declare global {
	namespace Express {
		interface Request {
			user: UserTyping | null;
			id: UserTyping | null;
		}
	}
}
