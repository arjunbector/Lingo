import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
