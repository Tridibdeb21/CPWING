alter table profiles
  add column if not exists codeforces_verified boolean not null default false;

update profiles
set codeforces_verified = false
where codeforces_verified is null;

alter table profiles
  alter column codeforces_verified set default false;

create table if not exists public.codeforces_verifications (
  user_id uuid primary key references auth.users(id) on delete cascade,
  codeforces_handle text not null,
  verified_at timestamptz not null default now()
);

alter table public.codeforces_verifications enable row level security;

drop policy if exists "Users can view their Codeforces verification" on public.codeforces_verifications;
create policy "Users can view their Codeforces verification"
on public.codeforces_verifications for select to authenticated
using (auth.uid() = user_id);

create unique index if not exists codeforces_verifications_handle_unique
on public.codeforces_verifications (lower(btrim(codeforces_handle)));

create unique index if not exists profiles_codeforces_handle_unique
on public.profiles (lower(btrim(codeforces_handle)))
where codeforces_handle is not null and btrim(codeforces_handle) <> '';

create unique index if not exists profiles_student_id_unique
on public.profiles (lower(btrim(student_id)))
where student_id is not null and btrim(student_id) <> '';

create or replace function public.complete_codeforces_verification(
  p_full_name text,
  p_student_id text,
  p_department text,
  p_batch text,
  p_codeforces_handle text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication is required';
  end if;

  if exists (
    select 1
    from public.codeforces_verifications
    where lower(btrim(codeforces_handle)) = lower(btrim(p_codeforces_handle))
      and user_id <> auth.uid()
  ) then
    raise exception 'This Codeforces handle is already linked to another CPWING account';
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(btrim(student_id)) = lower(btrim(p_student_id))
      and id <> auth.uid()
  ) then
    raise exception 'This student ID is already linked to another CPWING account';
  end if;

  insert into public.codeforces_verifications (user_id, codeforces_handle)
  values (auth.uid(), p_codeforces_handle)
  on conflict (user_id) do update set
    codeforces_handle = excluded.codeforces_handle,
    verified_at = now();

  insert into public.profiles (id, full_name, student_id, department, batch, codeforces_handle, codeforces_verified, updated_at)
  values (auth.uid(), p_full_name, p_student_id, p_department, p_batch, p_codeforces_handle, true, now())
  on conflict (id) do update set
    full_name = excluded.full_name,
    student_id = excluded.student_id,
    department = excluded.department,
    batch = excluded.batch,
    codeforces_handle = excluded.codeforces_handle,
    codeforces_verified = true,
    updated_at = now();
end;
$$;

revoke all on function public.complete_codeforces_verification(text, text, text, text, text) from public;
revoke all on function public.complete_codeforces_verification(text, text, text, text, text) from authenticated;
grant execute on function public.complete_codeforces_verification(text, text, text, text, text) to service_role;

create or replace function public.complete_verified_codeforces(
  p_user_id uuid,
  p_full_name text,
  p_student_id text,
  p_department text,
  p_batch text,
  p_codeforces_handle text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_user_id is null then
    raise exception 'Authenticated user is required';
  end if;

  if exists (
    select 1
    from public.codeforces_verifications
    where lower(btrim(codeforces_handle)) = lower(btrim(p_codeforces_handle))
      and user_id <> p_user_id
  ) then
    raise exception 'This Codeforces handle is already linked to another CPWING account';
  end if;

  if exists (
    select 1
    from public.profiles
    where lower(btrim(student_id)) = lower(btrim(p_student_id))
      and id <> p_user_id
  ) then
    raise exception 'This student ID is already linked to another CPWING account';
  end if;

  insert into public.codeforces_verifications (user_id, codeforces_handle)
  values (p_user_id, p_codeforces_handle)
  on conflict (user_id) do update set
    codeforces_handle = excluded.codeforces_handle,
    verified_at = now();

  insert into public.profiles (id, full_name, student_id, department, batch, codeforces_handle, codeforces_verified, updated_at)
  values (p_user_id, p_full_name, p_student_id, p_department, p_batch, p_codeforces_handle, true, now())
  on conflict (id) do update set
    full_name = excluded.full_name,
    student_id = excluded.student_id,
    department = excluded.department,
    batch = excluded.batch,
    codeforces_handle = excluded.codeforces_handle,
    codeforces_verified = true,
    updated_at = now();
end;
$$;

revoke all on function public.complete_verified_codeforces(uuid, text, text, text, text, text) from public;
revoke all on function public.complete_verified_codeforces(uuid, text, text, text, text, text) from authenticated;
grant execute on function public.complete_verified_codeforces(uuid, text, text, text, text, text) to service_role;
