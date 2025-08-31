"use client";

import Button from "../../components/ui/button";
import CustomLink from "../../components/ui/link";
import { Suspense, useEffect } from "react";
import { TimoryaLogo } from "@/src/components/icons/timorya-logo";
import { TimoryaTextWhiteLogo } from "@/src/components/icons/timorya-text-white-logo";
import { useGet } from "@/src/hooks/use-get";
import { UserDataDto } from "@/src/models/users/user-data-dto";
import { InvitationDto } from "@/src/models/users/invitation-dto";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/ui/loading";
import { usePost } from "@/src/hooks/use-post";
import { AcceptInviteRequest } from "@/src/models/users/accept-invite-request";
import { useToastStore } from "@/src/store/toast-store";
import { errorExtractor } from "@/src/services/error-extractor";
import { AxiosError } from "axios";
import { ApiError } from "@/src/models/abstractions/api-error";

function Invite() {
  const { showToast } = useToastStore();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const { mutateAsync: acceptInviteAsync, isPending } = usePost<
    AcceptInviteRequest,
    void
  >({
    url: "/users/accept-invitation",
  });

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  const { data: userData, isFetching } = useGet<UserDataDto>({
    url: "users/me",
  });

  const { data: invitationData, isFetching: isFetchingInvitation } =
    useGet<InvitationDto>({
      url: "users/invitations/" + token,
    });

  useEffect(() => {
    if (
      (!isFetching && !userData) ||
      (!isFetchingInvitation && !invitationData)
    ) {
      router.replace("/login");
    }
  }, [isFetching, userData, isFetchingInvitation, invitationData, router]);

  const isInvitationValid = invitationData?.email === userData?.email;

  const renderText = () => {
    if (isInvitationValid) {
      return (
        <>
          <p className="text-sm text-gray-600">
            You are invited to join {invitationData?.organization}
          </p>
          <p className="text-sm text-gray-600">
            Click the button below to accept the invitation.
          </p>
        </>
      );
    } else {
      return (
        <>
          <p className="text-sm text-gray-600">
            Looks like this invite wasn&apos;t meant for you.
          </p>
          <p className="text-sm text-gray-600">
            Please sign in with another account.
          </p>
        </>
      );
    }
  };

  const onAcceptInvite = async () => {
    await acceptInviteAsync(
      { token: token! },
      {
        onSuccess: () => {
          showToast(
            "You are now a member of " + invitationData?.organization,
            "success",
          );
          router.replace("/app/dashboard");
        },
        onError: (error: AxiosError<ApiError>) => {
          const errorMessage = errorExtractor(error);
          showToast(errorMessage, "error");
        },
      },
    );
  };

  return (
    <section className="bg-[url('/blue-abstract.png')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="absolute top-15 flex w-full justify-center">
        <TimoryaTextWhiteLogo />
      </div>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="flex h-[450px] flex-col items-center justify-center space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
            {isFetching || isFetchingInvitation ? (
              <Loading />
            ) : (
              <>
                <TimoryaLogo />
                <div className="text-center">
                  <h2 className="mb-2 text-xl font-bold">
                    Join {invitationData?.organization}
                  </h2>
                  {renderText()}
                </div>
                <div className="text-center">
                  <p className="mb-2 text-xs text-gray-600">
                    You&apos;re signed in as
                  </p>
                  <div className="rounded-full border border-gray-200 px-4 py-1">
                    <p className="text-xs text-gray-800">{userData?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {isInvitationValid && (
                    <Button
                      text="Accept invitation"
                      onClick={onAcceptInvite}
                      disabled={isPending}
                    />
                  )}
                  <CustomLink
                    style={{ fontSize: "12px" }}
                    href="/login"
                    text="Sign in with different account"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPageWithTokens() {
  return (
    <Suspense fallback={null}>
      <Invite />
    </Suspense>
  );
}
