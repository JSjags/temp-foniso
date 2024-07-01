import React from "react";
import SwitchCard from "../SwitchCard";
import NavCard from "../NavCard";
import { useUserContext } from "@/context/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/services/api/userService";
import { TSettings } from "@/types";

type Props = {};

const Notification = (props: Props) => {
  const queryClient = useQueryClient();
  const user = useUserContext().userData?.user;

  const settings = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const settingsMutation = useMutation({
    mutationKey: ["updateSettings"],
    mutationFn: (data: any) => updateSettings(user?.id!, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      }),
  });

  console.log(settings.data?.data.data as TSettings);
  console.log(user);
  return (
    <div className="flex flex-col gap-y-4">
      <SwitchCard
        title="Pause all notification"
        value={
          settings.data?.data.data
            ? (settings.data?.data.data as TSettings).pause_notification
            : false
        }
        onChange={() =>
          settingsMutation.mutate({
            pause_notification: !(settings.data?.data.data as TSettings)
              .pause_notification,
          })
        }
      />
      <NavCard title="Push notification" />
      <SwitchCard
        title="SMS notification"
        value={
          settings.data?.data.data
            ? (settings.data?.data.data as TSettings).sms_notification
            : false
        }
      />
      <SwitchCard
        title="Email notification"
        value={
          settings.data?.data.data
            ? (settings.data?.data.data as TSettings).email_notification
            : false
        }
      />
    </div>
  );
};

export default Notification;
