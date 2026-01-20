import { supabase } from "./supabaseClient.js";

export async function requireAuthOrRedirect() {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    window.location.href = "./login.html";
  }
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "./login.html";
}
