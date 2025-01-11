import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export default function AuthCard({
  title,
  footer,
  children,
  description,
}: PropsWithChildren<Props>) {
  return (
    <Card className="max-w-xs w-full">
      <CardHeader className="flex justify-center items-center text-center">
        <p className="uppercase text-2xl tracking-wider font-bold">{title}</p>
        {description && (
          <p className="uppercase text-sm text-muted-foreground tracking-widest">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex justify-center">{children}</CardContent>
      {footer && (
        <CardFooter className="flex justify-center">{footer}</CardFooter>
      )}
    </Card>
  );
}
