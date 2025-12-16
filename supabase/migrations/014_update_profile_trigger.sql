-- Update the function to include phone and business_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, phone, business_type)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'username', 'User'),
        NEW.raw_user_meta_data->>'phone',
        NEW.raw_user_meta_data->>'business_type'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
