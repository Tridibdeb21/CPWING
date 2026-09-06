-- Remove any broad write policies before installing explicit admin-only rules.
drop policy if exists "Admins can manage monthly ratings" on monthly_ratings;
drop policy if exists "Students can insert monthly ratings" on monthly_ratings;
drop policy if exists "Students can update monthly ratings" on monthly_ratings;
drop policy if exists "Students can delete monthly ratings" on monthly_ratings;

create policy "Only admins can insert monthly ratings"
on monthly_ratings for insert to authenticated
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Only admins can update monthly ratings"
on monthly_ratings for update to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Only admins can delete monthly ratings"
on monthly_ratings for delete to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()));

drop policy if exists "Admins can manage contest results" on contest_results;
drop policy if exists "Students can insert contest results" on contest_results;
drop policy if exists "Students can update contest results" on contest_results;
drop policy if exists "Students can delete contest results" on contest_results;

create policy "Only admins can insert contest results"
on contest_results for insert to authenticated
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Only admins can update contest results"
on contest_results for update to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()))
with check (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "Only admins can delete contest results"
on contest_results for delete to authenticated
using (exists (select 1 from admin_users where user_id = auth.uid()));