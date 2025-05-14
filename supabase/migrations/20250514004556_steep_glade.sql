/*
  # Initial Schema Setup for Maya Payment Gateway

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text, either 'hot' or 'cold')
      - `address` (text, unique)
      - `balance` (numeric)
      - `currency` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `from_wallet_id` (uuid, references wallets)
      - `to_wallet_id` (uuid, references wallets)
      - `amount` (numeric)
      - `currency` (text)
      - `status` (text)
      - `fee` (numeric)
      - `hash` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallets table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('hot', 'cold')),
  address text UNIQUE NOT NULL,
  balance numeric DEFAULT 0 NOT NULL CHECK (balance >= 0),
  currency text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_wallet_id uuid REFERENCES wallets ON DELETE RESTRICT NOT NULL,
  to_wallet_id uuid REFERENCES wallets ON DELETE RESTRICT NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  currency text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  fee numeric NOT NULL DEFAULT 0 CHECK (fee >= 0),
  hash text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Wallets policies
CREATE POLICY "Users can read own wallets"
  ON wallets
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create wallets"
  ON wallets
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Transactions policies
CREATE POLICY "Users can read transactions involving their wallets"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM wallets
      WHERE (wallets.id = transactions.from_wallet_id OR wallets.id = transactions.to_wallet_id)
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transactions from their wallets"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM wallets
      WHERE wallets.id = transactions.from_wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, username)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();