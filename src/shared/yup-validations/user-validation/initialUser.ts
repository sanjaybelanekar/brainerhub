import User from "../../models/userModel";

const defineInitialUser = ({
  has_id = false,
  hasUserId = false,
  hasFirst = false,
  hasLast = false,
  hasEmail = false,
  hasPassword = false,
}) => {
  const initialUser: User = {};
  const name: any = {};

  if (has_id) initialUser._id = "";
  if (hasUserId) initialUser.userId = undefined;

  if (hasFirst) name.first = "";
  if (hasLast) name.last = "";
  if (hasFirst || hasLast) initialUser.name = name;

  if (hasEmail) initialUser.email = "";

  if (hasPassword) initialUser.password = "";

  return initialUser;
};

export default defineInitialUser;
