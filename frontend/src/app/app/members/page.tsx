"use client";

import MembersTable from "@/src/components/app/members/members-table";
import { LoadingIcon } from "@/src/components/icons/loading-icon";
import { SearchIcon } from "@/src/components/icons/search-icon";
import InviteMembersModal from "@/src/components/modals/invite-members-modal";
import Button from "@/src/components/ui/button";
import Input from "@/src/components/ui/input";
import { useGet } from "@/src/hooks/use-get";
import { MemberDto } from "@/src/models/users/member-dto";
import { useState } from "react";

export default function Members() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const { data: members, isFetching } = useGet<MemberDto[]>({
    url: "users/members",
  });

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredMembers = members?.filter(
    (member) =>
      member.email.toLowerCase().includes(searchText) ||
      (member.name && member.name.toLowerCase().includes(searchText)) ||
      member.role.toLowerCase().includes(searchText),
  );

  const generateContent = () => {
    return (
      <>
        {filteredMembers?.length === 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-2xl">
                  No members found.
                </p>
                <p className="mb-4 text-base font-light text-gray-500">
                  Invite team members to your organization to collaborate on
                  projects. Send them an invite to get started.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="overflow-x-auto">
            <MembersTable members={filteredMembers!} />
          </div>
        )}
      </>
    );
  };

  return (
    <section>
      <div className="overflow-hidden bg-white">
        <div className="flex flex-col items-center justify-between space-y-3 p-2 py-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/3">
            <form className="flex items-center">
              <div className="relative w-full">
                <Input
                  onChange={handleSearch}
                  icon={<SearchIcon />}
                  type="text"
                  id="simple-search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
            <Button
              text="Invite members"
              onClick={() => setIsInviteModalOpen(true)}
            />
          </div>
        </div>
        {isFetching ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          generateContent()
        )}
      </div>

      <InviteMembersModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </section>
  );
}
