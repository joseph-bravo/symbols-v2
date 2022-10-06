import type { TwitterMetadata } from '$lib/interfaces';
import type { User } from '@supabase/supabase-js';
import type { SupabaseSession } from '@supabase/auth-helpers-sveltekit';

type SupabaseSessionWithoutUser = Omit<SupabaseSession, 'user'>;
type UserWithTwitterMetadata = Omit<User, 'user_metadata'> & { user_metadata: TwitterMetadata };
export type SupabaseSessionWithUser = SupabaseSessionWithoutUser & {
	user?: UserWithTwitterMetadata;
};
