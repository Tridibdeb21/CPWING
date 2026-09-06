create table admin_messages (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid references profiles(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table admin_messages enable row level security;

create policy "Students can read their messages"
on admin_messages for select
using (recipient_id is null or auth.uid() = recipient_id);

create policy "Admins can send messages"
on admin_messages for insert
with check (exists (select 1 from admin_users where user_id = auth.uid()) and created_by = auth.uid());

create policy "Admins can view sent messages"
on admin_messages for select
using (exists (select 1 from admin_users where user_id = auth.uid()));