import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen items-center bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-16">
        <div className="col-span-6 mr-auto hidden flex-col justify-between lg:flex xl:mb-0">
          <div>
            <a
              href="#"
              className="mb-6 inline-flex items-center text-2xl font-semibold text-gray-900 lg:mb-10"
            >
              <Image
                className="mr-2 size-8"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
                width={32}
                height={32}
              />
              TimeHub
            </a>
            <div className="flex">
              <svg
                className="mr-2 size-5 shrink-0 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <h3 className="mb-2 text-xl font-bold leading-none text-gray-900">
                  Track time effortlessly
                </h3>
                <p className="mb-2 font-light text-gray-500">
                  Easily log your work hours with an intuitive and user-friendly
                  interface.
                </p>
              </div>
            </div>
            <div className="flex pt-8">
              <svg
                className="mr-2 size-5 shrink-0 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <h3 className="mb-2 text-xl font-bold leading-none text-gray-900">
                  Boost productivity
                </h3>
                <p className="mb-2 font-light text-gray-500">
                  Gain insights into your work patterns and optimize your
                  efficiency with detailed reports.
                </p>
              </div>
            </div>
            <div className="flex pt-8">
              <svg
                className="mr-2 size-5 shrink-0 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <h3 className="mb-2 text-xl font-bold leading-none text-gray-900">
                  Stay in control
                </h3>
                <p className="mb-2 font-light text-gray-500">
                  Manage your time effectively with project-based tracking and
                  real-time notifications.
                </p>
              </div>
            </div>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
                >
                  Term & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mb-6 text-center lg:hidden">
          <a
            href="#"
            className="inline-flex items-center text-2xl font-semibold text-gray-900 lg:hidden"
          >
            <Image
              className="mr-2 size-8"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              width={32}
              height={32}
            />
            Flowbite
          </a>
        </div>
        {children}
      </div>
    </section>
  );
}
