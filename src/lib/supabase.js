import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트
 * -----------------------------------------------------------
 * anon(publishable) key는 브라우저에 노출돼도 안전한 키입니다.
 * 실제 보안은 DB의 Row Level Security(RLS) 정책이 담당합니다.
 */
const SUPABASE_URL = 'https://fiqxrfarsqkpbggayiuq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Lle8KU2FfIL6VH_9BasO8g_QlOz8GmB';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
