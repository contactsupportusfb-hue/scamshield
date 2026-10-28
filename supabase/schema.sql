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

-- Spam guard: runs on every insert, even ones sent straight to the API.
create or replace function public.guard_spam() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  txt text := coalesce(to_jsonb(new) ->> tg_argv[0], '');
  recent int;
  dupes int;
begin
  execute format('select count(*) from public.%I where created_at > now() - interval ''10 minutes''', tg_table_name) into recent;
  if recent >= 20 then
    raise exception 'We are receiving a lot of submissions right now. Please try again in a few minutes.';
  end if;
  execute format('select count(*) from public.%I where %I = $1 and created_at > now() - interval ''1 day''', tg_table_name, tg_argv[0]) into dupes using txt;
  if dupes > 0 then
    raise exception 'This was already submitted.';
  end if;
  if (select count(*) from regexp_matches(txt, 'https?://|www\.', 'gi')) > 2 then
    raise exception 'Too many links. Please remove some and try again.';
  end if;
  return new;
end;
$$;
revoke execute on function public.guard_spam() from public, anon, authenticated;

drop trigger if exists guard_spam on public.reports;
create trigger guard_spam before insert on public.reports for each row execute function public.guard_spam('description');
drop trigger if exists guard_spam on public.messages;
create trigger guard_spam before insert on public.messages for each row execute function public.guard_spam('body');

-- Job applications from the Careers page.
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  ref text not null unique,
  job_id text not null check (char_length(job_id) <= 20),
  job_title text not null check (char_length(job_title) <= 200),
  track text not null check (char_length(track) <= 60),
  applicant_name text not null check (char_length(applicant_name) between 2 and 120),
  applicant_email text not null check (char_length(applicant_email) <= 200),
  message text not null check (char_length(message) between 20 and 2000),
  created_at timestamptz not null default now()
);
alter table public.applications enable row level security;

drop policy if exists "anon can insert applications" on public.applications;
create policy "anon can insert applications" on public.applications for insert to anon with check (true);
drop policy if exists "staff read applications" on public.applications;
create policy "staff read applications" on public.applications for select to authenticated using (public.is_staff());

drop trigger if exists guard_spam on public.applications;
create trigger guard_spam before insert on public.applications for each row execute function public.guard_spam('message');
