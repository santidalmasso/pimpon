import {User} from '@prisma/client'

import {Icons} from '~/components/icons'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from '~/components/ui/avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export function UserAvatar({user, ...props}: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage alt="Picture" src={user.image || undefined} />
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <Icons.user className="w-4 h-4" />
      </AvatarFallback>
    </Avatar>
  )
}
