create policy "Anyone can view leaderboard profiles"
on profiles for select
using (true);

create policy "Anyone can view university ratings"
on monthly_ratings for select
using (true);