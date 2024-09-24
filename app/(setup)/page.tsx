import React from "react";
import { db } from "@/lib/db";
import { Profile } from "@prisma/client";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initia-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: (profile as Profile).id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
