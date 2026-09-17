-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Orders
CREATE TABLE public.ticket_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  match_id text NOT NULL,
  match_label text NOT NULL,
  match_date text NOT NULL,
  venue text NOT NULL,
  total_rwf integer NOT NULL,
  payment_method text NOT NULL,
  status text NOT NULL DEFAULT 'paid',
  spin_used boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.ticket_orders TO authenticated;
GRANT ALL ON public.ticket_orders TO service_role;
ALTER TABLE public.ticket_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.ticket_orders FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own orders" ON public.ticket_orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own orders" ON public.ticket_orders FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- Tickets
CREATE TABLE public.tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.ticket_orders(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  match_id text NOT NULL,
  match_label text NOT NULL,
  match_date text NOT NULL,
  venue text NOT NULL,
  sector_id text NOT NULL,
  sector_name text NOT NULL,
  seat_label text NOT NULL,
  price_rwf integer NOT NULL,
  holder_name text NOT NULL,
  holder_email text NOT NULL,
  reference text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own tickets" ON public.tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own tickets" ON public.tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own tickets" ON public.tickets FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE INDEX tickets_user_idx ON public.tickets (user_id, created_at DESC);
CREATE UNIQUE INDEX tickets_seat_unique ON public.tickets (match_id, sector_id, seat_label);

-- Rewards (spin wheel vouchers)
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  order_id uuid REFERENCES public.ticket_orders(id) ON DELETE SET NULL,
  prize text NOT NULL,
  code text NOT NULL,
  status text NOT NULL DEFAULT 'unclaimed',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.rewards TO authenticated;
GRANT ALL ON public.rewards TO service_role;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own rewards" ON public.rewards FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own rewards" ON public.rewards FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own rewards" ON public.rewards FOR UPDATE TO authenticated USING (auth.uid() = user_id);