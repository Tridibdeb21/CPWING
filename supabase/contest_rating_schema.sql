create table contests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contest_date timestamptz not null,
  month date not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create table contest_results (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references contests(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  rank integer not null check (rank > 0),
  solved_count integer not null default 0 check (solved_count >= 0),
  penalty integer not null default 0 check (penalty >= 0),
  old_rating integer not null,
  rating_change integer not null,
  new_rating integer not null check (new_rating >= 0),
  created_at timestamptz not null default now(),
  unique(contest_id, user_id)
);

alter table contests enable row level security;
alter table contest_results enable row level security;

create policy "Students can view published contests"
on contests for select
using (status = 'published');

create policy "Students can view their contest results"
on contest_results for select
using (auth.uid() = user_id);