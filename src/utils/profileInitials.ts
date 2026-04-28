import { join } from 'ramda';

import initials from '@/utils/initials';

type profileInitialsTypes = {
  firstName?: string;
  lastName?: string;
  userName: string;
}

const profileInitials = ({ firstName, lastName, userName }: profileInitialsTypes) =>
  firstName || lastName ? initials(join(' ', [firstName, lastName])) : initials(userName);

export default profileInitials;
