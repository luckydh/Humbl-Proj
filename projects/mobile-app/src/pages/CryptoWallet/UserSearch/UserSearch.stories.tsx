import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { UserSearchList, UserSearchListProps } from "./UserSearch";
import {
  convertGeneratedtoAccounts,
  GeneratedUser,
  getTestUsers,
} from "utils/test-helpers/random-users/useRandomTestUser";
import { SearchInput } from "components/SearchInput/SearchInput";

const generatedUsers: GeneratedUser[] = getTestUsers(10, 0);

const generatedContacts = convertGeneratedtoAccounts(generatedUsers.slice(0, 4));
const generatedAccounts = convertGeneratedtoAccounts(generatedUsers.slice(5));

export default {
  title: "CryptoWallet/Pages/UserSearch",
  component: UserSearchList,
  args: {
    loading: false,
    humblUsers: generatedAccounts,
    humblContacts: generatedContacts,
    error: false,
    showAlternateNullState: false,
    onClick: action("Clicked Users - "),
    loadContacts: action("contacts"),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QPSFMyF0BndoFizvebnr9b/HUMBL-Pay-Mobile?node-id=16467%3A194999",
    },

    storyshots: false,
  },
} as Meta;

const Template: Story<UserSearchListProps> = ({ ...args }) => {
  const argContacts = args.userHumblContacts ?? [];
  const argUsers = args.humblCommunityUsers ?? [];
  const [contacts, setContacts] = useState(argContacts);
  const [users, setUsers] = useState(argUsers);
  const filterResults = (filterTerm: string) => {
    if (filterTerm.length > 0) {
      setContacts(argContacts.filter(({ userName }) => userName.includes(filterTerm)));
      setUsers(argUsers.filter(({ userName }) => userName.includes(filterTerm)));
    } else {
      resetState();
    }
  };
  const resetState = () => {
    setContacts(argContacts);
    setUsers(argUsers);
  };
  return (
    <div>
      <SearchInput
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => filterResults(event.target.value.trim())}
        ariaLabel="SEARCHFORUSER"
        placeholder="Search Filter"
        onClear={() => {
          resetState();
        }}
      />
      <UserSearchList {...args} humblCommunityUsers={users} userHumblContacts={contacts} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
