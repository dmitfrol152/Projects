import {
  NotificationFormResolverSchema,
  type NotificationFormResolverProps,
} from "@/components/Form/types";
import { NotificationLayout } from "@/components/NotificationLayout";
import { NotificationFormCustom } from "@/components/NotificationLayout/NotificationFormCustom";
import { NotificationParagraph } from "@/components/NotificationLayout/NotificationParagraph";
import { NotificationTitle } from "@/components/NotificationLayout/NotificationTitle";
import { RemindersList } from "@/components/NotificationLayout/Reminders";
import { useNotificationManager } from "@/hooks/useNotificationManager/useNotificationManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Notification() {
  const {
    reminders,
    addReminers,
    deleteReminders,
    deleteAllReminders,
    deletePassedReminders,
  } = useNotificationManager();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NotificationFormResolverProps>({
    resolver: zodResolver(NotificationFormResolverSchema),
  });

  function handleAddNewNotification(data: NotificationFormResolverProps) {
    addReminers(data);
    reset();
  }

  function handleDeleteReminder(reminderId: string) {
    deleteReminders(reminderId);
  }

  function handleClearPassed() {
    deletePassedReminders();
  }

  function handleClearAll() {
    deleteAllReminders();
  }

  return (
    <NotificationLayout
      title={<NotificationTitle />}
      paragraph={<NotificationParagraph />}
      form={
        <NotificationFormCustom
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          handleSubmitNewNotification={handleAddNewNotification}
          handleClearPassed={handleClearPassed}
          handleClearAll={handleClearAll}
        />
      }
      reminders={
        <RemindersList
          reminders={reminders}
          handleDeleteReminder={handleDeleteReminder}
        />
      }
    />
  );
}
