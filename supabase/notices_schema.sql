create table notices (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  message text not null check (char_length(message) between 1 and 500),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table notices enable row level security;

create policy "Anyone can view active notices"
on notices for select
using (active = true);

create policy "Admins can manage notices"
on notices for all
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()) and created_by = auth.uid());