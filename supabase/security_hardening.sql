drop policy if exists "Anyone can view leaderboard profiles" on profiles;
drop policy if exists "Anyone can view university ratings" on monthly_ratings;

create or replace view public.public_leaderboard_profiles as
select id, full_name, student_id, department, batch, codeforces_handle
from public.profiles;

create or replace view public.public_university_ratings as
select user_id, month, rating, rating_change, contest_count, platform
from public.monthly_ratings
where platform = 'University Contest';

grant select on public.public_leaderboard_profiles to anon, authenticated;
grant select on public.public_university_ratings to anon, authenticated;
revoke all on public.profiles from anon;
revoke all on public.monthly_ratings from anon;

drop policy if exists "Students can register themselves" on contest_registrations;
create policy "Students can register for future published contests"
on contest_registrations for insert to authenticated
with check (
	auth.uid() = user_id
	and exists (
		select 1
		from contests
		where contests.id = contest_registrations.contest_id
			and contests.status = 'published'
			and contests.contest_date > now()
	)
);

alter table profiles drop constraint if exists profiles_codeforces_handle_required;

alter table profiles
	add constraint profiles_codeforces_handle_required
	check (codeforces_handle is not null and btrim(codeforces_handle) <> '')
	not valid;