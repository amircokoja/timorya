"use client";

import NewOrganization from "@/src/components/app/organizations/new-organization";
import ProjectsTable from "@/src/components/app/projects/projects-table";
import { LoadingIcon } from "@/src/components/icons/loading-icon";
import { PlusIcon } from "@/src/components/icons/plus-icon";
import { SearchIcon } from "@/src/components/icons/search-icon";
import Input from "@/src/components/ui/input";
import LinkButton from "@/src/components/ui/link-button";
import { useGet } from "@/src/hooks/use-get";
import { ProjectDto } from "@/src/models/projects/project-dto";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { useState } from "react";

export default function Projects() {
  const { data: projects, isFetching: isFetching } = useGet<ProjectDto[]>({
    url: "projects",
  });
  const { data: userData } = useGet<UserDataDto>({
    url: "users/me",
  });
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchText),
  );

  const generateContent = () => {
    return (
      <>
        {projects?.length === 0 ? (
          <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-2xl">
                  No projects found.
                </p>
                <p className="mb-4 text-base font-light text-gray-500">
                  You have no project, please add a new project to get started.
                </p>
                {!userData?.currentOrganization && (
                  <NewOrganization context="projects" />
                )}
              </div>
            </div>
          </section>
        ) : (
          <div className="overflow-x-auto">
            <ProjectsTable projects={filteredProjects!} />
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
            <LinkButton
              disabled={!userData?.currentOrganization}
              href="/app/projects/add"
              text="Add new project"
              icon={<PlusIcon />}
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
    </section>
  );
}
