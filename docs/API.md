# API Reference

This document describes how to interact with the Supabase backend.

## Authentication

All authentication is handled by Supabase Auth. Use the `@supabase/supabase-js` client.

### Sign Up

```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      username: 'johndoe'
    }
  }
})
```

### Sign In

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})
```

### Sign Out

```typescript
const { error } = await supabase.auth.signOut()
```

### Get Current User

```typescript
const { data: { user } } = await supabase.auth.getUser()
```

## Profiles

### Create Profile

```typescript
const { data, error } = await supabase
  .from('profiles')
  .insert({
    id: userId, // Must match auth.users.id
    username: 'johndoe',
    display_name: 'John Doe',
    bio: 'Welcome to my page!'
  })
  .select()
  .single()
```

### Get Profile by ID

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

### Get Profile by Username

```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('username', 'johndoe')
  .eq('is_active', true)
  .single()
```

### Update Profile

```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({
    display_name: 'John Smith',
    bio: 'Updated bio'
  })
  .eq('id', userId)
  .select()
  .single()
```

### Check Username Availability

```typescript
const { data, error } = await supabase
  .rpc('is_username_available', { username_param: 'johndoe' })
```

## Links

### Get All Links for a Profile

```typescript
const { data, error } = await supabase
  .from('links')
  .select('*')
  .eq('profile_id', profileId)
  .eq('is_active', true)
  .order('position', { ascending: true })
```

### Create Link

```typescript
const { data, error } = await supabase
  .from('links')
  .insert({
    profile_id: profileId,
    title: 'My Website',
    url: 'https://example.com',
    icon: '🌐',
    position: 0
  })
  .select()
  .single()
```

### Update Link

```typescript
const { data, error } = await supabase
  .from('links')
  .update({
    title: 'Updated Title',
    url: 'https://newurl.com'
  })
  .eq('id', linkId)
  .select()
  .single()
```

### Delete Link

```typescript
const { error } = await supabase
  .from('links')
  .delete()
  .eq('id', linkId)
```

### Reorder Links

```typescript
// Update each link's position
for (const [index, link] of links.entries()) {
  await supabase
    .from('links')
    .update({ position: index })
    .eq('id', link.id)
}
```

## Themes

### Get All Themes

```typescript
const { data, error } = await supabase
  .from('themes')
  .select('*')
  .order('is_premium', { ascending: true })
```

### Get Theme by ID

```typescript
const { data, error } = await supabase
  .from('themes')
  .select('*')
  .eq('id', themeId)
  .single()
```

## Analytics

### Track Page View

```typescript
const { error } = await supabase
  .from('analytics')
  .insert({
    profile_id: profileId,
    event_type: 'view',
    user_agent: navigator.userAgent
  })
```

### Track Link Click

```typescript
const { error } = await supabase
  .from('analytics')
  .insert({
    profile_id: profileId,
    link_id: linkId,
    event_type: 'click',
    user_agent: navigator.userAgent
  })
```

### Get Analytics Summary

```typescript
const { data, error } = await supabase
  .rpc('get_analytics_summary', {
    profile_id_param: profileId,
    days_param: 30
  })

// Returns:
// {
//   total_views: number,
//   total_clicks: number,
//   views_today: number,
//   clicks_today: number
// }
```

### Get Link Click Stats

```typescript
const { data, error } = await supabase
  .rpc('get_link_clicks', {
    profile_id_param: profileId,
    days_param: 30
  })

// Returns array:
// [
//   {
//     link_id: string,
//     link_title: string,
//     link_url: string,
//     clicks: number
//   }
// ]
```

## Storage

### Upload Avatar

```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file, {
    cacheControl: '3600',
    upsert: true
  })

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`)

// Update profile with avatar URL
await supabase
  .from('profiles')
  .update({ avatar_url: publicUrl })
  .eq('id', userId)
```

### Delete Avatar

```typescript
const { error } = await supabase.storage
  .from('avatars')
  .remove([`${userId}/avatar.png`])
```

## Real-time Subscriptions

### Subscribe to Link Changes

```typescript
const channel = supabase
  .channel('links-changes')
  .on(
    'postgres_changes',
    {
      event: '*', // 'INSERT' | 'UPDATE' | 'DELETE' | '*'
      schema: 'public',
      table: 'links',
      filter: `profile_id=eq.${profileId}`
    },
    (payload) => {
      console.log('Link changed:', payload)
    }
  )
  .subscribe()

// Cleanup
supabase.removeChannel(channel)
```

## Error Handling

All Supabase queries return an object with `data` and `error`:

```typescript
const { data, error } = await supabase.from('profiles').select()

if (error) {
  console.error('Error:', error.message)
  // Handle error
} else {
  console.log('Data:', data)
  // Use data
}
```

Common error codes:
- `PGRST116`: No rows returned
- `23505`: Unique constraint violation (duplicate username)
- `23503`: Foreign key violation
- `42501`: Insufficient privileges (RLS policy)

## Rate Limiting

Supabase has built-in rate limiting. For production:
- Consider implementing client-side debouncing
- Cache frequently accessed data
- Use real-time subscriptions instead of polling

## Best Practices

1. **Always handle errors** - Check `error` before using `data`
2. **Use TypeScript types** - Import from `@/types/database`
3. **Implement loading states** - Show loaders during async operations
4. **Cache data** - Use React Query or SWR for caching
5. **Optimize queries** - Only select fields you need
6. **Use RLS policies** - Never trust client-side checks alone
7. **Validate input** - Always validate before sending to database
