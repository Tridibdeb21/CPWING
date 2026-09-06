create table contest_registrations (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references contests(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  registered_at timestamptz not null default now(),
  attended boolean not null default false,
  unique(contest_id, user_id)
);

alter table contest_registrations enable row level security;

create policy "Students can view their registrations"
on contest_registrations for select
using (auth.uid() = user_id);

create policy "Students can register themselves"
on contest_registrations for insert
with check (auth.uid() = user_id);

create policy "Students can cancel their registrations"
on contest_registrations for delete
using (auth.uid() = user_id);

create policy "Admins can manage registrations"
on contest_registrations for all
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));