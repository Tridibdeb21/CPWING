create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table admin_users enable row level security;

create policy "Admins can view their admin record"
on admin_users for select
using (auth.uid() = user_id);

create policy "Admins can manage contests"
on contests for all
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Admins can manage contest results"
on contest_results for all
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Admins can manage monthly ratings"
on monthly_ratings for all
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Admins can view student profiles"
on profiles for select
using (exists (select 1 from admin_users where user_id = auth.uid()));