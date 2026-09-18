alter table public.contests
  add column if not exists duration_minutes integer not null default 120 check (duration_minutes > 0),
  add column if not exists capacity integer check (capacity is null or capacity > 0),
  add column if not exists rules text,
  add column if not exists cancelled_at timestamptz;

alter table public.contests drop constraint if exists contests_status_check;
alter table public.contests add constraint contests_status_check check (status in ('draft', 'published', 'cancelled'));

drop policy if exists "Admins can update contests" on public.contests;
create policy "Admins can update contests"
on public.contests for update to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()))
with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can delete contests" on public.contests;
create policy "Admins can delete contests"
on public.contests for delete to authenticated
using (exists (select 1 from public.admin_users where user_id = auth.uid()));

create index if not exists contests_status_date_idx on public.contests(status, contest_date);

create or replace view public.contest_registration_counts as
select contest_id, count(*)::integer as registration_count
from public.contest_registrations
group by contest_id;

grant select on public.contest_registration_counts to anon, authenticated;
