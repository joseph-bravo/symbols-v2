declare namespace App {
	interface Locals {
		session: import('$lib/interfaces').SupabaseSessionWithUser;
	}
	interface PageData {
		session: import('$lib/interfaces').SupabaseSessionWithUser;
	}
	// interface Error {}
	// interface Platform {}
}
