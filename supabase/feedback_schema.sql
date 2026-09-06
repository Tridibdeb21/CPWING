create table feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  category text not null default 'General' check (category in ('General', 'Contest', 'Learning', 'Technical')),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table feedback enable row level security;

create policy "Students can submit feedback"
on feedback for insert to authenticated
with check (auth.uid() = user_id);

create policy "Students can view their feedback"
on feedback for select
using (auth.uid() = user_id);

create policy "Admins can view feedback"
on feedback for select
using (exists (select 1 from admin_users where user_id = auth.uid()));