-- Run in Supabase: SQL Editor > New query > paste > Run
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  category text not null check (char_length(category) <= 40),
  urgency text not null check (urgency in ('LOW','MEDIUM','HIGH','CRITICAL')),
  reporter_name text check (char_length(reporter_name) <= 120),
  reporter_email text check (char_length(reporter_email) <= 200),
  location text check (char_length(location) <= 200),
  description text not null check (char_length(description) between 20 and 5000),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  sender_name text not null check (char_length(sender_name) between 2 and 200),
  sender_email text not null check (char_length(sender_email) <= 200),
  subject text not null check (char_length(subject) between 3 and 200),
  body text not null check (char_length(body) between 10 and 4000),
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;
alter table public.messages enable row level security;

-- Public visitors may INSERT only. Nobody can read with the anon key.
create policy "anon can insert reports" on public.reports for insert to anon with check (true);
create policy "anon can insert messages" on public.messages for insert to anon with check (true);

-- Staff sign-in (invite only). A signed-in user counts as staff only if listed here.
create table if not exists public.staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.staff enable row level security;

-- Staff can see their own row, and only after two-step verification (aal2).
create policy "staff read own row after 2fa" on public.staff for select to authenticated
  using (user_id = auth.uid() and (auth.jwt() ->> 'aal') = 'aal2');

-- To give someone access: invite them first (Authentication > Users > Invite user), then run:
-- insert into public.staff (user_id) select id from auth.users where email = 'person@example.org';

-- Staff dashboard: listed staff who passed two-step verification can read everything.
create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce(auth.jwt() ->> 'aal', '') = 'aal2'
     and exists (select 1 from public.staff where user_id = auth.uid());
$$;
revoke execute on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

drop policy if exists "staff read reports" on public.reports;
create policy "staff read reports" on public.reports for select to authenticated using (public.is_staff());
drop policy if exists "staff read messages" on public.messages;
create policy "staff read messages" on public.messages for select to authenticated using (public.is_staff());
drop policy if exists "staff read staff list" on public.staff;
create policy "staff read staff list" on public.staff for select to authenticated using (public.is_staff());

-- Staff emails for the dashboard (auth.users is not readable directly).
create or replace function public.staff_directory() returns table (email text, added_at timestamptz)
language sql stable security definer set search_path = '' as $$
  select u.email::text, s.created_at from public.staff s join auth.users u on u.id = s.user_id
  where public.is_staff() order by s.created_at;
$$;
revoke execute on function public.staff_directory() from public, anon;
grant execute on function public.staff_directory() to authenticated;
