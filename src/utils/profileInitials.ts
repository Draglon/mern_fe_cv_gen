import initials from '@/utils/initials';

type profileInitialsTypes = {
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
}

const profileInitials = (user:profileInitialsTypes | null) => {
  if (!user) return "";

  const { firstName, lastName, userName } = user;

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return fullName
    ? initials(fullName)
    : initials(userName);
};

export default profileInitials;
