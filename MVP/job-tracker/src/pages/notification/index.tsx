import {
  NotificationFormResolverSchema,
  type NotificationFormResolverProps,
} from "@shared/ui/Form/types";
import { NotificationLayout } from "@pages/notification/ui";
import { NotificationFormCustom } from "@features/notification/ui/NotificationFormCustom";
import { NotificationParagraph } from "@features/notification/ui//NotificationParagraph";
import { NotificationTitle } from "@features/notification/ui//NotificationTitle";
import { RemindersList } from "@features/notification/ui/Reminders";
import { useNotificationManager } from "@features/reminders/model/useNotificationManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Notification() {
  const {
    reminders,
    addReminers,
    deleteReminders,
    deleteAllReminders,
    deletePassedReminders,
    loadingReminders,
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
          loadingReminders={loadingReminders}
        />
      }
    />
  );
}
