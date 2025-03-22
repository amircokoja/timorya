"use client";

import ProjectForm from "@/src/components/app/projects/project-form";
import Breadcrumbs from "@/src/components/ui/breadcrumbs";

export default function AddProject() {
  return (
    <section className="bg-white">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/app/projects" },
          { label: "Add project", href: "/app/projects/add" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Add a new project
        </h2>
        <ProjectForm />
      </div>
    </section>
  );
}
