import { supabase } from "./supabaseClient.js";
import { requireAuthOrRedirect, signOut } from "./authGuard.js";

const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const statusEl = document.getElementById("status");
const msgEl = document.getElementById("msg");
const listEl = document.getElementById("list");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");

async function loadNotices() {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("id", { ascending: false });

  listEl.innerHTML = "";

  if (error) {
    msgEl.textContent = error.message;
    return;
  }

  data.forEach(n => {
    const li = document.createElement("li");
    li.textContent = `[${n.status}] ${n.title}`;
    listEl.appendChild(li);
  });
}

saveBtn.addEventListener("click", async () => {
  const title = titleEl.value.trim();
  const content = contentEl.value.trim();

  if (!title || !content) {
    msgEl.textContent = "제목과 내용을 입력하세요";
    return;
  }

  const { error } = await supabase.from("notices").insert({
    title,
    content,
    status: statusEl.value
  });

  if (error) {
    msgEl.textContent = error.message;
    return;
  }

  msgEl.textContent = "저장 완료";
  titleEl.value = "";
  contentEl.value = "";
  loadNotices();
});

logoutBtn.addEventListener("click", signOut);

async function start() {
  await requireAuthOrRedirect();
  loadNotices();
}

start();
