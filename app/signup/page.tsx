'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cabinetName, setCabinetName] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async () => {
    const { data: { user }, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message)
      return;
    }

    if (user) {
      const { data: cabinet, error: cabinetError } = await supabase
        .from('cabinets')
        .insert([{ name: cabinetName }])
        .select()
        .single();

      if (cabinetError) {
        alert(cabinetError.message);
        // Optional: delete the user if cabinet creation fails
        // await supabase.auth.api.deleteUser(user.id);
        return;
      }

      if (cabinet) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, cabinet_id: cabinet.id }]);

        if (profileError) {
          alert(profileError.message);
          // Optional: clean up created user and cabinet
          return;
        }

        router.push('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account and your cabinet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="cabinet-name">Cabinet Name</Label>
              <Input id="cabinet-name" placeholder="My Awesome Cabinet" required value={cabinetName} onChange={(e) => setCabinetName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="w-full" onClick={handleSignUp}>Sign up</Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <a href="/login" className="underline ml-1">
              Login
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
