"use client";

import ProjectForm from "@/src/components/app/projects/project-form";
import { LoadingIcon } from "@/src/components/icons/loading-icon";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";
import { useGet } from "@/src/hooks/use-get";
import { ProjectDto } from "@/src/models/projects/project-dto";
import { useToastStore } from "@/src/store/toast-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EditProject() {
  const params = useParams();
  const id = params.id;

  const { showToast } = useToastStore();
  const router = useRouter();
  const { data, isLoading, isFetching, error } = useGet<ProjectDto>({
    url: "projects/" + id,
    options: {
      retry: 1,
      queryKey: ["projects/" + id],
    },
  });

  useEffect(() => {
    if (!isFetching && error) {
      showToast("Project not found", "error");
      router.replace("/app/projects");
    }
  }, [error, isFetching, router, showToast]);

  return (
    <section className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/app/projects" },
          { label: "Edit project", href: "/app/projects/edit/" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Edit project</h2>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <LoadingIcon />
          </div>
        ) : (
          <ProjectForm project={data} />
        )}
      </div>
    </section>
  );
}
