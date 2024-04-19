type Props = {
  message: string;
};

const NotificationEmptyState = ({ message }: Props) => {
  return (
    <div className="px-6 py-10 text-foreground/70 text-center">{message}</div>
  );
};

export default NotificationEmptyState;
