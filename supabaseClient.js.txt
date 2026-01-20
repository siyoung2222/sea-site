import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const SUPABASE_URL = "https://oviegjnxvhzfynmjswdo.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_YB8bock9XjeIQz9zRxc4YQ_4K2NBgJ-";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
