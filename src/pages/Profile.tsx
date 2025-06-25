import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '../helper';

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [bio, setBio] = useState(''); // You can connect this to a backend or localStorage if needed

  return (
    <main className="container mx-auto py-8 px-4 max-w-2xl">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Profile</CardTitle>
          <CardDescription>View and update your profile information below.</CardDescription>
        </CardHeader>
        <form>
          <CardContent className="space-y-8">
            {/* Avatar Section */}
            <div className="space-y-3 flex items-center gap-4">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage
                  src={user.photoURL || undefined}
                  alt={user.displayName || user.email || 'User Avatar'}
                  className="object-cover"
                />
                <AvatarFallback email={user.email}>
                  {getInitials(user.displayName, user.email)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{user.displayName || 'No Name'}</div>
                <div className="text-muted-foreground text-sm">{user.email || 'No Email'}</div>
              </div>
            </div>
            {/* Display Name Section */}
            <div className="space-y-2">
              <label htmlFor="display-name" className="text-lg font-semibold">Display Name</label>
              <Input
                id="display-name"
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="Your Name"
                disabled
              />
            </div>
            {/* Bio Section */}
            <div className="space-y-2">
              <label htmlFor="bio" className="text-lg font-semibold">Bio</label>
              <Textarea
                id="bio"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us a little about yourself (max 500 characters)"
                maxLength={500}
                className="min-h-[100px]"
                disabled
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/500 characters</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" disabled>Cancel</Button>
            <Button type="submit" disabled>Save Profile</Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default Profile;