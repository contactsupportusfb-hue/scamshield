-- Run in Supabase: SQL Editor > New query > paste > Run
-- Safe to run more than once: it creates what is missing and updates the rest.

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

-- Phase 2: who sent it (from their Google sign-in), when it happened, and where.
alter table public.reports add column if not exists reporter_id uuid references auth.users(id) on delete set null;
alter table public.reports add column if not exists reporter_avatar text check (char_length(reporter_avatar) <= 500);
alter table public.reports add column if not exists started_at timestamptz;
alter table public.reports add column if not exists ended_at timestamptz;
alter table public.reports add column if not exists latitude double precision check (latitude between -90 and 90);
alter table public.reports add column if not exists longitude double precision check (longitude between -180 and 180);
alter table public.messages add column if not exists sender_id uuid references auth.users(id) on delete set null;
alter table public.messages add column if not exists sender_avatar text check (char_length(sender_avatar) <= 500);

alter table public.reports drop constraint if exists reports_time_order;
alter table public.reports add constraint reports_time_order check (ended_at is null or started_at is null or ended_at >= started_at);

-- The sender's identity is taken from their sign-in token, never from what the browser sends.
create or replace function public.stamp_report_sender() returns trigger language plpgsql set search_path = '' as $$
begin
  new.reporter_id := auth.uid();
  new.reporter_email := auth.jwt()->>'email';
  new.reporter_name := left(coalesce(auth.jwt()->'user_metadata'->>'full_name', auth.jwt()->'user_metadata'->>'name', new.reporter_name), 120);
  new.reporter_avatar := auth.jwt()->'user_metadata'->>'avatar_url';
  return new;
end $$;

create or replace function public.stamp_message_sender() returns trigger language plpgsql set search_path = '' as $$
begin
  new.sender_id := auth.uid();
  new.sender_email := auth.jwt()->>'email';
  new.sender_avatar := auth.jwt()->'user_metadata'->>'avatar_url';
  return new;
end $$;

drop trigger if exists stamp_report_sender on public.reports;
create trigger stamp_report_sender before insert on public.reports for each row execute function public.stamp_report_sender();
drop trigger if exists stamp_message_sender on public.messages;
create trigger stamp_message_sender before insert on public.messages for each row execute function public.stamp_message_sender();

-- Staff list. Add people with the insert at the bottom of this file.
create table if not exists public.staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table public.staff enable row level security;

create or replace function public.is_staff() returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.staff where user_id = auth.uid())
$$;
revoke execute on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

alter table public.reports enable row level security;
alter table public.messages enable row level security;

-- Visitors must be signed in to send anything. Only staff can read.
drop policy if exists "anon can insert reports" on public.reports;
drop policy if exists "anon can insert messages" on public.messages;
drop policy if exists "signed-in users can insert reports" on public.reports;
drop policy if exists "signed-in users can insert messages" on public.messages;
drop policy if exists "staff can read reports" on public.reports;
drop policy if exists "staff can read messages" on public.messages;

create policy "signed-in users can insert reports" on public.reports for insert to authenticated with check (reporter_id = auth.uid());
create policy "signed-in users can insert messages" on public.messages for insert to authenticated with check (sender_id = auth.uid());
-- To require two-step verification for staff later, add: and (auth.jwt()->>'aal') = 'aal2'
create policy "staff can read reports" on public.reports for select to authenticated using (public.is_staff());
create policy "staff can read messages" on public.messages for select to authenticated using (public.is_staff());

-- Phase 2b: staff can set a status on each report/message and delete them.
alter table public.reports add column if not exists status text not null default 'new' check (status in ('new','fulfilled','drill','false_alarm'));
alter table public.messages add column if not exists status text not null default 'new' check (status in ('new','fulfilled','drill','false_alarm'));

drop policy if exists "staff can update reports" on public.reports;
drop policy if exists "staff can update messages" on public.messages;
drop policy if exists "staff can delete reports" on public.reports;
drop policy if exists "staff can delete messages" on public.messages;

create policy "staff can update reports" on public.reports for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "staff can update messages" on public.messages for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "staff can delete reports" on public.reports for delete to authenticated using (public.is_staff());
create policy "staff can delete messages" on public.messages for delete to authenticated using (public.is_staff());

-- Make someone staff (run separately, with their sign-in email):
-- insert into public.staff (user_id) select id from auth.users where email = 'admin-email@example.com' on conflict do nothing;
