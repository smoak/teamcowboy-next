import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  readonly profileImageUrl: string;
  readonly userInitials: string;
};

export const UserAvatar = ({
  profileImageUrl,
  userInitials,
}: UserAvatarProps) => (
  <Avatar className="h-8 w-8">
    <AvatarImage src={profileImageUrl} alt="User" />
    <AvatarFallback>{userInitials}</AvatarFallback>
  </Avatar>
);
