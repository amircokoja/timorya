import Link from "next/link";
import { TimoryaTextLogo } from "../icons/timorya-text-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen items-center bg-[url('/blue-abstract.png')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-20 lg:py-16">
        <div className="col-span-6 mr-auto hidden flex-col justify-center lg:flex xl:mb-0">
          <div>
            <Link href="/" className="relative top-0.5">
              <TimoryaTextLogo />
            </Link>
            <div className="mt-10 flex">
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
                <h3 className="mb-2 text-xl leading-none font-bold text-gray-200">
                  Track time effortlessly
                </h3>
                <p className="mb-2 font-light text-gray-200">
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
                <h3 className="mb-2 text-xl leading-none font-bold text-gray-200">
                  Boost productivity
                </h3>
                <p className="mb-2 font-light text-gray-200">
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
                <h3 className="mb-2 text-xl leading-none font-bold text-gray-200">
                  Stay in control
                </h3>
                <p className="mb-2 font-light text-gray-200">
                  Manage your time effectively with project-based tracking and
                  real-time notifications.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6 flex justify-center lg:hidden">
          <Link href="/" className="relative top-0.5">
            <TimoryaTextLogo />
          </Link>
        </div>
        {children}
      </div>
    </section>
  );
}
