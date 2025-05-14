-- Insert demo user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'demo@example.com'
  ) THEN
    -- Insert demo user into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change,
      email_change_token_current,
      phone,
      phone_confirmed_at,
      phone_change,
      phone_change_token,
      confirmed_at,
      confirmation_sent_at,
      recovery_sent_at,
      email_change_sent_at,
      phone_change_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      created_at,
      updated_at,
      phone_change_sent_at,
      phone_change_token,
      phone_change,
      phone_confirmed_at,
      phone,
      email_change_token_current,
      email_change,
      email_change_token_new,
      recovery_token,
      confirmation_token,
      email_confirmed_at,
      encrypted_password,
      email,
      role,
      aud,
      id,
      instance_id
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'demo@example.com',
      crypt('demo123456', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '',
      '',
      '',
      '',
      '',
      NULL,
      NULL,
      '',
      '',
      NOW(),
      NOW(),
      NOW(),
      NOW(),
      NOW(),
      NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      false,
      NOW(),
      NOW(),
      NOW(),
      '',
      '',
      NULL,
      NULL,
      '',
      '',
      '',
      '',
      '',
      NOW(),
      crypt('demo123456', gen_salt('bf')),
      'demo@example.com',
      'authenticated',
      'authenticated',
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000'
    );

    -- Profile will be created automatically via trigger
  END IF;
END $$;

-- Insert demo wallets
INSERT INTO wallets (user_id, type, address, balance, currency, is_active)
SELECT 
  p.id,
  'hot',
  '0x' || encode(gen_random_bytes(20), 'hex'),
  CASE currency
    WHEN 'BTC' THEN 2.5
    WHEN 'ETH' THEN 15.0
    WHEN 'USDT' THEN 10000.0
  END,
  currency,
  true
FROM profiles p
CROSS JOIN (
  VALUES ('BTC'), ('ETH'), ('USDT')
) AS currencies(currency)
WHERE p.username = 'demo@example.com'
ON CONFLICT DO NOTHING;